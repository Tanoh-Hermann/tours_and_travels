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
		]

	if filters.get("show_package") != 1:
		columns.append(
			{
				"label": _("Restaurant Total Qty"),
				"fieldname": "restaurant_total_qty",
				"fieldtype": "Int",
				"width": 120
			})
		columns.append(
			{
				"label": _("Restaurant Total Amount"),
				"fieldname": "restaurant_total_amount",
				"fieldtype": "Currency",
				"width": 140
			})

	if filters.get("show_package") == 1:
		columns.append(
			{
				"label": _("Date"),
				"fieldname": "rp_date",
				"fieldtype": "Date",
				"width": 100
			})
		columns.append(
			{
				"label": _("City"),
				"fieldname": "city",
				"fieldtype": "Link",
				"options": "City",
				"width": 100
			})
		columns.append(
			{
				"label": _("Restaurant"),
				"fieldname": "restaurant",
				"fieldtype": "Link",
				"options": "Restaurant",
				"width": 200
			})
		columns.append(
			{
				"label": _("Meal Type"),
				"fieldname": "meal_type",
				"fieldtype": "Link",
				"options": "Meal Type",
				"width": 120
			})
		columns.append(
			{
				"label": _("Qty"),
				"fieldname": "qty",
				"fieldtype": "Int",
				"width": 100
			})
		columns.append(
			{
				"label": _("Unit Price"),
				"fieldname": "unit_price",
				"fieldtype": "Currency",
				"width": 100
			})
		columns.append(
			{
				"label": _("Total"),
				"fieldname": "total",
				"fieldtype": "Currency",
				"width": 120
			})

	columns.extend(
		[
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
		)
	return columns

def get_data(filters):
	if filters.get("show_package") == 1:
		return frappe.db.sql(
				"""
				SELECT
					tr.date, tr.name, tr.tour_package, tr.customer, tr.restaurant_total_qty, tr.restaurant_total_amount, rp.date as rp_date, 
					rp.city, rp.restaurant, rp.meal_type, rp.qty, rp.unit_price, rp.total, tr.package_name, tr.package_type, tr.package_category,
					tr.arrival_date, tr.departure_date, tr.state, tr.country

				FROM
					`tabTour Registration` as tr, `tabRestaurant Package List` as rp

				WHERE
					rp.parent = tr.name
					AND tr.docstatus < 2
					AND tr.date BETWEEN %(from_date)s AND %(to_date)s

					{conditions}

				ORDER BY
					tr.date DESC """.format(
					conditions=get_conditions(filters)
				),
				filters,
				as_dict=1,
			)
	else:
		return frappe.db.sql(
				"""
				SELECT
					tr.date, tr.name, tr.tour_package, tr.customer, tr.restaurant_total_qty, tr.restaurant_total_amount, tr.package_name, 
					tr.package_type, tr.package_category, tr.arrival_date, tr.departure_date, tr.state, tr.country

				FROM
					`tabTour Registration` as tr

				WHERE
					tr.docstatus < 2
					AND tr.date BETWEEN %(from_date)s AND %(to_date)s

					{conditions} """.format(
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

	if filters.get("city"):
		conditions.append(" AND rp.city in %(city)s")

	if filters.get("state"):
		conditions.append(" AND tr.state in %(state)s")

	if filters.get("country"):
		conditions.append(" AND tr.country in %(country)s")

	if filters.get("restaurant"):
		conditions.append(" AND rp.restaurant in %(restaurant)s")

	if filters.get("meal_type"):
		conditions.append(" AND rp.meal_type in %(meal_type)s")

	return " ".join(conditions) if conditions else ""