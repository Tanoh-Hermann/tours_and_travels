# Copyright (c) 2022, Nihantra C. Patel and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document

class TourRegistration(Document):
	pass

@frappe.whitelist()
def create_quot(customer, name, date, hotel_ttl_amt, hotel_br_des, rest_ttl_amt, rest_br_des, trans_ttl_amt, trans_br_des,
	att_ttl_amt, att_br_des, gd_ttl_amt, gd_br_des):
	ig = frappe.db.get_list('Item Group',filters={'name': "Services"},fields=['name'],as_list=True)
	if not ig:
		new_ig = frappe.get_doc(dict(
			doctype = 'Item Group',
			item_group_name = "Services"
		))
		new_ig.save()

	hotel_item = frappe.db.get_list('Item',filters={'name': "Hotel"},fields=['name'],as_list=True)
	restaurant_item = frappe.db.get_list('Item',filters={'name': "Restaurant"},fields=['name'],as_list=True)
	transportation_item = frappe.db.get_list('Item',filters={'name': "Transportation"},fields=['name'],as_list=True)
	attraction_item = frappe.db.get_list('Item',filters={'name': "Attraction Service"},fields=['name'],as_list=True)
	guide_item = frappe.db.get_list('Item',filters={'name': "Guide Service"},fields=['name'],as_list=True)

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

	if not restaurant_item:
		new_ri = frappe.get_doc(dict(
			doctype = 'Item',
			item_code = "Restaurant",
			item_name = "Restaurant",
			description = "Restaurant",
			item_group = "Services",
			stock_uom = "Nos",
			is_stock_item = 0,
			include_item_in_manufacturing = 0
		))
		new_ri.save()

	if not transportation_item:
		new_ti = frappe.get_doc(dict(
			doctype = 'Item',
			item_code = "Transportation",
			item_name = "Transportation",
			description = "Transportation",
			item_group = "Services",
			stock_uom = "Nos",
			is_stock_item = 0,
			include_item_in_manufacturing = 0
		))
		new_ti.save()

	if not attraction_item:
		new_ai = frappe.get_doc(dict(
			doctype = 'Item',
			item_code = "Attraction Service",
			item_name = "Attraction Service",
			description = "Attraction Service",
			item_group = "Services",
			stock_uom = "Nos",
			is_stock_item = 0,
			include_item_in_manufacturing = 0
		))
		new_ai.save()

	if not guide_item:
		new_gi = frappe.get_doc(dict(
			doctype = 'Item',
			item_code = "Guide Service",
			item_name = "Guide Service",
			description = "Guide Service",
			item_group = "Services",
			stock_uom = "Nos",
			is_stock_item = 0,
			include_item_in_manufacturing = 0
		))
		new_gi.save()

	quot = frappe.new_doc('Quotation')
	quot.quotation_to = "Customer"
	quot.party_name = customer
	quot.tour_registration = name
	quot.transaction_date = date
	quot.append('items', {
		'item_code': "Hotel",
		'item_name': "Hotel",
		'description': hotel_br_des,
		'uom': "Nos",
		'qty': 1,
		'price_list_rate': hotel_ttl_amt
	})
	quot.append('items', {
		'item_code': "Restaurant",
		'item_name': "Restaurant",
		'description': rest_br_des,
		'uom': "Nos",
		'qty': 1,
		'price_list_rate': rest_ttl_amt
	})
	quot.append('items', {
		'item_code': "Transportation",
		'item_name': "Transportation",
		'description': trans_br_des,
		'uom': "Nos",
		'qty': 1,
		'price_list_rate': trans_ttl_amt
	})
	quot.append('items', {
		'item_code': "Attraction Service",
		'item_name': "Attraction Service",
		'description': att_br_des,
		'uom': "Nos",
		'qty': 1,
		'price_list_rate': att_ttl_amt
	})
	quot.append('items', {
		'item_code': "Guide Service",
		'item_name': "Guide Service",
		'description': gd_br_des,
		'uom': "Nos",
		'qty': 1,
		'price_list_rate': gd_ttl_amt
	})
	quot.insert(ignore_permissions=True)

	frappe.msgprint(
		_('<a onclick="window.open(this.href);return false;" href="/app/quotation/{0}">' '{1}' '</a>').format(quot.name,quot.name),
		title = "Quotation created successfully.",
		indicator="green"
	)

def hotel_restaurant_brief(doc, event):
	hotel_brief_val = []
	for hp in doc.get('hotel_package_list'):
		hbv = hp.from_date +' - '+ hp.to_date +' | '+ hp.city +' | '+ hp.hotel +' - '+ hp.hotel_room +' - '+ str(hp.room_qty) +' | '+ str(hp.duration) +' Days'+' | Rate: '+ str(hp.unit_price) +' | Total: '+ str(hp.total)
		hotel_brief_val.append(hbv)

	doc.hotel_brief_description = ", <br>".join(hotel_brief_val)

	restaurant_brief_val = []
	for rp in doc.get('restaurant_package_list'):
		rbv = rp.date +' | '+ rp.city +' | '+ rp.restaurant +' - '+ rp.meal_type +' - '+ str(rp.qty) +' | Rate: '+ str(rp.unit_price) +' | Total: '+ str(rp.total)
		restaurant_brief_val.append(rbv)

	doc.restaurant_brief_description = ", <br>".join(restaurant_brief_val)

	transportation_brief_val = []
	for tp in doc.get('transportation_package_list'):
		tbv = tp.journey_date +' | '+ tp.source_location +' -> '+ tp.destination +' | '+ tp.transportation +' - '+ tp.vehicle +' - '+ str(tp.qty) +' | Rate: '+ str(tp.unit_price) +' | Total: '+ str(tp.total)
		transportation_brief_val.append(tbv)

	doc.transportation_brief_description = ", <br>".join(transportation_brief_val)

	attraction_brief_val = []
	for ap in doc.get('attraction_package_list'):
		abv = ap.date +' | '+ ap.city + ' | '+ ap.attraction +' - '+ ap.attraction_service +' - '+ str(ap.qty) + ' | Contact: '+ str(ap.contact) +' | Rate: '+ str(ap.unit_price) +' | Total: '+ str(ap.total)
		attraction_brief_val.append(abv)

	doc.attraction_brief_description = ", <br>".join(attraction_brief_val)

	guide_brief_val = []
	for gp in doc.get('guide_package_list'):
		gbv = gp.date +' | '+ gp.city + ' | '+ gp.guide +' - '+ gp.guide_service + ' | Contact: '+ str(gp.contact) +' | Price: '+ str(gp.price)
		guide_brief_val.append(gbv)

	doc.guide_brief_description = ", <br>".join(guide_brief_val)