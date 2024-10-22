// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.ui.form.on('Hotel', {
    hotel_address: function(frm) {
        if (frm.doc.hotel_address){
            return frm.call({
                method: "frappe.contacts.doctype.address.address.get_address_display",
                args: {
                    "address_dict": frm.doc.hotel_address
                },
                callback: function(r) {
                    if(r.message)
                    frm.set_value("address_display", r.message);
                }
            });
        } else {
            frm.set_value("address_display", "");
        }
    },

    refresh: function(frm) {
        if (frm.doc.hotel_address && !frm.doc.address_display) {
            return frm.call({
                method: "frappe.contacts.doctype.address.address.get_address_display",
                args: {
                    "address_dict": frm.doc.hotel_address
                },
                callback: function(r) {
                    if(r.message)
                    frm.set_value("address_display", r.message);
                    frappe.show_alert({
                        message:__('The Address Display is updated.'),
                        indicator:'green'
                    });
                    frm.save();
                }
            });
        }

        frm.set_query("state", function() {
            return {
                "filters": {
                    "country": frm.doc.country
                    }
                };
        });
        frm.set_query("city", function() {
            return {
                "filters": {
                    "country": frm.doc.country,
                    "state": frm.doc.state
                    }
                };
        });
        frm.set_query('hotel_address', function(doc) {
            return {
                filters: {
                    'link_doctype': 'Hotel',
                    'link_name': frm.doc.name
                }
            }
        });

        if (!frm.doc.__islocal) {

            if (!frm.doc.hotel_address) {
                frm.add_custom_button(__("Address"), function() {
                    frappe.new_doc("Address",{"address_title": ""}, doc => {
                        let row = frappe.model.add_child(doc, "links");
                        row.link_doctype = "Hotel";
                        row.link_name = frm.doc.name;
                    });
                }, __("Create"));
            }

            frm.add_custom_button('Hotel Contract', () => {
                frappe.new_doc('Contract', {
                    package_contract_type: "Hotel",
                    city: frm.doc.city,
                    state: frm.doc.state,
                    country: frm.doc.country
                });
            }, __('Create'));

            frm.add_custom_button('Hotel Folio', () => {
                frappe.new_doc('Hotel Folio', {
                    hotel: frm.doc.name
                });
            }, __('Create'));

            frm.add_custom_button(__("Hotel Details"), function() {
                frappe.route_options = {
                    "name": frm.doc.name
                };
                frappe.set_route("query-report", "Hotel Details");
            }, __("View"));

            frm.add_custom_button(__("Hotel Folio Details"), function() {
                frappe.route_options = {
                    "hotel": frm.doc.name
                };
                frappe.set_route("query-report", "Hotel Folio Details");
            }, __("View"));

            frm.add_custom_button(__("Hotel-wise Contract"), function() {
                frappe.route_options = {
                    "hotel_restaurant": frm.doc.name
                };
                frappe.set_route("query-report", "Hotel-wise Contract");
            }, __("View"));

            frm.add_custom_button(__("Hotel-wise Tour Package Analytics"), function() {
                frappe.route_options = {
                    "hotel": frm.doc.name
                };
                frappe.set_route("query-report", "Hotel-wise Tour Package Analytics");
            }, __("View"));

            frm.add_custom_button(__("Hotel-wise Tour Registration Analytics"), function() {
                frappe.route_options = {
                    "show_package": 1,
                    "hotel": frm.doc.name
                };
                frappe.set_route("query-report", "Hotel-wise Tour Registration Analytics");
            }, __("View"));
        }

    },

    validate: function(frm, cdt, cdn) {
        $.each(frm.doc.hotel_room_list || [], function(i, d) {
            if (!d.description) {
                d.description = frm.doc.name +' - '+ d.hotel_room + ' - '+ d.room_type;
            }
        });
    }
});


frappe.ui.form.on('Hotel Room List', {
    hotel_room: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        $.each(frm.doc.hotel_room_list, function(i, row) {
            if (row.hotel_room === d.hotel_room && row.name != d.name) {
               frappe.msgprint('The '+ '<b>' + d.hotel_room + '</b>' +' you added already exists on the table.');
               frappe.model.remove_from_locals(cdt, cdn);
               frm.refresh_field('hotel_room_list');
               return false;
            }
        });
    },

    available_room: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        if (d.nos_of_rooms < d.available_room) {
            frappe.model.set_value(cdt, cdn, 'available_room', undefined);
            frappe.throw("Available Room qty can not be greater than No of Rooms qty.");
        } else if (d.available_room == 0) {
            frappe.model.set_value(cdt, cdn, 'status', "Not Available");
        } else {
            frappe.model.set_value(cdt, cdn, 'status', "Available");
        }
    },

    nos_of_rooms: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        if (d.nos_of_rooms < d.available_room) {
            frappe.model.set_value(cdt, cdn, 'available_room', undefined);
            frappe.throw("Available Room qty can not be greater than No of Rooms qty.");
        } else if (d.available_room == 0) {
            frappe.model.set_value(cdt, cdn, 'status', "Not Available");
        } else {
            frappe.model.set_value(cdt, cdn, 'status', "Available");
        }
    }
});