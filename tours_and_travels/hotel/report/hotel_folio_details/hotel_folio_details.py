# Copyright (c) 2022, Nihantra C. Patel and contributors
# For license information, please see license.txt

import frappe
from frappe import _

def execute(filters=None):
	columns, data = get_columns(filters), get_data(filters)
	return columns, data

def get_columns(filters):
	columns = [
			{
				"label": _("Hotel Folio"),
				"fieldname": "name",
				"fieldtype": "Link",
				"options": "Hotel Folio",
				"width": 120
			},
			{
				"label": _("From Date"),
				"fieldname": "from_date",
				"fieldtype": "Date",
				"width": 100
			},
			{
				"label": _("To Date"),
				"fieldname": "to_date",
				"fieldtype": "Date",
				"width": 100
			},
			{
				"label": _("Customer"),
				"fieldname": "customer",
				"fieldtype": "Link",
				"options": "Customer",
				"width": 150
			},
			{
				"label": _("Hotel"),
				"fieldname": "hotel",
				"fieldtype": "Link",
				"options": "Hotel",
				"width": 150
			},
			{
				"label": _("Hotel Room"),
				"fieldname": "hotel_room",
				"fieldtype": "Link",
				"options": "Hotel Room",
				"width": 120
			},
			{
				"label": _("Room Type"),
				"fieldname": "room_type",
				"fieldtype": "Link",
				"options": "Room Type",
				"width": 100
			},
			{
				"label": _("Duration"),
				"fieldname": "duration",
				"fieldtype": "Int",
				"width": 100
			},
			{
				"label": _("Room Qty"),
				"fieldname": "room_qty",
				"fieldtype": "Int",
				"width": 100
			},
			{
				"label": _("Unit Price"),
				"fieldname": "unit_price",
				"fieldtype": "Currency",
				"width": 100
			},
			{
				"label": _("Extra Service Charge"),
				"fieldname": "extra_service_charge",
				"fieldtype": "Int",
				"width": 100
			},
			{
				"label": _("Total"),
				"fieldname": "total",
				"fieldtype": "Currency",
				"width": 100
			},
			{
				"label": _("Extra Service"),
				"fieldname": "extra_service",
				"fieldtype": "Data",
				"width": 300
			},
			{
				"label": _("Hotel Facility"),
				"fieldname": "hotel_facility_list",
				"fieldtype": "Data",
				"width": 300
			},
			{
				"label": _("Company"),
				"fieldname": "company",
				"fieldtype": "Link",
				"options": "Company",
				"width": 120
			}
		]
	return columns

def get_data(filters):
	return frappe.db.sql(
			"""
			SELECT
				hf.name, hf.from_date, hf.to_date, hf.customer, hf.hotel, hf.hotel_room, hf.room_type, hf.hotel_facility_list, \
				hf.extra_service, hf.duration, hf.room_qty, hf.unit_price, hf.extra_service_charge, hf.total, hf.company

			FROM
			`tabHotel Folio` as hf

			WHERE
				hf.docstatus != 2
				{conditions} """.format(
				conditions=get_conditions(filters)
			),
			filters,
			as_dict=1,
		)

def get_conditions(filters):
	conditions = []

	if filters.get("name"):
		conditions.append(" AND hf.name = %(name)s")

	if filters.get("company"):
		conditions.append(" AND hf.company = %(company)s")

	if filters.get("hotel"):
		conditions.append(" AND hf.hotel in %(hotel)s")

	if filters.get("customer"):
		conditions.append(" AND hf.customer in %(customer)s")

	if filters.get("hotel_room"):
		conditions.append(" AND hf.hotel_room in %(hotel_room)s")

	if filters.get("room_type"):
		conditions.append(" AND hf.room_type in %(room_type)s")

	return " ".join(conditions) if conditions else ""