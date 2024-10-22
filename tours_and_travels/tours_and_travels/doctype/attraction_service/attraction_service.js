// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.ui.form.on('Attraction Service', {
    refresh: function(frm) {
        if (!frm.doc.__islocal) {
            frm.add_custom_button(__("Attraction"), function() {
                frappe.new_doc("Attraction",{"attraction_name": ""}, doc => {
                    let row = frappe.model.add_child(doc, "attraction_service_list");
                    row.attraction_service = frm.doc.name;
                });
            }, __("Create"));

            frm.add_custom_button(__("Attraction Details"), function() {
                frappe.route_options = {
                    "attraction_service": frm.doc.name
                };
                frappe.set_route("query-report", "Attraction Details");
            }, __("View"));

            frm.add_custom_button(__("Attraction-wise Tour Package Analytics"), function() {
                frappe.route_options = {
                    "attraction_service": frm.doc.name
                };
                frappe.set_route("query-report", "Attraction-wise Tour Package Analytics");
            }, __("View"));

            frm.add_custom_button(__("Attraction-wise Tour Registration Analytics"), function() {
                frappe.route_options = {
                    "show_package": 1,
                    "attraction_service": frm.doc.name
                };
                frappe.set_route("query-report", "Attraction-wise Tour Registration Analytics");
            }, __("View"));
        }
    }
});