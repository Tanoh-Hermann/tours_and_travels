// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Hotel Details"] = {
    "filters": [
        {
            "fieldname": "name",
            "label": __("Hotel"),
            "fieldtype": "MultiSelectList",
            "options": "Hotel",
            get_data: function(txt) {
                return frappe.db.get_link_options('Hotel', txt);
            }
        },
        {
            "fieldname": "hotel_room",
            "label": __("Hotel Room"),
            "fieldtype": "MultiSelectList",
            "options": "Hotel Room",
            get_data: function(txt) {
                return frappe.db.get_link_options('Hotel Room', txt);
            }
        },
        {
            "fieldname": "room_type",
            "label": __("Room Type"),
            "fieldtype": "MultiSelectList",
            "options": "Room Type",
            get_data: function(txt) {
                return frappe.db.get_link_options('Room Type', txt);
            }
        },
        {
            "fieldname": "city",
            "label": __("City"),
            "fieldtype": "MultiSelectList",
            "options": "City",
            get_data: function(txt) {
                return frappe.db.get_link_options('City', txt);
            }
        },
        {
            "fieldname": "state",
            "label": __("State"),
            "fieldtype": "MultiSelectList",
            "options": "State",
            get_data: function(txt) {
                return frappe.db.get_link_options('State', txt);
            }
        },
        {
            "fieldname": "country",
            "label": __("Country"),
            "fieldtype": "MultiSelectList",
            "options": "Country",
            get_data: function(txt) {
                return frappe.db.get_link_options('Country', txt);
            }
        },
        {
            "fieldname": "status",
            "label": __("Status"),
            "fieldtype": "Select",
            "options": ["", "Available", "Not Available"]
        }
    ]
};