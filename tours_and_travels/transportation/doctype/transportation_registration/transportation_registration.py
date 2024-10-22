# Copyright (c) 2022, Nihantra C. Patel and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class TransportationRegistration(Document):
	pass

def veh_list(doc, event):
	for d in doc.get('vehicle_list'):
		veh_name = frappe.db.get_value("Vehicle",{'name': d.vehicle},'name')
		if veh_name:
			upd_veh = frappe.get_doc("Vehicle",veh_name)
			if not upd_veh.transporter:
				upd_veh.transporter = doc.name
				upd_veh.save()
			else:
				if not upd_veh.transporter == doc.name:
					frappe.throw(( ('<a onclick="window.open(this.href);return false;" href="/app/vehicle/{0}">' '{1}' '</a>').format(d.vehicle, d.vehicle) +" is already there in "+ \
						('<a onclick="window.open(this.href);return false;" href="/app/transportation-registration/{0}">' '{1}' '</a>').format(upd_veh.transporter, upd_veh.transporter) ), title = "Error")