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
				"label": _("Hotel Total Qty"),
				"fieldname": "hotel_total_qty",
				"fieldtype": "Int",
				"width": 120
			})
		columns.append(
			{
				"label": _("Hotel Total Amount"),
				"fieldname": "hotel_total_amount",
				"fieldtype": "Currency",
				"width": 140
			})

	if filters.get("show_package") == 1:
		columns.append(
			{
				"label": _("From Date"),
				"fieldname": "from_date",
				"fieldtype": "Date",
				"width": 100
			})
		columns.append(
			{
				"label": _("To Date"),
				"fieldname": "to_date",
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
				"label": _("Hotel"),
				"fieldname": "hotel",
				"fieldtype": "Link",
				"options": "Hotel",
				"width": 200
			})
		columns.append(
			{
				"label": _("Hotel Room"),
				"fieldname": "hotel_room",
				"fieldtype": "Link",
				"options": "Hotel Room",
				"width": 120
			})
		columns.append(
			{
				"label": _("Room Type"),
				"fieldname": "room_type",
				"fieldtype": "Link",
				"options": "Room Type",
				"width": 100
			})
		columns.append(
			{
				"label": _("Duration"),
				"fieldname": "duration",
				"fieldtype": "Int",
				"width": 90
			})
		columns.append(
			{
				"label": _("Room Qty"),
				"fieldname": "room_qty",
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
					tr.date, tr.name, tr.tour_package, tr.customer, tr.hotel_total_qty, tr.hotel_total_amount,
					hp.from_date, hp.to_date, hp.city, hp.hotel, hp.hotel_room, hp.room_type, hp.duration,
					hp.room_qty, hp.unit_price, hp.total, tr.package_name, tr.package_type, tr.package_category,
					tr.arrival_date, tr.departure_date, tr.state, tr.country

				FROM
					`tabTour Registration` as tr, `tabHotel Package List` as hp

				WHERE
					hp.parent = tr.name
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
					tr.date, tr.name, tr.tour_package, tr.customer, tr.hotel_total_qty, tr.hotel_total_amount, tr.package_name, 
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
		conditions.append(" AND hp.city in %(city)s")

	if filters.get("state"):
		conditions.append(" AND tr.state in %(state)s")

	if filters.get("country"):
		conditions.append(" AND tr.country in %(country)s")

	if filters.get("hotel"):
		conditions.append(" AND hp.hotel in %(hotel)s")

	if filters.get("hotel_room"):
		conditions.append(" AND hp.hotel_room in %(hotel_room)s")

	return " ".join(conditions) if conditions else ""