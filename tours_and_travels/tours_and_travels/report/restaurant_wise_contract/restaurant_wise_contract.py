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
				"label": _("Contract Name"),
				"fieldname": "name",
				"fieldtype": "Link",
				"options": "Contract",
				"width": 120
			},
			{
				"label": _("Party Name"),
				"fieldname": "party_name",
				"fieldtype": "Link",
				"options": "Supplier",
				"width": 120
			},
			{
				"label": _("Travelling Seasons"),
				"fieldname": "travelling_seasons",
				"fieldtype": "Link",
				"options": "Travelling Seasons",
				"width": 140
			},
			{
				"label": _("Start Date"),
				"fieldname": "start_date",
				"fieldtype": "Date",
				"width": 100
			},
			{
				"label": _("End Date"),
				"fieldname": "end_date",
				"fieldtype": "Date",
				"width": 100
			},
			{
				"label": _("Restaurant"),
				"fieldname": "hotel_restaurant",
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
				"width": 90
			},
			{
				"label": _("Unit Price"),
				"fieldname": "unit_price",
				"fieldtype": "Currency",
				"width": 100
			},
			{
				"label": _("Signed"),
				"fieldname": "is_signed",
				"fieldtype": "Check",
				"width": 70
			},
			{
				"label": _("Signee"),
				"fieldname": "signee",
				"fieldtype": "Data",
				"width": 100
			},
			{
				"label": _("Signed On"),
				"fieldname": "signed_on",
				"fieldtype": "Datetime",
				"width": 130
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
			}
		]
	return columns

def get_data(filters):
	return frappe.db.sql(
			"""
			SELECT
				ctr.name, ctr.party_name, ctr.travelling_seasons, ctr.start_date, ctr.end_date, ctr.hotel_restaurant,
				mpl.meal_type, mpl.qty, mpl.unit_price, ctr.is_signed,
				ctr.signee, ctr.signed_on, ctr.city, ctr.state, ctr.country

			FROM
				`tabContract` as ctr, `tabMeal Package List` as mpl

			WHERE
				mpl.parent = ctr.name
				AND ctr.docstatus < 2
				AND ctr.package_contract_type = "Restaurant"
				AND ctr.start_date BETWEEN %(start_from_date)s AND %(start_to_date)s
				AND ctr.end_date BETWEEN %(end_from_date)s AND %(end_to_date)s

				{conditions}

			ORDER BY
				ctr.end_date DESC """.format(
				conditions=get_conditions(filters)
			),
			filters,
			as_dict=1,
		)

def get_conditions(filters):
	conditions = []

	if filters.get("name"):
		conditions.append(" AND ctr.name in %(name)s")

	if filters.get("party_name"):
		conditions.append(" AND ctr.party_name in %(party_name)s")

	if filters.get("travelling_seasons"):
		conditions.append(" AND ctr.travelling_seasons in %(travelling_seasons)s")

	if filters.get("hotel_restaurant"):
		conditions.append(" AND ctr.hotel_restaurant in %(hotel_restaurant)s")

	if filters.get("meal_type"):
		conditions.append(" AND mpl.meal_type in %(meal_type)s")

	if filters.get("city"):
		conditions.append(" AND ctr.city in %(city)s")

	if filters.get("state"):
		conditions.append(" AND ctr.state in %(state)s")

	if filters.get("country"):
		conditions.append(" AND ctr.country in %(country)s")

	return " ".join(conditions) if conditions else ""