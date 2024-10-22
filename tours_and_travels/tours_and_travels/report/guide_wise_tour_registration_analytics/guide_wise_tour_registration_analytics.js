// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Guide-wise Tour Registration Analytics"] = {
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
            "fieldname": "from_date",
            "label": __("From Date"),
            "fieldtype": "Date",
            "default": frappe.defaults.get_user_default("year_start_date"),
            "reqd": 1
        },
        {
            "fieldname": "to_date",
            "label": __("To Date"),
            "fieldtype": "Date",
            "default": frappe.defaults.get_user_default("year_end_date"),
            "reqd": 1
        },
        {
            "fieldname": "name",
            "label": __("Tour Registration"),
            "fieldtype": "MultiSelectList",
            "options": "Tour Registration",
            get_data: function(txt) {
                return frappe.db.get_link_options('Tour Registration', txt);
            }
        },
        {
            "fieldname": "tour_package",
            "label": __("Tour Package"),
            "fieldtype": "MultiSelectList",
            "options": "Tour Package",
            get_data: function(txt) {
                return frappe.db.get_link_options('Tour Package', txt);
            }
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
            "fieldname": "show_package",
            "label": __("Show Attraction Package"),
            "fieldtype": "Check"
        },
        {
            "fieldname": "guide",
            "label": __("Guide"),
            "fieldtype": "MultiSelectList",
            "options": "Guide",
            "depends_on": "show_package",
            get_data: function(txt) {
                return frappe.db.get_link_options('Guide', txt);
            }
        },
        {
            "fieldname": "guide_service",
            "label": __("Guide Service"),
            "fieldtype": "MultiSelectList",
            "options": "Guide Service",
            "depends_on": "show_package",
            get_data: function(txt) {
                return frappe.db.get_link_options('Guide Service', txt);
            }
        },
        {
            "fieldname": "city",
            "label": __("City"),
            "fieldtype": "MultiSelectList",
            "options": "City",
            "depends_on": "show_package",
            get_data: function(txt) {
                return frappe.db.get_link_options('City', txt);
            }
        }
    ],

    onload: function(report) {
        report.page.set_inner_btn_group_as_primary(__('Tour Registration Analytics'));

        report.page.add_inner_button(("Hotel-wise Tour Registration Analytics"), function() {
            var filters = report.get_values();
            frappe.set_route('query-report', 'Hotel-wise Tour Registration Analytics', {
                company: filters.company,
                from_date: filters.from_date,
                to_date: filters.to_date,
                name: filters.name,
                tour_package: filters.tour_package,
                package_category: filters.package_category,
                package_type: filters.package_type,
                city: filters.city,
                state: filters.state
            });
        }, __('Tour Registration Analytics'));

        report.page.add_inner_button(("Restaurant-wise Tour Registration Analytics"), function() {
            var filters = report.get_values();
            frappe.set_route('query-report', 'Restaurant-wise Tour Registration Analytics', {
                company: filters.company,
                from_date: filters.from_date,
                to_date: filters.to_date,
                name: filters.name,
                tour_package: filters.tour_package,
                package_category: filters.package_category,
                package_type: filters.package_type,
                city: filters.city,
                state: filters.state
            });
        }, __('Tour Registration Analytics'));

        report.page.add_inner_button(("Transportation-wise Tour Registration Analytics"), function() {
            var filters = report.get_values();
            frappe.set_route('query-report', 'Transportation-wise Tour Registration Analytics', {
                company: filters.company,
                from_date: filters.from_date,
                to_date: filters.to_date,
                name: filters.name,
                tour_package: filters.tour_package,
                package_category: filters.package_category,
                package_type: filters.package_type,
                city: filters.city,
                state: filters.state
            });
        }, __('Tour Registration Analytics'));

        report.page.add_inner_button(("Attraction-wise Tour Registration Analytics"), function() {
            var filters = report.get_values();
            frappe.set_route('query-report', 'Attraction-wise Tour Registration Analytics', {
                company: filters.company,
                from_date: filters.from_date,
                to_date: filters.to_date,
                name: filters.name,
                tour_package: filters.tour_package,
                package_category: filters.package_category,
                package_type: filters.package_type,
                city: filters.city,
                state: filters.state
            });
        }, __('Tour Registration Analytics'));

        report.page.add_inner_button(("Tour Registration Analytics"), function() {
            var filters = report.get_values();
            frappe.set_route('query-report', 'Tour Registration Analytics', {
                company: filters.company,
                from_date: filters.from_date,
                to_date: filters.to_date,
                name: filters.name,
                tour_package: filters.tour_package,
                package_category: filters.package_category,
                package_type: filters.package_type,
                city: filters.city,
                state: filters.state
            });
        }, __('Tour Registration Analytics'));
    }
};