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
				"label": _("Transportation"),
				"fieldname": "name",
				"fieldtype": "Link",
				"options": "Transportation Registration",
				"width": 200
			},
			{
				"label": _("Vehicle"),
				"fieldname": "vehicle",
				"fieldtype": "Link",
				"options": "Vehicle",
				"width": 120
			},
			{
				"label": _("Make"),
				"fieldname": "make",
				"fieldtype": "Data",
				"width": 100
			},
			{
				"label": _("Model"),
				"fieldname": "model",
				"fieldtype": "Data",
				"width": 120
			},
			{
				"label": _("Capacity"),
				"fieldname": "capacity",
				"fieldtype": "Int",
				"width": 100
			},
			{
				"label": _("Per Day Cost"),
				"fieldname": "per_day_cost",
				"fieldtype": "Currency",
				"width": 120
			},
			{
				"label": _("Status"),
				"fieldname": "status",
				"fieldtype": "Data",
				"width": 100
			},
			{
				"label": _("Transportation Address"),
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
			}
		]
	return columns

def get_data(filters):
	return frappe.db.sql(
			"""
			SELECT
				tg.name, vl.vehicle, vl.make, vl.model, vl.capacity, vl.per_day_cost,
				CASE
					WHEN status = "Available" THEN '<center> <c style="color:#2f9d58; text-align:center;">' "Available" '</c> </center>'
					WHEN status = "Not Available" THEN '<center> <c style="color:#e24c4c;">' "Not Available" '</c> </center>'
				END as status,
				concat_ws(', ',
				trim(',' from `tabAddress`.address_line1),
				trim(',' from `tabAddress`.address_line2)
				) AS address,
				tg.city, tg.state, tg.country, tg.website, tg.phone

			FROM
			`tabTransportation Registration` as tg left join `tabDynamic Link` on (
			tg.name = `tabDynamic Link`.link_name and
			`tabDynamic Link`.parenttype = 'Address')
			left join `tabAddress` on (
			`tabAddress`.name = `tabDynamic Link`.parent), `tabVehicle List` as vl

			WHERE
				vl.parent = tg.name
				{conditions} 

			ORDER BY
				tg.name ASC """.format(
				conditions=get_conditions(filters)
			),
			filters,
			as_dict=1,
		)

def get_conditions(filters):
	conditions = []

	if filters.get("name"):
		conditions.append(" AND tg.name in %(name)s")

	if filters.get("city"):
		conditions.append(" AND tg.city in %(city)s")

	if filters.get("state"):
		conditions.append(" AND tg.state in %(state)s")

	if filters.get("country"):
		conditions.append(" AND tg.country in %(country)s")

	if filters.get("vehicle"):
		conditions.append(" AND vl.vehicle in %(vehicle)s")

	if filters.get("status"):
		conditions.append(" AND vl.status = %(status)s")

	return " ".join(conditions) if conditions else ""