// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.ui.form.on('Transportation Registration', {
    address: function(frm) {
        if (frm.doc.address) {
            return frm.call({
                method: "frappe.contacts.doctype.address.address.get_address_display",
                args: {
                    "address_dict": frm.doc.address
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
        if (frm.doc.address && !frm.doc.address_display) {
            return frm.call({
                method: "frappe.contacts.doctype.address.address.get_address_display",
                args: {
                    "address_dict": frm.doc.address
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

        frm.set_query('address', function(doc) {
            return {
                filters: {
                    'link_doctype': 'Transportation Registration',
                    'link_name': frm.doc.name
                }
            }
        });
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

        if (!frm.doc.__islocal) {

            if (!frm.doc.address) {
                frm.add_custom_button(__("Address"), function() {
                    frappe.new_doc("Address",{"address_title": ""}, doc => {
                        let row = frappe.model.add_child(doc, "links");
                        row.link_doctype = "Transportation Registration";
                        row.link_name = frm.doc.name;
                    });
                }, __("Create"));
            }

            frm.add_custom_button('Transportation Contract', () => {
                frappe.new_doc('Contract', {
                    package_contract_type: "Transportation Registration",
                    city: frm.doc.city,
                    state: frm.doc.state,
                    country: frm.doc.country
                });
            }, __('Create'));

            frm.add_custom_button(__("Transportation Details"), function() {
                frappe.route_options = {
                    "name": frm.doc.name
                };
                frappe.set_route("query-report", "Transportation Details");
            }, __("View"));

            frm.add_custom_button(__("Transportation-wise Contract"), function() {
                frappe.route_options = {
                    "hotel_restaurant": frm.doc.name
                };
                frappe.set_route("query-report", "Transportation-wise Contract");
            }, __("View"));

            frm.add_custom_button(__("Transportation-wise Tour Package Analytics"), function() {
                frappe.route_options = {
                    "transportation": frm.doc.name
                };
                frappe.set_route("query-report", "Transportation-wise Tour Package Analytics");
            }, __("View"));

            frm.add_custom_button(__("Transportation-wise Tour Registration Analytics"), function() {
                frappe.route_options = {
                    "show_package": 1,
                    "transportation": frm.doc.name
                };
                frappe.set_route("query-report", "Transportation-wise Tour Registration Analytics");
            }, __("View"));
        }
    }
});


frappe.ui.form.on('Vehicle List', {
    vehicle: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        $.each(frm.doc.vehicle_list, function(i, row) {
            if (row.vehicle === d.vehicle && row.name != d.name) {
                frappe.msgprint('The '+ '<b>' + d.vehicle + '</b>' +' you added already exists on the table.');
                frappe.model.remove_from_locals(cdt, cdn);
                frm.refresh_field('vehicle_list');
                return false;
            }
        });
    }
});