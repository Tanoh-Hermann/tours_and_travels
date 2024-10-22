// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Hotel Folio Details"] = {
    "filters": [
        {
            "fieldname": "company",
            "label": __("Company"),
            "fieldtype": "Link",
            "options": "Company",
            "default": frappe.defaults.get_user_default("Company"),
            "reqd": 1
        },
        {
            "fieldname": "name",
            "label": __("Hotel Folio"),
            "fieldtype": "Link",
            "options": "Hotel Folio"
        },
        {
            "fieldname": "customer",
            "label": __("Customer"),
            "fieldtype": "MultiSelectList",
            "options": "Customer",
            get_data: function(txt) {
                return frappe.db.get_link_options('Customer', txt);
            }
        },
        {
            "fieldname": "hotel",
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
        }
    ]
};