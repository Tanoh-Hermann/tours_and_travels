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
				"label": _("Restaurant"),
				"fieldname": "name",
				"fieldtype": "Link",
				"options": "Restaurant",
				"width": 200
			},
			{
				"label": _("Meal Type"),
				"fieldname": "meal_type",
				"fieldtype": "Link",
				"options": "Meal Type",
				"width": 120
			},
			{
				"label": _("Qty"),
				"fieldname": "qty",
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
				"label": _("Restaurant Address"),
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
				"label": _("Restaurant Facility"),
				"fieldname": "restaurant_facility_list",
				"fieldtype": "Data",
				"width": 500
			}
		]
	return columns

def get_data(filters):
	return frappe.db.sql(
			"""
			SELECT
				rest.name, mpl.meal_type, mpl.qty, mpl.unit_price,
				concat_ws(', ',
				trim(',' from `tabAddress`.address_line1),
				trim(',' from `tabAddress`.address_line2)
				) AS address,
				rest.city, rest.state, rest.country, rest.website, rest.phone, rest.restaurant_facility_list

			FROM
			`tabRestaurant` as rest left join `tabDynamic Link` on (
			rest.name = `tabDynamic Link`.link_name and
			`tabDynamic Link`.parenttype = 'Address')
			left join `tabAddress` on (
			`tabAddress`.name = `tabDynamic Link`.parent), `tabMeal Package List` as mpl

			WHERE
				mpl.parent = rest.name
				{conditions} 

			ORDER BY
				rest.name, mpl.meal_type ASC """.format(
				conditions=get_conditions(filters)
			),
			filters,
			as_dict=1,
		)

def get_conditions(filters):
	conditions = []

	if filters.get("name"):
		conditions.append(" AND rest.name in %(name)s")

	if filters.get("city"):
		conditions.append(" AND rest.city in %(city)s")

	if filters.get("state"):
		conditions.append(" AND rest.state in %(state)s")

	if filters.get("country"):
		conditions.append(" AND rest.country in %(country)s")

	if filters.get("meal_type"):
		conditions.append(" AND mpl.meal_type in %(meal_type)s")


	return " ".join(conditions) if conditions else ""