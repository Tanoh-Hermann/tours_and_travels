// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.ui.form.on('Room Type', {
    refresh: function(frm) {
        if (!frm.doc.__islocal) {
            frm.add_custom_button(__("Hotel Room"), function() {
                frappe.route_options = {
                    "room_type": frm.doc.name
                };
                frappe.set_route("hotel-room", "new-hotel-room");
            }, __("Create"));

            frm.add_custom_button(__("Hotel Details"), function() {
                frappe.route_options = {
                    "room_type": frm.doc.name
                };
                frappe.set_route("query-report", "Hotel Details");
            }, __("View"));

            frm.add_custom_button(__("Hotel Folio Details"), function() {
                frappe.route_options = {
                    "room_type": frm.doc.name
                };
                frappe.set_route("query-report", "Hotel Folio Details");
            }, __("View"));
        }
    }
});