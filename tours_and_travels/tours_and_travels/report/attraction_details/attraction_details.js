// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Attraction Details"] = {
    "filters": [
        {
            "fieldname": "name",
            "label": __("Attraction"),
            "fieldtype": "MultiSelectList",
            "options": "Attraction",
            get_data: function(txt) {
                return frappe.db.get_link_options('Attraction', txt);
            }
        },
        {
            "fieldname": "attraction_service",
            "label": __("Attraction Service"),
            "fieldtype": "MultiSelectList",
            "options": "Attraction Service",
            get_data: function(txt) {
                return frappe.db.get_link_options('Attraction Service', txt);
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
        }
    ]
};