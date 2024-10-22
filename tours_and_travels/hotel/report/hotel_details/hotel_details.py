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
				"label": _("Hotel"),
				"fieldname": "name",
				"fieldtype": "Link",
				"options": "Hotel",
				"width": 200
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
				"label": _("Room Capacity"),
				"fieldname": "total_capacity",
				"fieldtype": "Int",
				"width": 100
			},
			{
				"label": _("Total Room"),
				"fieldname": "nos_of_rooms",
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
				"label": _("Available Room"),
				"fieldname": "available_room",
				"fieldtype": "Int",
				"width": 120
			},
			{
				"label": _("Status"),
				"fieldname": "status",
				"fieldtype": "Data",
				"width": 100
			},
			{
				"label": _("Hotel Address"),
				"fieldname": "address",
				"fieldtype": "Data",
				"width": 250
			},
			{
				"label": _("City"),
				"fieldname": "city",
				"fieldtype": "Link",
				"options": "City",
				"width": 100
			},
			{
				"label": _("State"),
				"fieldname": "state",
				"fieldtype": "Link",
				"options": "State",
				"width": 100
			},
			{
				"label": _("Country"),
				"fieldname": "country",
				"fieldtype": "Link",
				"options": "Country",
				"width": 100
			},
			{
				"label": _("Website"),
				"fieldname": "website",
				"fieldtype": "Data",
				"width": 200
			},
			{
				"label": _("Phone"),
				"fieldname": "phone",
				"fieldtype": "Data",
				"width": 150
			},
			{
				"label": _("Hotel Facility"),
				"fieldname": "hotel_facility_list",
				"fieldtype": "Data",
				"width": 1000
			}

		]
	return columns

def get_data(filters):
	return frappe.db.sql(
			"""
			SELECT
				htl.name, hml.hotel_room, hml.room_type, hml.total_capacity, hml.nos_of_rooms, hml.unit_price, hml.available_room, 
				CASE
					WHEN status = "Available" THEN '<center> <c style="color:#2f9d58; text-align:center;">' "Available" '</c> </center>'
					WHEN status = "Not Available" THEN '<center> <c style="color:#e24c4c;">' "Not Available" '</c> </center>'
				END as status,
				concat_ws(', ',
				trim(',' from `tabAddress`.address_line1),
				trim(',' from `tabAddress`.address_line2)
				) AS address,
				htl.city, htl.state, htl.country, htl.website, htl.phone, htl.hotel_facility_list

			FROM
			`tabHotel` as htl left join `tabDynamic Link` on (
			htl.name = `tabDynamic Link`.link_name and
			`tabDynamic Link`.parenttype = 'Address')
			left join `tabAddress` on (
			`tabAddress`.name = `tabDynamic Link`.parent), `tabHotel Room List` as hml

			WHERE
				hml.parent = htl.name
				{conditions} 

			ORDER BY
				htl.name, hml.hotel_room ASC """.format(
				conditions=get_conditions(filters)
			),
			filters,
			as_dict=1,
		)

def get_conditions(filters):
	conditions = []

	if filters.get("name"):
		conditions.append(" AND htl.name in %(name)s")

	if filters.get("city"):
		conditions.append(" AND htl.city in %(city)s")

	if filters.get("state"):
		conditions.append(" AND htl.state in %(state)s")

	if filters.get("country"):
		conditions.append(" AND htl.country in %(country)s")

	if filters.get("hotel_room"):
		conditions.append(" AND hml.hotel_room in %(hotel_room)s")

	if filters.get("room_type"):
		conditions.append(" AND hml.room_type in %(room_type)s")

	if filters.get("status"):
		conditions.append(" AND hml.status = %(status)s")

	return " ".join(conditions) if conditions else ""