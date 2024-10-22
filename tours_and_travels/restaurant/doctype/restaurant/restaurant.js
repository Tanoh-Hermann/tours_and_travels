// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.ui.form.on('Restaurant', {
    restaurant_address: function(frm) {
        if (frm.doc.restaurant_address){
            return frm.call({
                method: "frappe.contacts.doctype.address.address.get_address_display",
                args: {
                    "address_dict": frm.doc.restaurant_address
                },
                callback: function(r) {
                    if(r.message)
                    frm.set_value("address_display", r.message);
                }
            });
        }
        else {
            frm.set_value("address_display", "");
        }
    },

    refresh: function(frm) {
        if (frm.doc.restaurant_address && !frm.doc.address_display) {
            return frm.call({
                method: "frappe.contacts.doctype.address.address.get_address_display",
                args: {
                    "address_dict": frm.doc.restaurant_address
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
        frm.set_query('restaurant_address', function(doc) {
         return {
             filters: {
                 'link_doctype': 'Restaurant',
                 'link_name': frm.doc.name
                }
            }
        });

        if (!frm.doc.__islocal) {

            if (!frm.doc.restaurant_address) {
                frm.add_custom_button(__("Address"), function() {
                    frappe.new_doc("Address",{"address_title": ""}, doc => {
                        let row = frappe.model.add_child(doc, "links");
                        row.link_doctype = "Restaurant";
                        row.link_name = frm.doc.name;
                    });
                }, __("Create"));
            }

            frm.add_custom_button('Restaurant Contract', () => {
                frappe.new_doc('Contract', {
                    package_contract_type: "Restaurant",
                    city: frm.doc.city,
                    state: frm.doc.state,
                    country: frm.doc.country
                });
            }, __('Create'));

            frm.add_custom_button(__("Restaurant Details"), function() {
                frappe.route_options = {
                    "name": frm.doc.name
                };
                frappe.set_route("query-report", "Restaurant Details");
            }, __("View"));

            frm.add_custom_button(__("Restaurant-wise Contract"), function() {
                frappe.route_options = {
                    "hotel_restaurant": frm.doc.name
                };
                frappe.set_route("query-report", "Restaurant-wise Contract");
            }, __("View"));

            frm.add_custom_button(__("Restaurant-wise Tour Package Analytics"), function() {
                frappe.route_options = {
                    "restaurant": frm.doc.name
                };
                frappe.set_route("query-report", "Restaurant-wise Tour Package Analytics");
            }, __("View"));

            frm.add_custom_button(__("Restaurant-wise Tour Registration Analytics"), function() {
                frappe.route_options = {
                    "show_package": 1,
                    "restaurant": frm.doc.name
                };
                frappe.set_route("query-report", "Restaurant-wise Tour Registration Analytics");
            }, __("View"));
        }
    },

    validate: function(frm, cdt, cdn) {
        $.each(frm.doc.meal_package_list || [], function(i, d) {
            if (!d.description) {
                d.description = frm.doc.name +' - '+ d.meal_type;
            }
        });
    }
});


frappe.ui.form.on('Meal Package List', {
    meal_type: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        $.each(frm.doc.meal_package_list, function(i, row) {
            if (row.meal_type === d.meal_type && row.name != d.name) {
               frappe.msgprint('The '+ '<b>' + d.meal_type + '</b>' +' you added already exists on the table.');
               frappe.model.remove_from_locals(cdt, cdn);
               frm.refresh_field('meal_package_list');
               return false;
            }
        });
    }
});