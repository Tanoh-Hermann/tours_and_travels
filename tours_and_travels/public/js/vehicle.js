// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.ui.form.on('Vehicle', {
    refresh: function(frm) {
        if (!frm.doc.__islocal) {

            if (!frm.doc.transporter) {
                frm.add_custom_button(__("Transportation"), function() {
                    frappe.new_doc("Transportation Registration",{"transporter_name": ""}, doc => {
                        let row = frappe.model.add_child(doc, "vehicle_list");
                        row.vehicle = frm.doc.name;
                        row.make = frm.doc.make;
                        row.model = frm.doc.model;
                        row.capacity = frm.doc.capacity;
                        row.per_day_cost = frm.doc.per_day_cost;
                    });
                }, __("Create"));
            }

            frm.add_custom_button(__("Transportation Details"), function() {
                frappe.route_options = {
                    "vehicle": frm.doc.name
                };
                frappe.set_route("query-report", "Transportation Details");
            }, __("View"));

            frm.add_custom_button(__("Transportation-wise Contract"), function() {
                frappe.route_options = {
                    "vehicle": frm.doc.name
                };
                frappe.set_route("query-report", "Transportation-wise Contract");
            }, __("View"));

            frm.add_custom_button(__("Transportation-wise Tour Package Analytics"), function() {
                frappe.route_options = {
                    "vehicle": frm.doc.name
                };
                frappe.set_route("query-report", "Transportation-wise Tour Package Analytics");
            }, __("View"));

            frm.add_custom_button(__("Transportation-wise Tour Registration Analytics"), function() {
                frappe.route_options = {
                    "show_package": 1,
                    "vehicle": frm.doc.name
                };
                frappe.set_route("query-report", "Transportation-wise Tour Registration Analytics");
            }, __("View"));
        }
    }
});