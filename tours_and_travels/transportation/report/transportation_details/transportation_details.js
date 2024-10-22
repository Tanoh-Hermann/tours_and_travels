// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Transportation Details"] = {
    "filters": [
        {
            "fieldname": "name",
            "label": __("Transportation"),
            "fieldtype": "MultiSelectList",
            "options": "Transportation Registration",
            get_data: function(txt) {
                return frappe.db.get_link_options('Transportation Registration', txt);
            }
        },
        {
            "fieldname": "vehicle",
            "label": __("Vehicle"),
            "fieldtype": "MultiSelectList",
            "options": "Vehicle",
            get_data: function(txt) {
                return frappe.db.get_link_options('Vehicle', txt);
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