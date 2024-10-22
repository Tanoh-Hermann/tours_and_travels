// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.ui.form.on('Hotel Room', {
    refresh: function(frm) {
        if (!frm.doc.__islocal) {
            frm.add_custom_button(__("Hotel"), function() {
                frappe.new_doc("Hotel",{"hotel_name": ""}, doc => {
                    let row = frappe.model.add_child(doc, "hotel_room_list");
                    row.hotel_room = frm.doc.name;
                    row.room_type = frm.doc.room_type;
                    row.total_capacity = frm.doc.total_capacity;
                });
            }, __("Create"));

            frm.add_custom_button(__("Hotel Details"), function() {
                frappe.route_options = {
                    "hotel_room": frm.doc.name
                };
                frappe.set_route("query-report", "Hotel Details");
            }, __("View"));

            frm.add_custom_button(__("Hotel Folio Details"), function() {
                frappe.route_options = {
                    "hotel_room": frm.doc.name
                };
                frappe.set_route("query-report", "Hotel Folio Details");
            }, __("View"));

            frm.add_custom_button(__("Hotel-wise Tour Package Analytics"), function() {
                frappe.route_options = {
                    "hotel_room": frm.doc.name
                };
                frappe.set_route("query-report", "Hotel-wise Tour Package Analytics");
            }, __("View"));

            frm.add_custom_button(__("Hotel-wise Tour Registration Analytics"), function() {
                frappe.route_options = {
                    "show_package": 1,
                    "hotel_room": frm.doc.name
                };
                frappe.set_route("query-report", "Hotel-wise Tour Registration Analytics");
            }, __("View"));
        }
    }
});