// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.ui.form.on('Travelling Seasons', {
    refresh: function(frm) {
        if (!frm.doc.__islocal) {
            frm.add_custom_button(__("Hotel-wise Contract"), function() {
                frappe.route_options = {
                    "travelling_seasons": frm.doc.name
                };
                frappe.set_route("query-report", "Hotel-wise Contract");
            }, __("View"));

            frm.add_custom_button(__("Restaurant-wise Contract"), function() {
                frappe.route_options = {
                    "travelling_seasons": frm.doc.name
                };
                frappe.set_route("query-report", "Restaurant-wise Contract");
            }, __("View"));

            frm.add_custom_button(__("Transportation-wise Contract"), function() {
                frappe.route_options = {
                    "travelling_seasons": frm.doc.name
                };
                frappe.set_route("query-report", "Transportation-wise Contract");
            }, __("View"));
        }
    }
});