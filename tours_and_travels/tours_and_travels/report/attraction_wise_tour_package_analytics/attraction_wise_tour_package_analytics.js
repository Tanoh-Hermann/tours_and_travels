// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Attraction-wise Tour Package Analytics"] = {
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
            "fieldname": "arr_from_date",
            "label": __("Arrival From Date"),
            "fieldtype": "Date",
            "default": frappe.defaults.get_user_default("year_start_date"),
            "reqd": 1
        },
        {
            "fieldname": "arr_to_date",
            "label": __("Arrival To Date"),
            "fieldtype": "Date",
            "default": frappe.defaults.get_user_default("year_end_date"),
            "reqd": 1
        },
        {
            "fieldname": "dep_from_date",
            "label": __("Departure From Date"),
            "fieldtype": "Date",
            "default": frappe.defaults.get_user_default("year_start_date"),
            "reqd": 1
        },
        {
            "fieldname": "dep_to_date",
            "label": __("Departure To Date"),
            "fieldtype": "Date",
            "default": frappe.defaults.get_user_default("year_end_date"),
            "reqd": 1
        },
        {
            "fieldname": "name",
            "label": __("Package ID"),
            "fieldtype": "MultiSelectList",
            "options": "Tour Package",
            get_data: function(txt) {
                return frappe.db.get_link_options('Tour Package', txt);
            }
        },
        {
            "fieldname": "package_category",
            "label": __("Package Category"),
            "fieldtype": "MultiSelectList",
            "options": "Package Category",
            get_data: function(txt) {
                return frappe.db.get_link_options('Package Category', txt);
            }
        },
        {
            "fieldname": "package_type",
            "label": __("Package Type"),
            "fieldtype": "Select",
            "options": ["", "Domestic", "International"]
        },
        {
            "fieldname": "attraction",
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
        }
    ],

    onload: function(report) {
        report.page.set_inner_btn_group_as_primary(__('Tour Package Analytics'));

        report.page.add_inner_button(("Hotel-wise Tour Package Analytics"), function() {
            var filters = report.get_values();
            frappe.set_route('query-report', 'Hotel-wise Tour Package Analytics', {
                company: filters.company,
                arr_from_date: filters.arr_from_date,
                arr_to_date: filters.arr_to_date,
                dep_from_date: filters.dep_from_date,
                dep_to_date: filters.dep_to_date,
                name: filters.name,
                package_category: filters.package_category,
                package_type: filters.package_type,
                city: filters.city,
                state: filters.state
            });
        }, __('Tour Package Analytics'));

        report.page.add_inner_button(("Restaurant-wise Tour Package Analytics"), function() {
            var filters = report.get_values();
            frappe.set_route('query-report', 'Restaurant-wise Tour Package Analytics', {
                company: filters.company,
                arr_from_date: filters.arr_from_date,
                arr_to_date: filters.arr_to_date,
                dep_from_date: filters.dep_from_date,
                dep_to_date: filters.dep_to_date,
                name: filters.name,
                package_category: filters.package_category,
                package_type: filters.package_type,
                city: filters.city,
                state: filters.state
            });
        }, __('Tour Package Analytics'));

        report.page.add_inner_button(("Transportation-wise Tour Package Analytics"), function() {
            var filters = report.get_values();
            frappe.set_route('query-report', 'Transportation-wise Tour Package Analytics', {
                company: filters.company,
                arr_from_date: filters.arr_from_date,
                arr_to_date: filters.arr_to_date,
                dep_from_date: filters.dep_from_date,
                dep_to_date: filters.dep_to_date,
                name: filters.name,
                package_category: filters.package_category,
                package_type: filters.package_type,
                state: filters.state
            });
        }, __('Tour Package Analytics'));

        report.page.add_inner_button(("Guide-wise Tour Package Analytics"), function() {
            var filters = report.get_values();
            frappe.set_route('query-report', 'Guide-wise Tour Package Analytics', {
                company: filters.company,
                arr_from_date: filters.arr_from_date,
                arr_to_date: filters.arr_to_date,
                dep_from_date: filters.dep_from_date,
                dep_to_date: filters.dep_to_date,
                name: filters.name,
                package_category: filters.package_category,
                package_type: filters.package_type,
                city: filters.city,
                state: filters.state
            });
        }, __('Tour Package Analytics'));
    }
};