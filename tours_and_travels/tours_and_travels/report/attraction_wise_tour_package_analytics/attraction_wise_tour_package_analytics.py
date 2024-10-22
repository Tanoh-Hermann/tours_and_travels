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
				"label": _("Package ID"),
				"fieldname": "name",
				"fieldtype": "Link",
				"options": "Tour Package",
				"width": 120
			},
			{
				"label": _("Date"),
				"fieldname": "date",
				"fieldtype": "Date",
				"width": 100
			},
			{
				"label": _("Attraction"),
				"fieldname": "attraction",
				"fieldtype": "Link",
				"options": "Attraction",
				"width": 200
			},
			{
				"label": _("Attraction Service"),
				"fieldname": "attraction_service",
				"fieldtype": "Link",
				"options": "Attraction Service",
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
				"label": _("Total"),
				"fieldname": "total",
				"fieldtype": "Currency",
				"width": 120
			},
			{
				"label": _("Package Name"),
				"fieldname": "package_name",
				"fieldtype": "Data",
				"width": 140
			},
			{
				"label": _("Package Type"),
				"fieldname": "package_type",
				"fieldtype": "Data",
				"width": 110
			},
			{
				"label": _("Package Category"),
				"fieldname": "package_category",
				"fieldtype": "Link",
				"options": "Package Category",
				"width": 150
			},
			{
				"label": _("Arrival Date"),
				"fieldname": "arrival_date",
				"fieldtype": "Date",
				"width": 100
			},
			{
				"label": _("Departure Date"),
				"fieldname": "departure_date",
				"fieldtype": "Date",
				"width": 100
			},
			{
				"label": _("Min Trav."),
				"fieldname": "minimum_travellers",
				"fieldtype": "Int",
				"width": 90
			},
			{
				"label": _("Max Trav."),
				"fieldname": "maximum_travellers",
				"fieldtype": "Int",
				"width": 90
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
				tp.name, tp.package_name, tp.package_type, tp.package_category, tp.country, tp.state, tp.arrival_date,
				tp.departure_date, tp.minimum_travellers, tp.maximum_travellers, tp.company, ap.date, 
				ap.city, ap.attraction, ap.attraction_service, ap.qty, ap.unit_price, ap.total

			FROM
				`tabTour Package` as tp, `tabAttraction Package List` as ap

			WHERE
				ap.parent = tp.name
				AND tp.docstatus < 2
				AND tp.arrival_date BETWEEN %(arr_from_date)s AND %(arr_to_date)s
				AND tp.departure_date BETWEEN %(dep_from_date)s AND %(dep_to_date)s

				{conditions}

			ORDER BY
				tp.departure_date DESC """.format(
				conditions=get_conditions(filters)
			),
			filters,
			as_dict=1,
		)

def get_conditions(filters):
	conditions = []

	if filters.get("company"):
		conditions.append(" AND tp.company = %(company)s")

	if filters.get("name"):
		conditions.append(" AND tp.name in %(name)s")

	if filters.get("package_category"):
		conditions.append(" AND tp.package_category in %(package_category)s")

	if filters.get("package_type"):
		conditions.append(" AND tp.package_type = %(package_type)s")

	if filters.get("city"):
		conditions.append(" AND ap.city in %(city)s")

	if filters.get("state"):
		conditions.append(" AND tp.state in %(state)s")

	if filters.get("attraction"):
		conditions.append(" AND ap.attraction in %(attraction)s")

	if filters.get("attraction_service"):
		conditions.append(" AND ap.attraction_service in %(attraction_service)s")

	return " ".join(conditions) if conditions else ""