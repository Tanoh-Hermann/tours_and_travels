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
				"label": _("Guide"),
				"fieldname": "name",
				"fieldtype": "Link",
				"options": "Guide",
				"width": 200
			},
			{
				"label": _("Guide Service"),
				"fieldname": "guide_service",
				"fieldtype": "Link",
				"options": "Guide Service",
				"width": 150
			},
			{
				"label": _("Price"),
				"fieldname": "price",
				"fieldtype": "Currency",
				"width": 120
			},
			{
				"label": _("Guide Address"),
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
				gd.name, gsl.guide_service, gsl.price,
				concat_ws(', ',
				trim(',' from `tabAddress`.address_line1),
				trim(',' from `tabAddress`.address_line2)
				) AS address,
				gd.city, gd.state, gd.country, gd.website, gd.phone

			FROM
			`tabGuide` as gd left join `tabDynamic Link` on (
			gd.name = `tabDynamic Link`.link_name and
			`tabDynamic Link`.parenttype = 'Address')
			left join `tabAddress` on (
			`tabAddress`.name = `tabDynamic Link`.parent), `tabGuide Service List` as gsl

			WHERE
				gsl.parent = gd.name
				{conditions} 

			ORDER BY
				gd.name ASC """.format(
				conditions=get_conditions(filters)
			),
			filters,
			as_dict=1,
		)

def get_conditions(filters):
	conditions = []

	if filters.get("name"):
		conditions.append(" AND gd.name in %(name)s")

	if filters.get("city"):
		conditions.append(" AND gd.city in %(city)s")

	if filters.get("state"):
		conditions.append(" AND gd.state in %(state)s")

	if filters.get("country"):
		conditions.append(" AND gd.country in %(country)s")

	if filters.get("guide_service"):
		conditions.append(" AND gsl.guide_service in %(guide_service)s")

	return " ".join(conditions) if conditions else ""