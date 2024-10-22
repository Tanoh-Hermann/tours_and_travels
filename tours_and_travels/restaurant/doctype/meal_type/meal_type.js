// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.ui.form.on('Meal Type', {
    refresh: function(frm) {
        if (!frm.doc.__islocal) {
            frm.add_custom_button(__("Restaurant"), function() {
                frappe.new_doc("Restaurant",{"restaurant_name": ""}, doc => {
                    let row = frappe.model.add_child(doc, "meal_package_list");
                    row.meal_type = frm.doc.name;
                });
            }, __("Create"));

            frm.add_custom_button(__("Restaurant Details"), function() {
                frappe.route_options = {
                    "meal_type": frm.doc.name
                };
                frappe.set_route("query-report", "Restaurant Details");
            }, __("View"));

            frm.add_custom_button(__("Restaurant-wise Contract"), function() {
                frappe.route_options = {
                    "meal_type": frm.doc.name
                };
                frappe.set_route("query-report", "Restaurant-wise Contract");
            }, __("View"));

            frm.add_custom_button(__("Restaurant-wise Tour Package Analytics"), function() {
                frappe.route_options = {
                    "meal_type": frm.doc.name
                };
                frappe.set_route("query-report", "Restaurant-wise Tour Package Analytics");
            }, __("View"));

            frm.add_custom_button(__("Restaurant-wise Tour Registration Analytics"), function() {
                frappe.route_options = {
                    "show_package": 1,
                    "meal_type": frm.doc.name
                };
                frappe.set_route("query-report", "Restaurant-wise Tour Registration Analytics");
            }, __("View"));
        }
    }
});