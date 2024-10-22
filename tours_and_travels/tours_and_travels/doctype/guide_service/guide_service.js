// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.ui.form.on('Guide Service', {
    refresh: function(frm) {
        if (!frm.doc.__islocal) {
            frm.add_custom_button(__("Guide"), function() {
                frappe.new_doc("Guide",{"guide_name": ""}, doc => {
                    let row = frappe.model.add_child(doc, "guide_service_list");
                    row.guide_service = frm.doc.name;
                });
            }, __("Create"));

            frm.add_custom_button(__("Guide Details"), function() {
                frappe.route_options = {
                    "guide_service": frm.doc.name
                };
                frappe.set_route("query-report", "Guide Details");
            }, __("View"));

            frm.add_custom_button(__("Guide-wise Tour Package Analytics"), function() {
                frappe.route_options = {
                    "guide_service": frm.doc.name
                };
                frappe.set_route("query-report", "Guide-wise Tour Package Analytics");
            }, __("View"));

            frm.add_custom_button(__("Guide-wise Tour Registration Analytics"), function() {
                frappe.route_options = {
                    "show_package": 1,
                    "guide_service": frm.doc.name
                };
                frappe.set_route("query-report", "Guide-wise Tour Registration Analytics");
            }, __("View"));
        }
    }
});