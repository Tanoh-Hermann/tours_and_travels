// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Restaurant Details"] = {
    "filters": [
        {
            "fieldname": "name",
            "label": __("Restaurant"),
            "fieldtype": "MultiSelectList",
            "options": "Restaurant",
            get_data: function(txt) {
                return frappe.db.get_link_options('Restaurant', txt);
            }
        },
        {
            "fieldname": "meal_type",
            "label": __("Meal Type"),
            "fieldtype": "MultiSelectList",
            "options": "Meal Type",
            get_data: function(txt) {
                return frappe.db.get_link_options('Meal Type', txt);
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