# Copyright (c) 2022, Nihantra C. Patel and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Hotel(Document):
	pass

def upd_val(doc, event):
	hf = doc.hotel_facility
	fr = []
	for d in hf:
		fr.append(d.hotel_facility)
	list_of_hf = ', '.join([str(elem) for elem in fr])
	doc.hotel_facility_list = list_of_hf