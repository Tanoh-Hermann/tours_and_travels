// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.ui.form.on('Package Category', {
    refresh: function(frm) {
        if (!frm.doc.__islocal) {
            frm.add_custom_button(__("Tour Package"), function() {
                frappe.route_options = {
                    "package_category": frm.doc.category
                };
                frappe.set_route("tour-package", "new-tour-package");
            }, __("Create"));

            frm.add_custom_button(__("Hotel-wise Tour Package Analytics"), function() {
                frappe.route_options = {
                    "package_category": frm.doc.name
                };
                frappe.set_route("query-report", "Hotel-wise Tour Package Analytics");
            }, __("Tour Package Analytics"));

            frm.add_custom_button(__("Restaurant-wise Tour Package Analytics"), function() {
                frappe.route_options = {
                    "package_category": frm.doc.name
                };
                frappe.set_route("query-report", "Restaurant-wise Tour Package Analytics");
            }, __("Tour Package Analytics"));

            frm.add_custom_button(__("Transportation-wise Tour Package Analytics"), function() {
                frappe.route_options = {
                    "package_category": frm.doc.name
                };
                frappe.set_route("query-report", "Transportation-wise Tour Package Analytics");
            }, __("Tour Package Analytics"));

            frm.add_custom_button(__("Attraction-wise Tour Package Analytics"), function() {
                frappe.route_options = {
                    "package_category": frm.doc.name
                };
                frappe.set_route("query-report", "Attraction-wise Tour Package Analytics");
            }, __("Tour Package Analytics"));

            frm.add_custom_button(__("Guide-wise Tour Package Analytics"), function() {
                frappe.route_options = {
                    "package_category": frm.doc.name
                };
                frappe.set_route("query-report", "Guide-wise Tour Package Analytics");
            }, __("Tour Package Analytics"));

            frm.add_custom_button(__("Tour Registration Analytics"), function() {
                frappe.route_options = {
                    "package_category": frm.doc.name
                };
                frappe.set_route("query-report", "Tour Registration Analytics");
            }, __("Tour Registration Analytics"));

            frm.add_custom_button(__("Hotel-wise Tour Registration Analytics"), function() {
                frappe.route_options = {
                    "package_category": frm.doc.name
                };
                frappe.set_route("query-report", "Hotel-wise Tour Registration Analytics");
            }, __("Tour Registration Analytics"));

            frm.add_custom_button(__("Restaurant-wise Tour Registration Analytics"), function() {
                frappe.route_options = {
                    "package_category": frm.doc.name
                };
                frappe.set_route("query-report", "Restaurant-wise Tour Registration Analytics");
            }, __("Tour Registration Analytics"));

            frm.add_custom_button(__("Transportation-wise Tour Registration Analytics"), function() {
                frappe.route_options = {
                    "package_category": frm.doc.name
                };
                frappe.set_route("query-report", "Transportation-wise Tour Registration Analytics");
            }, __("Tour Registration Analytics"));

            frm.add_custom_button(__("Attraction-wise Tour Registration Analytics"), function() {
                frappe.route_options = {
                    "package_category": frm.doc.name
                };
                frappe.set_route("query-report", "Attraction-wise Tour Registration Analytics");
            }, __("Tour Registration Analytics"));

            frm.add_custom_button(__("Guide-wise Tour Registration Analytics"), function() {
                frappe.route_options = {
                    "package_category": frm.doc.name
                };
                frappe.set_route("query-report", "Guide-wise Tour Registration Analytics");
            }, __("Tour Registration Analytics"));

        }
    }
});