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
				"label": _("Date"),
				"fieldname": "date",
				"fieldtype": "Date",
				"width": 100
			},
			{
				"label": _("Tour Regi. ID"),
				"fieldname": "name",
				"fieldtype": "Link",
				"options": "Tour Registration",
				"width": 110
			},
			{
				"label": _("Tour Package"),
				"fieldname": "tour_package",
				"fieldtype": "Link",
				"options": "Tour Package",
				"width": 110
			},
			{
				"label": _("Customer"),
				"fieldname": "customer",
				"fieldtype": "Link",
				"options": "Customer",
				"width": 120
			},
			{
				"label": _("Hotel Total Qty"),
				"fieldname": "hotel_total_qty",
				"fieldtype": "Currency",
				"width": 120
			},
			{
				"label": _("Hotel Total Amount"),
				"fieldname": "hotel_total_amount",
				"fieldtype": "Currency",
				"width": 145
			},
			{
				"label": _("Rest. Total Qty"),
				"fieldname": "restaurant_total_qty",
				"fieldtype": "Currency",
				"width": 120
			},
			{
				"label": _("Rest. Total Amount"),
				"fieldname": "restaurant_total_amount",
				"fieldtype": "Currency",
				"width": 145
			},
			{
				"label": _("Trans. Total Qty"),
				"fieldname": "transportation_total_qty",
				"fieldtype": "Currency",
				"width": 125
			},
			{
				"label": _("Tras. Total Amount"),
				"fieldname": "transportation_total_amount",
				"fieldtype": "Currency",
				"width": 145
			},
			{
				"label": _("Attraction Total Qty"),
				"fieldname": "attraction_total_qty",
				"fieldtype": "Currency",
				"width": 150
			},
			{
				"label": _("Attraction Total Amount"),
				"fieldname": "attraction_total_amount",
				"fieldtype": "Currency",
				"width": 150
			},
			{
				"label": _("Guide Total Amount"),
				"fieldname": "guide_total_amount",
				"fieldtype": "Currency",
				"width": 155
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
				"width": 115
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
				tr.date, tr.name, tr.tour_package, tr.customer, tr.hotel_total_qty, tr.hotel_total_amount, tr.restaurant_total_qty,
				tr.restaurant_total_amount, tr.transportation_total_qty, tr.transportation_total_amount, tr.attraction_total_qty,
				tr.attraction_total_amount, tr.guide_total_amount, tr.package_name, tr.package_type, tr.package_category,
				tr.arrival_date, tr.departure_date, tr.state, tr.country

			FROM
				`tabTour Registration` as tr

			WHERE
				tr.docstatus < 2
				AND tr.date BETWEEN %(from_date)s AND %(to_date)s

				{conditions}

			ORDER BY
				tr.date DESC """.format(
				conditions=get_conditions(filters)
			),
			filters,
			as_dict=1,
		)	

def get_conditions(filters):
	conditions = []

	if filters.get("company"):
		conditions.append(" AND tr.company = %(company)s")

	if filters.get("name"):
		conditions.append(" AND tr.name in %(name)s")

	if filters.get("tour_package"):
		conditions.append(" AND tr.tour_package in %(tour_package)s")

	if filters.get("customer"):
		conditions.append(" AND tr.customer in %(customer)s")

	if filters.get("package_category"):
		conditions.append(" AND tr.package_category in %(package_category)s")

	if filters.get("package_type"):
		conditions.append(" AND tr.package_type = %(package_type)s")

	if filters.get("state"):
		conditions.append(" AND tr.state in %(state)s")

	if filters.get("country"):
		conditions.append(" AND tr.country in %(country)s")

	return " ".join(conditions) if conditions else ""