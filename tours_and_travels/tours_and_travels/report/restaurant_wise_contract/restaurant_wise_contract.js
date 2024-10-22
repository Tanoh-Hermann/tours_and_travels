// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Restaurant-wise Contract"] = {
    "filters": [
        {
            "fieldname": "start_from_date",
            "label": __("Start From Date"),
            "fieldtype": "Date",
            "default": frappe.defaults.get_user_default("year_start_date"),
            "reqd": 1
        },
        {
            "fieldname": "start_to_date",
            "label": __("Start To Date"),
            "fieldtype": "Date",
            "default": frappe.defaults.get_user_default("year_end_date"),
            "reqd": 1
        },
        {
            "fieldname": "end_from_date",
            "label": __("End From Date"),
            "fieldtype": "Date",
            "default": frappe.defaults.get_user_default("year_start_date"),
            "reqd": 1
        },
        {
            "fieldname": "end_to_date",
            "label": __("End To Date"),
            "fieldtype": "Date",
            "default": frappe.defaults.get_user_default("year_end_date"),
            "reqd": 1
        },
        {
            "fieldname": "name",
            "label": __("Contract Name"),
            "fieldtype": "MultiSelectList",
            "options": "Contract",
            get_data: function(txt) {
                return frappe.db.get_link_options('Contract', txt, {
                	package_contract_type: "Restaurant"
                });
            }
        },
        {
            "fieldname": "party_name",
            "label": __("Party Name"),
            "fieldtype": "MultiSelectList",
            "options": "Supplier",
            get_data: function(txt) {
                return frappe.db.get_link_options('Supplier', txt)
            }
        },
        {
            "fieldname": "travelling_seasons",
            "label": __("Travelling Seasons"),
            "fieldtype": "MultiSelectList",
            "options": "Travelling Seasons",
            get_data: function(txt) {
                return frappe.db.get_link_options('Travelling Seasons', txt);
            }
        },
        {
            "fieldname": "hotel_restaurant",
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
    ],

    onload: function(report) {
        report.page.set_inner_btn_group_as_primary(__('Contract Reports'));

        report.page.add_inner_button(("Hotel-wise Contract"), function() {
            var filters = report.get_values();
            frappe.set_route('query-report', 'Hotel-wise Contract', {
                start_from_date: filters.start_from_date,
                start_to_date: filters.start_to_date,
                dep_from_date: filters.dep_from_date,
                dep_to_date: filters.dep_to_date,
                name: filters.name,
                party_name: filters.party_name,
                travelling_seasons: filters.travelling_seasons,
                city: filters.city,
                state: filters.state,
                country: filters.country
            });
        }, __('Contract Reports'));

        report.page.add_inner_button(("Transportation-wise Contract"), function() {
            var filters = report.get_values();
            frappe.set_route('query-report', 'Transportation-wise Contract', {
                start_from_date: filters.start_from_date,
                start_to_date: filters.start_to_date,
                dep_from_date: filters.dep_from_date,
                dep_to_date: filters.dep_to_date,
                name: filters.name,
                party_name: filters.party_name,
                travelling_seasons: filters.travelling_seasons,
                city: filters.city,
                state: filters.state,
                country: filters.country
            });
        }, __('Contract Reports'));

    }
};