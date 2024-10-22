// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.ui.form.on('Contract', {
    refresh: function(frm) {
        frm.set_query("package_contract_type", function() {
            return {
                "filters": {
                    "name": ["in", ["Hotel", "Restaurant", "Transportation Registration"]]
                    }
                };
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
        frm.set_query("hotel_restaurant", function() {
            return {
                "filters": {
                    "country": frm.doc.country,
                    "state": frm.doc.state,
                    "city": frm.doc.city
                    }
                };
        });

        frm.set_query("vehicle", "vehicle_list", function (doc, cdt, cdn) {
            let row = locals[cdt][cdn];
            return {
                "filters": {
                    "transporter": frm.doc.hotel_restaurant
                }
            };
        });

        if (frm.doc.__islocal || frm.doc.docstatus != 1) {
            frm.add_custom_button(__("Hotel"), function() {
                new frappe.ui.form.MultiSelectDialog({
                    doctype: "Hotel",
                    target: cur_frm,
                    setters: {
                        city: null,
                        state : null,
                        country: null
                    },
                    get_query() {
                        return {
                            filters: { docstatus: ['!=', 2] }
                        };
                    },
                    primary_action_label: 'Hotel',
                    action(selections) {
                        let leng = selections.length;
                        for (let i = 0; i < leng; i++) {
                            let hc = selections[i];
                            frm.set_value('package_contract_type',"Hotel");
                            frm.set_value('hotel_restaurant',hc);
                        }
                        $(".modal").modal("hide");
                    }
                });
            }, __("Get"));

            frm.add_custom_button(__("Restaurant"), function() {
                new frappe.ui.form.MultiSelectDialog({
                    doctype: "Restaurant",
                    target: cur_frm,
                    setters: {
                        city: null,
                        state : null,
                        country: null
                    },
                    get_query() {
                        return {
                            filters: { docstatus: ['!=', 2] }
                        };
                    },
                    primary_action_label: 'Restaurant',
                    action(selections) {
                        let leng = selections.length;
                        for (let i = 0; i < leng; i++) {
                            let rc = selections[i];
                            frm.set_value('package_contract_type',"Restaurant");
                            frm.set_value('hotel_restaurant',rc);
                        }
                        $(".modal").modal("hide");
                    }
                });
            }, __("Get"));

            frm.add_custom_button(__("Transportation"), function() {
                new frappe.ui.form.MultiSelectDialog({
                    doctype: "Transportation Registration",
                    target: cur_frm,
                    setters: {
                        city: null,
                        state : null,
                        country: null
                    },
                    get_query() {
                        return {
                            filters: { docstatus: ['!=', 2] }
                        };
                    },
                    primary_action_label: 'Transportation Registration',
                    action(selections) {
                        let leng = selections.length;
                        for (let i = 0; i < leng; i++) {
                            let trc = selections[i];
                            frm.set_value('package_contract_type',"Transportation Registration");
                            frm.set_value('hotel_restaurant',trc);
                        }
                        $(".modal").modal("hide");
                    }
                });
            }, __("Get"));
        }
        
        if (!frm.doc.__islocal) {
            if (frm.doc.package_contract_type == "Hotel") {
                frm.add_custom_button(__("Hotel-wise Contract"), function() {
                    frappe.route_options = {
                        "name": frm.doc.name
                    };
                    frappe.set_route("query-report", "Hotel-wise Contract");
                }, __("View"));
            } else if (frm.doc.package_contract_type == "Restaurant") {
                frm.add_custom_button(__("Restaurant-wise Contract"), function() {
                    frappe.route_options = {
                        "name": frm.doc.name
                    };
                    frappe.set_route("query-report", "Restaurant-wise Contract");
                }, __("View"));
            } else if (frm.doc.package_contract_type == "Transportation Registration") {
                frm.add_custom_button(__("Transportation-wise Contract"), function() {
                    frappe.route_options = {
                        "name": frm.doc.name
                    };
                    frappe.set_route("query-report", "Transportation-wise Contract");
                }, __("View"));
            }
        }

    },

    validate: function(frm, cdt, cdn) {
        $.each(frm.doc.hotel_room_list || [], function(i, d) {
            if (!d.description) {
                d.description = frm.doc.hotel_restaurant +' - '+ d.hotel_room + ' - '+ d.room_type;
            }
        });

        $.each(frm.doc.meal_package_list || [], function(i, d) {
            if (!d.description) {
                d.description = frm.doc.hotel_restaurant +' - '+ d.meal_type;
            }
        });
    },

    hotel_restaurant: function(frm, cdt, cdn) {
        if (frm.doc.package_contract_type === "Hotel") {
            frm.clear_table("hotel_room_list");
            frappe.call({
                method: "frappe.client.get",
                args: {
                    name: frm.doc.hotel_restaurant,
                    doctype: "Hotel"
                },
                callback(r) {
                    if (r.message) {
                        for (var row in r.message.hotel_room_list) {
                            var child = frm.add_child("hotel_room_list");
                            var rmh = r.message.hotel_room_list[row];
                            frappe.model.set_value(child.doctype, child.name, "hotel_room", rmh.hotel_room);
                            frappe.model.set_value(child.doctype, child.name, "room_type", rmh.room_type);
                            frappe.model.set_value(child.doctype, child.name, "description", rmh.description);
                            frappe.model.set_value(child.doctype, child.name, "total_capacity", rmh.total_capacity);
                            frappe.model.set_value(child.doctype, child.name, "nos_of_rooms", rmh.nos_of_rooms);
                            frappe.model.set_value(child.doctype, child.name, "unit_price", rmh.unit_price);
                            frm.refresh_field("hotel_room_list");
                        }
                    }
                }
            });
        } else if (frm.doc.package_contract_type === "Restaurant") {
            frm.clear_table("meal_package_list");
            frappe.call({
                method: "frappe.client.get",
                args: {
                    name: frm.doc.hotel_restaurant,
                    doctype: "Restaurant"
                },
                callback(r) {
                    if (r.message) {
                        for (var row in r.message.meal_package_list) {
                            var child = frm.add_child("meal_package_list");
                            var rmm = r.message.meal_package_list[row];
                            frappe.model.set_value(child.doctype, child.name, "meal_type", rmm.meal_type);
                            frappe.model.set_value(child.doctype, child.name, "description", rmm.description);
                            frappe.model.set_value(child.doctype, child.name, "qty", rmm.qty);
                            frappe.model.set_value(child.doctype, child.name, "unit_price", rmm.unit_price);
                            frm.refresh_field("meal_package_list");
                        }
                    }
                }
            });
        } else if (frm.doc.package_contract_type === "Transportation Registration") {
            frm.clear_table("vehicle_list");
            frappe.call({
                method: "frappe.client.get",
                args: {
                    name: frm.doc.hotel_restaurant,
                    doctype: "Transportation Registration"
                },
                callback(r) {
                    if (r.message) {
                        for (var row in r.message.vehicle_list) {
                            var child = frm.add_child("vehicle_list");
                            var rmv = r.message.vehicle_list[row];
                            frappe.model.set_value(child.doctype, child.name, "vehicle", rmv.vehicle);
                            frappe.model.set_value(child.doctype, child.name, "make", rmv.make);
                            frappe.model.set_value(child.doctype, child.name, "model", rmv.model);
                            frappe.model.set_value(child.doctype, child.name, "capacity", rmv.capacity);
                            frappe.model.set_value(child.doctype, child.name, "per_day_cost", rmv.per_day_cost);
                            frm.refresh_field("vehicle_list");
                        }
                    }
                }
            });
        }
    },
    onload: function(frm, cdt, cdn) {
        frm.get_field('hotel_room_list').grid.editable_fields = [
            {fieldname: 'hotel_room', columns: 2},
            {fieldname: 'room_type', columns: 2},
            {fieldname: 'total_capacity', columns: 2},
            {fieldname: 'nos_of_rooms', columns: 2},
            {fieldname: 'unit_price', columns: 2}
        ];

        frm.get_field('vehicle_list').grid.editable_fields = [
            {fieldname: 'vehicle', columns: 2},
            {fieldname: 'make', columns: 2},
            {fieldname: 'model', columns: 2},
            {fieldname: 'capacity', columns: 2},
            {fieldname: 'per_day_cost', columns: 2}
        ];
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