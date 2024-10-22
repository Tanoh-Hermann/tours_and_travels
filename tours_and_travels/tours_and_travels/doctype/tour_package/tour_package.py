# Copyright (c) 2022, Nihantra C. Patel and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import datetime
from frappe.utils import date_diff

class TourPackage(Document):
	pass

def update_hotel_restaurant_price(doc, event):
	for h in doc.get('hotel_package_list'):
		htl = frappe.get_doc("Hotel",h.hotel)
		for row in htl.get('hotel_room_list'):
			if h.hotel == row.parent and h.hotel_room == row.hotel_room:
				h.standard_unit_price = row.unit_price

	for r in doc.get('restaurant_package_list'):
		rst = frappe.get_doc("Restaurant",r.restaurant)
		for row in rst.get('meal_package_list'):
			if r.restaurant == row.parent and r.meal_type == row.meal_type:
				r.standard_unit_price = row.unit_price

	for a in doc.get('attraction_package_list'):
		att = frappe.get_doc("Attraction",a.attraction)
		for row in att.get('attraction_service_list'):
			if a.attraction == row.parent and a.attraction_service == row.attraction_service:
				a.standard_unit_price = row.unit_price

	for g in doc.get('guide_package_list'):
		gd = frappe.get_doc("Guide",g.guide)
		for row in gd.get('guide_service_list'):
			if g.guide == row.parent and g.guide_service == row.guide_service:
				g.standard_price = row.price


@frappe.whitelist()
def generate_itinerary(tp_name, arrival_date, departure_date):

	tp = frappe.db.get_value("Tour Package",{'name': tp_name},'name')
	tp_del = frappe.get_doc('Tour Package', tp)
	tp_del.arrival_date = arrival_date
	tp_del.departure_date = departure_date
	tp_del.set('itinerary', [])
	tp_del.save()

	base = datetime.datetime.strptime(arrival_date, '%Y-%m-%d')
	numdays = date_diff(departure_date, arrival_date) + 1

	for x in range(numdays):

		date_list = base + datetime.timedelta(days=x)
		loop_date = date_list.strftime('%Y-%m-%d')
		loop_numdays = date_diff(loop_date, arrival_date) + 1

		tp_upd = frappe.get_doc("Tour Package",tp)
		row = tp_upd.append('itinerary', {})
		row.itinerary_date = loop_date
		row.description = "Day "+ str(loop_numdays) + " Itinerary Schedule"
		tp_upd.save()