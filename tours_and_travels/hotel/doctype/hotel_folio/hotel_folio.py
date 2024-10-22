# Copyright (c) 2022, Nihantra C. Patel and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document

class HotelFolio(Document):
	pass

@frappe.whitelist()
def default_configuration():
	ig = frappe.db.get_list('Item Group',filters={'name': "Services"},fields=['name'],as_list=True)
	if not ig:
		new_ig = frappe.get_doc(dict(
			doctype = 'Item Group',
			item_group_name = "Services"
		))
		new_ig.save()

	hotel_item = frappe.db.get_list('Item',filters={'name': "Hotel"},fields=['name'],as_list=True)
	extra_service_item = frappe.db.get_list('Item',filters={'name': "Extra Service"},fields=['name'],as_list=True)


	if not hotel_item:
		new_hi = frappe.get_doc(dict(
			doctype = 'Item',
			item_code = "Hotel",
			item_name = "Hotel",
			description = "Hotel",
			item_group = "Services",
			stock_uom = "Nos",
			is_stock_item = 0,
			include_item_in_manufacturing = 0
		))
		new_hi.save()

	if not extra_service_item:
		new_esi = frappe.get_doc(dict(
			doctype = 'Item',
			item_code = "Extra Service",
			item_name = "Extra Service",
			description = "Extra Service",
			item_group = "Services",
			stock_uom = "Nos",
			is_stock_item = 0,
			include_item_in_manufacturing = 0
		))
		new_esi.save()


@frappe.whitelist()
def create_draft_invoice(customer, date, qty, hotel_price, hotel_br_des, extra_service, extra_service_charge, name):

	default_configuration()

	inv = frappe.new_doc('Sales Invoice')
	inv.customer = customer
	inv.transaction_date = date
	inv.hotel_folio = name
	inv.append('items', {
		'item_code': "Hotel",
		'item_name': "Hotel",
		'description': hotel_br_des,
		'uom': "Nos",
		'qty': qty,
		'price_list_rate': hotel_price
	})
	inv.append('items', {
		'item_code': "Extra Service",
		'item_name': "Extra Service",
		'description': extra_service,
		'uom': "Nos",
		'qty': 1,
		'price_list_rate': extra_service_charge
	})
	inv.save(ignore_permissions=True)

	frappe.msgprint(
		_('<a onclick="window.open(this.href);return false;" href="/app/sales-invoice/{0}">' '{1}' '</a>').format(inv.name,inv.name),
		title = "Sales Invoice created successfully.",
		indicator="green"
	)


@frappe.whitelist()
def create_submit_invoice(customer, date, qty, hotel_price, hotel_br_des, extra_service, extra_service_charge, name):

	default_configuration()

	inv = frappe.new_doc('Sales Invoice')
	inv.customer = customer
	inv.transaction_date = date
	inv.hotel_folio = name
	inv.docstatus = 1
	inv.append('items', {
		'item_code': "Hotel",
		'item_name': "Hotel",
		'description': hotel_br_des,
		'uom': "Nos",
		'qty': qty,
		'rate': hotel_price
	})
	inv.append('items', {
		'item_code': "Extra Service",
		'item_name': "Extra Service",
		'description': extra_service,
		'uom': "Nos",
		'qty': 1,
		'rate': extra_service_charge
	})
	inv.insert(ignore_permissions=True)

	frappe.msgprint(
		_('<a onclick="window.open(this.href);return false;" href="/app/sales-invoice/{0}">' '{1}' '</a>').format(inv.name,inv.name),
		title = "Sales Invoice created successfully.",
		indicator="green"
	)


def upd_hotel_folio_id(doc, event):
	if doc.hotel_folio:
		si = frappe.db.get_value("Hotel Folio",{'name': doc.hotel_folio},'name')
		if si:
			test_doc = frappe.get_doc("Hotel Folio",si)
			test_doc.sales_invoice = doc.name
			test_doc.save()