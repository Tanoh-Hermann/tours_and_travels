// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.ui.form.on('Guide', {
    guide_address: function(frm) {
        if (frm.doc.guide_address) {
            return frm.call({
                method: "frappe.contacts.doctype.address.address.get_address_display",
                args: {
                    "address_dict": frm.doc.guide_address
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
        if (frm.doc.guide_address && !frm.doc.address_display) {
            return frm.call({
                method: "frappe.contacts.doctype.address.address.get_address_display",
                args: {
                    "address_dict": frm.doc.guide_address
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

        frm.set_query('guide_address', function(doc) {
            return {
                filters: {
                    'link_doctype': 'Guide',
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

            if (!frm.doc.guide_address) {
                frm.add_custom_button(__("Address"), function() {
                    frappe.new_doc("Address",{"address_title": ""}, doc => {
                        let row = frappe.model.add_child(doc, "links");
                        row.link_doctype = "Guide";
                        row.link_name = frm.doc.name;
                    });
                }, __("Create"));
            }

            frm.add_custom_button(__("Guide Details"), function() {
                frappe.route_options = {
                    "name": frm.doc.name
                };
                frappe.set_route("query-report", "Guide Details");
            }, __("View"));

            frm.add_custom_button(__("Guide-wise Tour Package Analytics"), function() {
                frappe.route_options = {
                    "guide": frm.doc.name
                };
                frappe.set_route("query-report", "Guide-wise Tour Package Analytics");
            }, __("View"));

            frm.add_custom_button(__("Guide-wise Tour Registration Analytics"), function() {
                frappe.route_options = {
                    "show_package": 1,
                    "guide": frm.doc.name
                };
                frappe.set_route("query-report", "Guide-wise Tour Registration Analytics");
            }, __("View"));
        }
    }
});


frappe.ui.form.on('Guide Service List', {
    guide_service: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        $.each(frm.doc.guide_service_list, function(i, row) {
            if (row.guide_service === d.guide_service && row.name != d.name) {
                frappe.msgprint('The '+ '<b>' + d.guide_service + '</b>' +' you added already exists on the table.');
                frappe.model.remove_from_locals(cdt, cdn);
                frm.refresh_field('guide_service_list');
                return false;
            }
        });
    }
});