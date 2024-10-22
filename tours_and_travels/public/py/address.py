# Copyright (c) 2022, Nihantra C. Patel and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

def upd_address(doc, event):
	for d in doc.get('links'):
		if d.link_doctype == "Hotel":
			if d.link_name:
				htl_name = frappe.db.get_value("Hotel",{'name': d.link_name},'name')
				if htl_name:
					upd_htl = frappe.get_doc("Hotel",htl_name)
					if not upd_htl.hotel_address:
						upd_htl.hotel_address = doc.name
						upd_htl.save()

		if d.link_doctype == "Restaurant":
			if d.link_name:
				rest_name = frappe.db.get_value("Restaurant",{'name': d.link_name},'name')
				if rest_name:
					upd_rest = frappe.get_doc("Restaurant",rest_name)
					if not upd_rest.restaurant_address:
						upd_rest.restaurant_address = doc.name
						upd_rest.save()

		if d.link_doctype == "Transportation Registration":
			if d.link_name:
				tran_name = frappe.db.get_value("Transportation Registration",{'name': d.link_name},'name')
				if tran_name:
					upd_tran = frappe.get_doc("Transportation Registration",tran_name)
					if not upd_tran.address:
						upd_tran.address = doc.name
						upd_tran.save()

		if d.link_doctype == "Attraction":
			if d.link_name:
				att_name = frappe.db.get_value("Attraction",{'name': d.link_name},'name')
				if att_name:
					upd_att = frappe.get_doc("Attraction",att_name)
					if not upd_att.attraction_address:
						upd_att.attraction_address = doc.name
						upd_att.save()

		if d.link_doctype == "Guide":
			if d.link_name:
				gd_name = frappe.db.get_value("Guide",{'name': d.link_name},'name')
				if gd_name:
					upd_gd = frappe.get_doc("Guide",gd_name)
					if not upd_gd.guide_address:
						upd_gd.guide_address = doc.name
						upd_gd.save()