# Copyright (c) 2022, Nihantra C. Patel and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Restaurant(Document):
	pass

def upd_val(doc, event):
	rf = doc.restaurant_facility
	fr = []
	for d in rf:
		fr.append(d.restaurant_facility)
	list_of_rf = ', '.join([str(elem) for elem in fr])
	doc.restaurant_facility_list = list_of_rf