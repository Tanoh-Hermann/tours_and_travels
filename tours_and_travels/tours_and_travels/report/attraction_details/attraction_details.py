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
				"label": _("Attraction"),
				"fieldname": "name",
				"fieldtype": "Link",
				"options": "Attraction",
				"width": 200
			},
			{
				"label": _("Attraction Service"),
				"fieldname": "attraction_service",
				"fieldtype": "Link",
				"options": "Attraction Service",
				"width": 150
			},
			{
				"label": _("Unit Price"),
				"fieldname": "unit_price",
				"fieldtype": "Currency",
				"width": 120
			},
			{
				"label": _("Attraction Address"),
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
				att.name, asl.attraction_service, asl.unit_price,
				concat_ws(', ',
				trim(',' from `tabAddress`.address_line1),
				trim(',' from `tabAddress`.address_line2)
				) AS address,
				att.city, att.state, att.country, att.website, att.phone

			FROM
			`tabAttraction` as att left join `tabDynamic Link` on (
			att.name = `tabDynamic Link`.link_name and
			`tabDynamic Link`.parenttype = 'Address')
			left join `tabAddress` on (
			`tabAddress`.name = `tabDynamic Link`.parent), `tabAttraction Service List` as asl

			WHERE
				asl.parent = att.name
				{conditions} 

			ORDER BY
				att.name ASC """.format(
				conditions=get_conditions(filters)
			),
			filters,
			as_dict=1,
		)

def get_conditions(filters):
	conditions = []

	if filters.get("name"):
		conditions.append(" AND att.name in %(name)s")

	if filters.get("city"):
		conditions.append(" AND att.city in %(city)s")

	if filters.get("state"):
		conditions.append(" AND att.state in %(state)s")

	if filters.get("country"):
		conditions.append(" AND att.country in %(country)s")

	if filters.get("attraction_service"):
		conditions.append(" AND asl.attraction_service in %(attraction_service)s")

	return " ".join(conditions) if conditions else ""