// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.ui.form.on('Tour Registration', {
    tour_package: function(frm, cdt, cdn) {
        frm.clear_table("hotel_package_list");
        frappe.call({
            method: "frappe.client.get",
            args: {
                name: frm.doc.tour_package,
                doctype: "Tour Package"
            },
            callback(r) {
                if (r.message) {
                    for (var row in r.message.hotel_package_list) {
                        var child = frm.add_child("hotel_package_list");
                        var rmh = r.message.hotel_package_list[row];
                        frappe.model.set_value(child.doctype, child.name, "from_date", rmh.from_date);
                        frappe.model.set_value(child.doctype, child.name, "to_date", rmh.to_date);
                        frappe.model.set_value(child.doctype, child.name, "city", rmh.city);
                        frappe.model.set_value(child.doctype, child.name, "state", rmh.state);
                        frappe.model.set_value(child.doctype, child.name, "nos_of_rooms", rmh.nos_of_rooms);
                        frappe.model.set_value(child.doctype, child.name, "country", rmh.country);
                        frappe.model.set_value(child.doctype, child.name, "hotel", rmh.hotel);
                        frappe.model.set_value(child.doctype, child.name, "hotel_room", rmh.hotel_room);
                        frappe.model.set_value(child.doctype, child.name, "room_type", rmh.room_type);
                        frappe.model.set_value(child.doctype, child.name, "description", rmh.description);
                        frappe.model.set_value(child.doctype, child.name, "duration", rmh.duration);
                        frappe.model.set_value(child.doctype, child.name, "room_qty", rmh.room_qty);
                        frappe.model.set_value(child.doctype, child.name, "standard_unit_price", rmh.standard_unit_price);
                        frappe.model.set_value(child.doctype, child.name, "unit_price", rmh.unit_price);
                        frappe.model.set_value(child.doctype, child.name, "total", rmh.total);
                        frm.refresh_field("hotel_package_list");
                    }
                }
            }
        });

        frm.clear_table("restaurant_package_list");
        frappe.call({
            method: "frappe.client.get",
            args: {
                name: frm.doc.tour_package,
                doctype: "Tour Package"
            },
            callback(r) {
                if (r.message) {
                    for (var row in r.message.restaurant_package_list) {
                        var child = frm.add_child("restaurant_package_list");
                        var rmm = r.message.restaurant_package_list[row];
                        frappe.model.set_value(child.doctype, child.name, "date", rmm.date);
                        frappe.model.set_value(child.doctype, child.name, "city", rmm.city);
                        frappe.model.set_value(child.doctype, child.name, "state", rmm.state);
                        frappe.model.set_value(child.doctype, child.name, "country", rmm.country);
                        frappe.model.set_value(child.doctype, child.name, "restaurant", rmm.restaurant);
                        frappe.model.set_value(child.doctype, child.name, "meal_type", rmm.meal_type);
                        frappe.model.set_value(child.doctype, child.name, "description", rmm.description);
                        frappe.model.set_value(child.doctype, child.name, "qty", rmm.qty);
                        frappe.model.set_value(child.doctype, child.name, "standard_unit_price", rmm.standard_unit_price);
                        frappe.model.set_value(child.doctype, child.name, "unit_price", rmm.unit_price);
                        frappe.model.set_value(child.doctype, child.name, "total", rmm.total);
                        frm.refresh_field("restaurant_package_list");
                    }
                }
            }
        });

        frm.clear_table("transportation_package_list");
        frappe.call({
            method: "frappe.client.get",
            args: {
                name: frm.doc.tour_package,
                doctype: "Tour Package"
            },
            callback(r) {
                if (r.message) {
                    for (var row in r.message.transportation_package_list) {
                        var child = frm.add_child("transportation_package_list");
                        var rmt = r.message.transportation_package_list[row];
                        frappe.model.set_value(child.doctype, child.name, "journey_date", rmt.journey_date);
                        frappe.model.set_value(child.doctype, child.name, "source_location", rmt.source_location);
                        frappe.model.set_value(child.doctype, child.name, "destination", rmt.destination);
                        frappe.model.set_value(child.doctype, child.name, "transportation", rmt.transportation);
                        frappe.model.set_value(child.doctype, child.name, "vehicle", rmt.vehicle);
                        frappe.model.set_value(child.doctype, child.name, "description", rmt.description);
                        frappe.model.set_value(child.doctype, child.name, "qty", rmt.qty);
                        frappe.model.set_value(child.doctype, child.name, "standard_unit_price", rmt.standard_unit_price);
                        frappe.model.set_value(child.doctype, child.name, "unit_price", rmt.unit_price);
                        frappe.model.set_value(child.doctype, child.name, "total", rmt.total);
                        frm.refresh_field("transportation_package_list");
                    }
                }
            }
        });

        frm.clear_table("attraction_package_list");
        frappe.call({
            method: "frappe.client.get",
            args: {
                name: frm.doc.tour_package,
                doctype: "Tour Package"
            },
            callback(r) {
                if (r.message) {
                    for (var row in r.message.attraction_package_list) {
                        var child = frm.add_child("attraction_package_list");
                        var rma = r.message.attraction_package_list[row];
                        frappe.model.set_value(child.doctype, child.name, "date", rma.date);
                        frappe.model.set_value(child.doctype, child.name, "city", rma.city);
                        frappe.model.set_value(child.doctype, child.name, "state", rma.state);
                        frappe.model.set_value(child.doctype, child.name, "country", rma.country);
                        frappe.model.set_value(child.doctype, child.name, "attraction", rma.attraction);
                        frappe.model.set_value(child.doctype, child.name, "attraction_service", rma.attraction_service);
                        frappe.model.set_value(child.doctype, child.name, "contact", rma.contact);
                        frappe.model.set_value(child.doctype, child.name, "description", rma.description);
                        frappe.model.set_value(child.doctype, child.name, "qty", rma.qty);
                        frappe.model.set_value(child.doctype, child.name, "standard_unit_price", rma.standard_unit_price);
                        frappe.model.set_value(child.doctype, child.name, "unit_price", rma.unit_price);
                        frappe.model.set_value(child.doctype, child.name, "total", rma.total);
                        frm.refresh_field("attraction_package_list");
                    }
                }
            }
        });

        frm.clear_table("guide_package_list");
        frappe.call({
            method: "frappe.client.get",
            args: {
                name: frm.doc.tour_package,
                doctype: "Tour Package"
            },
            callback(r) {
                if (r.message) {
                    for (var row in r.message.guide_package_list) {
                        var child = frm.add_child("guide_package_list");
                        var rmg = r.message.guide_package_list[row];
                        frappe.model.set_value(child.doctype, child.name, "date", rmg.date);
                        frappe.model.set_value(child.doctype, child.name, "city", rmg.city);
                        frappe.model.set_value(child.doctype, child.name, "state", rmg.state);
                        frappe.model.set_value(child.doctype, child.name, "country", rmg.country);
                        frappe.model.set_value(child.doctype, child.name, "guide", rmg.guide);
                        frappe.model.set_value(child.doctype, child.name, "guide_service", rmg.guide_service);
                        frappe.model.set_value(child.doctype, child.name, "contact", rmg.contact);
                        frappe.model.set_value(child.doctype, child.name, "description", rmg.description);
                        frappe.model.set_value(child.doctype, child.name, "standard_price", rmg.standard_price);
                        frappe.model.set_value(child.doctype, child.name, "price", rmg.price);
                        frm.refresh_field("guide_package_list");
                    }
                }
            }
        });

    },

    refresh: function(frm) {
        frm.set_query("tour_package", function() {
            return {
                "filters": {
                    "docstatus": 1
                    }
                };
        });

        frm.set_query("city", "hotel_package_list", function (doc, cdt, cdn) {
            let row = locals[cdt][cdn];
            return {
                "filters": {
                    "state": frm.doc.state,
                    "country": frm.doc.country
                }
            };
        });
        frm.set_query("hotel", "hotel_package_list", function (doc, cdt, cdn) {
            let row = locals[cdt][cdn];
            return {
                "filters": {
                    "city": row.city,
                    "state": frm.doc.state,
                    "country": frm.doc.country
                }
            };
        });

        frm.set_query("city", "restaurant_package_list", function (doc, cdt, cdn) {
            let row = locals[cdt][cdn];
            return {
                "filters": {
                    "state": frm.doc.state,
                    "country": frm.doc.country
                }
            };
        });
        frm.set_query("restaurant", "restaurant_package_list", function (doc, cdt, cdn) {
            let row = locals[cdt][cdn];
            return {
                "filters": {
                    "city": row.city,
                    "state": frm.doc.state,
                    "country": frm.doc.country
                }
            };
        });

        frm.set_query("source_location", "transportation_package_list", function (doc, cdt, cdn) {
            let row = locals[cdt][cdn];
            return {
                "filters": {
                    "state": frm.doc.state,
                    "country": frm.doc.country
                }
            };
        });
        frm.set_query("destination", "transportation_package_list", function (doc, cdt, cdn) {
            let row = locals[cdt][cdn];
            return {
                "filters": {
                    "state": frm.doc.state,
                    "country": frm.doc.country
                }
            };
        });
        frm.set_query("transportation", "transportation_package_list", function (doc, cdt, cdn) {
            let row = locals[cdt][cdn];
            return {
                "filters": {
                    "state": frm.doc.state,
                    "country": frm.doc.country
                }
            };
        });
        frm.set_query("vehicle", "transportation_package_list", function (doc, cdt, cdn) {
            let row = locals[cdt][cdn];
            return {
                "filters": {
                    "transporter": row.transportation
                }
            };
        });

        frm.set_query("city", "attraction_package_list", function (doc, cdt, cdn) {
            let row = locals[cdt][cdn];
            return {
                "filters": {
                    "state": frm.doc.state,
                    "country": frm.doc.country
                }
            };
        });
        frm.set_query("attraction", "attraction_package_list", function (doc, cdt, cdn) {
            let row = locals[cdt][cdn];
            return {
                "filters": {
                    "city": row.city,
                    "state": frm.doc.state,
                    "country": frm.doc.country
                }
            };
        });

        frm.set_query("city", "guide_package_list", function (doc, cdt, cdn) {
            let row = locals[cdt][cdn];
            return {
                "filters": {
                    "state": frm.doc.state,
                    "country": frm.doc.country
                }
            };
        });
        frm.set_query("guide", "guide_package_list", function (doc, cdt, cdn) {
            let row = locals[cdt][cdn];
            return {
                "filters": {
                    "city": row.city,
                    "state": frm.doc.state,
                    "country": frm.doc.country
                }
            };
        });

        if (frm.doc.__islocal || frm.doc.docstatus != 1) {
            frm.add_custom_button(__("Get Tour Package"), function() {
                if (!frm.doc.tour_package) {
                    new frappe.ui.form.MultiSelectDialog({
                        doctype: "Tour Package",
                        target: cur_frm,
                        setters: {
                            package_category: null,
                            package_type : null
                        },
                        get_query() {
                            return {
                                filters: { docstatus: ['=', 1] }
                            };
                        },
                        primary_action_label: 'Get Tour Package',
                        action(selections) {
                            let leng = selections.length;
                            for (let i = 0; i < leng; i++) {
                                let tp = selections[i];
                                frm.set_value('tour_package',tp);
                            }
                            $(".modal").modal("hide");
                        }
                    });
                } else {
                    frappe.throw("Tour Package " + frm.doc.tour_package + " already exists.");
                }
            });
        }

        if (frm.doc.docstatus == 1) {
            frm.add_custom_button(__("Quotation"), function() {
                frappe.call({
                    method: "tours_and_travels.tours_and_travels.doctype.tour_registration.tour_registration.create_quot",
                    args: {
                        customer: frm.doc.customer,
                        name: frm.doc.name,
                        date: frm.doc.date,
                        hotel_ttl_amt: frm.doc.hotel_total_amount,
                        hotel_br_des: frm.doc.hotel_brief_description,
                        rest_ttl_amt: frm.doc.restaurant_total_amount,
                        rest_br_des: frm.doc.restaurant_brief_description,
                        trans_ttl_amt: frm.doc.transportation_total_amount,
                        trans_br_des: frm.doc.transportation_brief_description,
                        att_ttl_amt: frm.doc.attraction_total_amount,
                        att_br_des: frm.doc.attraction_brief_description,
                        gd_ttl_amt: frm.doc.guide_total_amount,
                        gd_br_des: frm.doc.guide_brief_description
                        }
                    });
            },__('Create'));

            frm.add_custom_button(__("Tour Registration Analytics"), function() {
                frappe.route_options = {
                    "name": frm.doc.name,
                    "company": frm.doc.company
                };
                frappe.set_route("query-report", "Tour Registration Analytics");
            }, __("View"));

            frm.add_custom_button(__("Hotel-wise Tour Registration Analytics"), function() {
                frappe.route_options = {
                    "name": frm.doc.name,
                    "company": frm.doc.company
                };
                frappe.set_route("query-report", "Hotel-wise Tour Registration Analytics");
            }, __("View"));

            frm.add_custom_button(__("Restaurant-wise Tour Registration Analytics"), function() {
                frappe.route_options = {
                    "name": frm.doc.name,
                    "company": frm.doc.company
                };
                frappe.set_route("query-report", "Restaurant-wise Tour Registration Analytics");
            }, __("View"));

            frm.add_custom_button(__("Transportation-wise Tour Registration Analytics"), function() {
                frappe.route_options = {
                    "name": frm.doc.name,
                    "company": frm.doc.company
                };
                frappe.set_route("query-report", "Transportation-wise Tour Registration Analytics");
            }, __("View"));

            frm.add_custom_button(__("Attraction-wise Tour Registration Analytics"), function() {
                frappe.route_options = {
                    "name": frm.doc.name,
                    "company": frm.doc.company
                };
                frappe.set_route("query-report", "Attraction-wise Tour Registration Analytics");
            }, __("View"));

            frm.add_custom_button(__("Guide-wise Tour Registration Analytics"), function() {
                frappe.route_options = {
                    "name": frm.doc.name,
                    "company": frm.doc.company
                };
                frappe.set_route("query-report", "Guide-wise Tour Registration Analytics");
            }, __("View"));
        }
    },

    validate: function(frm) {
        var htl_ttl_amt = 0;
        $.each(frm.doc.hotel_package_list,  function(i,  d) {
            htl_ttl_amt += flt(d.total);
        });
        frm.doc.hotel_total_amount = htl_ttl_amt;

        var htl_ttl_qty = 0;
        $.each(frm.doc.hotel_package_list,  function(i,  d) {
            htl_ttl_qty += flt(d.room_qty);
        });
        frm.doc.hotel_total_qty = htl_ttl_qty;

        var rest_ttl_amt = 0;
        $.each(frm.doc.restaurant_package_list,  function(i,  d) {
            rest_ttl_amt += flt(d.total);
        });
        frm.doc.restaurant_total_amount = rest_ttl_amt;

        var rest_ttl_qty = 0;
        $.each(frm.doc.restaurant_package_list,  function(i,  d) {
            rest_ttl_qty += flt(d.qty);
        });
        frm.doc.restaurant_total_qty = rest_ttl_qty;

        var trans_ttl_amt = 0;
        $.each(frm.doc.transportation_package_list,  function(i,  d) {
            trans_ttl_amt += flt(d.total);
        });
        frm.doc.transportation_total_amount = trans_ttl_amt;

        var trans_ttl_qty = 0;
        $.each(frm.doc.transportation_package_list,  function(i,  d) {
            trans_ttl_qty += flt(d.qty);
        });
        frm.doc.transportation_total_qty = trans_ttl_qty;

        var att_ttl_amt = 0;
        $.each(frm.doc.attraction_package_list,  function(i,  d) {
            att_ttl_amt += flt(d.total);
        });
        frm.doc.attraction_total_amount = att_ttl_amt;

        var att_ttl_qty = 0;
        $.each(frm.doc.attraction_package_list,  function(i,  d) {
            att_ttl_qty += flt(d.qty);
        });
        frm.doc.attraction_total_qty = att_ttl_qty;

        var gd_ttl_amt = 0;
        $.each(frm.doc.guide_package_list,  function(i,  d) {
            gd_ttl_amt += flt(d.price);
        });
        frm.doc.guide_total_amount = gd_ttl_amt;
    }
});


frappe.ui.form.on("Hotel Package List", {
    hotel_room: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
            frappe.call({
                method: "frappe.client.get",
                args: {
                    name: d.hotel,
                    doctype: "Hotel"
                },
                callback(r) {
                    if (r.message) {
                        for (var row in r.message.hotel_room_list) {
                            var rmh = r.message.hotel_room_list[row];
                            if (rmh.hotel_room == d.hotel_room) {
                                frappe.model.set_value(cdt, cdn, 'description', rmh.description);
                                frappe.model.set_value(cdt, cdn, 'standard_unit_price', rmh.unit_price);
                                frappe.model.set_value(cdt, cdn, 'unit_price', rmh.unit_price);
                                frappe.model.set_value(cdt, cdn, 'total', rmh.unit_price * d.room_qty);
                            }
                            frm.refresh_field("hotel_package_list");
                        }
                    }
                }
            });

            $.each(frm.doc.hotel_package_list, function(i, row) {
                if (row.hotel_room === d.hotel_room && row.name != d.name && row.hotel === d.hotel && row.from_date === d.from_date && row.to_date === d.to_date) {
                    frappe.msgprint('The '+ '<b>' + d.hotel + ' with ' +d.hotel_room + '</b>' +' you added already exists on the date scheduled in the table.');
                    frappe.model.remove_from_locals(cdt, cdn);
                    frm.refresh_field('hotel_package_list');
                    return false;
                }
            });
    },

    hotel_package_list_add: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        frappe.model.set_value(cdt, cdn, 'from_date', frm.doc.arrival_date);
        frappe.model.set_value(cdt, cdn, 'to_date', frm.doc.departure_date);

        var days = frappe.datetime.get_day_diff(d.to_date, d.from_date);
        frappe.model.set_value(cdt, cdn, 'duration', days);
    },

    from_date: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        if (d.from_date < frm.doc.arrival_date) {
            frappe.throw( '<b>'+ "From Date" + '</b>' +" cannot be less than " + '<b>' + "Arrival Date" + '</b>');
        } else {
            var days = frappe.datetime.get_day_diff(d.to_date, d.from_date);
            frappe.model.set_value(cdt, cdn, 'duration', days);
        }
        $.each(frm.doc.hotel_package_list, function(i, row) {
            if (row.hotel_room === d.hotel_room && row.name != d.name && row.hotel === d.hotel && row.from_date === d.from_date && row.to_date === d.to_date) {
                frappe.msgprint('The '+ '<b>' + d.hotel_room + '</b>' +' you added already exists on the table.');
                frappe.model.remove_from_locals(cdt, cdn);
                frm.refresh_field('hotel_package_list');
                return false;
            }
        });
    },
    to_date: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        if (d.to_date > frm.doc.departure_date) {
            frappe.throw( '<b>'+ "To Date" + '</b>' +" cannot be greater than " + '<b>' + "Departure Date" + '</b>');
        } else {
            var days = frappe.datetime.get_day_diff(d.to_date, d.from_date);
            frappe.model.set_value(cdt, cdn, 'duration', days);
        }
        $.each(frm.doc.hotel_package_list, function(i, row) {
            if (row.hotel_room === d.hotel_room && row.name != d.name && row.hotel === d.hotel && row.from_date === d.from_date && row.to_date === d.to_date) {
                frappe.msgprint('The '+ '<b>' + d.hotel_room + '</b>' +' you added already exists on the table.');
                frappe.model.remove_from_locals(cdt, cdn);
                frm.refresh_field('hotel_package_list');
                return false;
            }
        });
    },

    room_qty: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        frappe.model.set_value(cdt, cdn, 'total', d.duration * d.unit_price * d.room_qty);
    },
    unit_price: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        frappe.model.set_value(cdt, cdn, 'total', d.duration * d.unit_price * d.room_qty);
    },
    duration: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        frappe.model.set_value(cdt, cdn, 'total', d.duration * d.unit_price * d.room_qty);
    }
});


frappe.ui.form.on("Restaurant Package List", {
    meal_type: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
            frappe.call({
                method: "frappe.client.get",
                args: {
                    name: d.restaurant,
                    doctype: "Restaurant"
                },
                callback(r) {
                    if (r.message) {
                        for (var row in r.message.meal_package_list) {
                            var rmr = r.message.meal_package_list[row];
                            if (rmr.meal_type == d.meal_type) {
                                frappe.model.set_value(cdt, cdn, 'description', rmr.description);
                                frappe.model.set_value(cdt, cdn, 'standard_unit_price', rmr.unit_price);
                                frappe.model.set_value(cdt, cdn, 'unit_price', rmr.unit_price);
                                frappe.model.set_value(cdt, cdn, 'total', rmr.unit_price * d.qty);
                            }
                            frm.refresh_field("restaurant_package_list");
                        }
                    }
                }
            });

            $.each(frm.doc.restaurant_package_list, function(i, row) {
                if (row.meal_type === d.meal_type && row.name != d.name && row.restaurant === d.restaurant && row.date === d.date) {
                    frappe.msgprint('The '+ '<b>' + d.restaurant + ' with ' + d.meal_type + '</b>' +' you added already exists on the date scheduled in the table.');
                    frappe.model.remove_from_locals(cdt, cdn);
                    frm.refresh_field('restaurant_package_list');
                    return false;
                }
            });
    },

    restaurant_package_list_add: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        frappe.model.set_value(cdt, cdn, 'date', frm.doc.arrival_date);
    },

    date: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        if (d.date < frm.doc.arrival_date || d.date > frm.doc.departure_date) {
            frappe.throw( '<b>'+ "Date" + '</b>' +" must be between " + '<b>' + "Arrival Date" + '</b>' + " and to " + '<b>' + "Departure Date" + '</b>');
        }
        $.each(frm.doc.restaurant_package_list, function(i, row) {
            if (row.meal_type === d.meal_type && row.name != d.name && row.restaurant === d.restaurant && row.date === d.date) {
                frappe.msgprint('The '+ '<b>' + d.restaurant + ' with ' + d.meal_type + '</b>' +' you added already exists on the date scheduled in the table.');
                frappe.model.remove_from_locals(cdt, cdn);
                frm.refresh_field('restaurant_package_list');
                return false;
            }
        });
    },

    qty: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        frappe.model.set_value(cdt, cdn, 'total', d.unit_price * d.qty);
    },
    unit_price: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        frappe.model.set_value(cdt, cdn, 'total', d.unit_price * d.qty);
    }
});

frappe.ui.form.on("Transportation Package List", {
    transportation_package_list_add: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        frappe.model.set_value(cdt, cdn, 'journey_date', frm.doc.arrival_date);
    },
    journey_date: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        if (d.journey_date < frm.doc.arrival_date || d.journey_date > frm.doc.departure_date) {
            frappe.throw( '<b>'+ "Journey Date" + '</b>' +" must be between " + '<b>' + "Arrival Date" + '</b>' + " and to " + '<b>' + "Departure Date" + '</b>');
        }
    },
    qty: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        frappe.model.set_value(cdt, cdn, 'total', d.unit_price * d.qty);
    },
    unit_price: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        frappe.model.set_value(cdt, cdn, 'total', d.unit_price * d.qty);
    }
});


frappe.ui.form.on("Attraction Package List", {
    attraction_package_list_add: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        frappe.model.set_value(cdt, cdn, 'date', frm.doc.arrival_date);
    },
    date: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        if (d.date < frm.doc.arrival_date || d.date > frm.doc.departure_date) {
            frappe.throw( '<b>'+ "Date" + '</b>' +" must be between " + '<b>' + "Arrival Date" + '</b>' + " and to " + '<b>' + "Departure Date" + '</b>');
        }

        $.each(frm.doc.attraction_package_list, function(i, row) {
            if (row.date === d.date && row.name != d.name && row.attraction === d.attraction && row.attraction_service === d.attraction_service) {
                frappe.msgprint('The '+ '<b>' + d.attraction + ' with ' + d.attraction_service + '</b>' +' you added already exists on the date scheduled in the table.');
                frappe.model.remove_from_locals(cdt, cdn);
                frm.refresh_field('attraction_package_list');
                return false;
            }
        });
    },
    qty: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        frappe.model.set_value(cdt, cdn, 'total', d.unit_price * d.qty);
    },
    unit_price: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        frappe.model.set_value(cdt, cdn, 'total', d.unit_price * d.qty);
    },

    attraction_service: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
            frappe.call({
                method: "frappe.client.get",
                args: {
                    name: d.attraction,
                    doctype: "Attraction"
                },
                callback(r) {
                    if (r.message) {
                        for (var row in r.message.attraction_service_list) {
                            var rmr = r.message.attraction_service_list[row];
                            if (rmr.attraction_service == d.attraction_service) {
                                frappe.model.set_value(cdt, cdn, 'attraction_service', rmr.attraction_service);
                                frappe.model.set_value(cdt, cdn, 'standard_unit_price', rmr.unit_price);
                                frappe.model.set_value(cdt, cdn, 'unit_price', rmr.unit_price);
                                frappe.model.set_value(cdt, cdn, 'total', rmr.unit_price * d.qty);
                            }
                            frm.refresh_field("attraction_package_list");
                        }
                    }
                }
            });

            $.each(frm.doc.attraction_package_list, function(i, row) {
                if (row.date === d.date && row.name != d.name && row.attraction === d.attraction && row.attraction_service === d.attraction_service) {
                    frappe.msgprint('The '+ '<b>' + d.attraction + ' with ' + d.attraction_service + '</b>' +' you added already exists on the date scheduled in the table.');
                    frappe.model.remove_from_locals(cdt, cdn);
                    frm.refresh_field('attraction_package_list');
                    return false;
                }
            });
    }
});


frappe.ui.form.on("Guide Package List", {
    guide_package_list_add: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        frappe.model.set_value(cdt, cdn, 'date', frm.doc.arrival_date);
    },
    date: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        if (d.date < frm.doc.arrival_date || d.date > frm.doc.departure_date) {
            frappe.throw( '<b>'+ "Date" + '</b>' +" must be between " + '<b>' + "Arrival Date" + '</b>' + " and to " + '<b>' + "Departure Date" + '</b>');
        }

        $.each(frm.doc.guide_package_list, function(i, row) {
            if (row.date === d.date && row.name != d.name && row.guide === d.guide && row.guide_service === d.guide_service) {
                frappe.msgprint('The '+ '<b>' + d.guide + ' with ' + d.guide_service + '</b>' +' you added already exists on the date scheduled in the table.');
                frappe.model.remove_from_locals(cdt, cdn);
                frm.refresh_field('guide_package_list');
                return false;
            }
        });
    },

    guide_service: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
            frappe.call({
                method: "frappe.client.get",
                args: {
                    name: d.guide,
                    doctype: "Guide"
                },
                callback(r) {
                    if (r.message) {
                        for (var row in r.message.guide_service_list) {
                            var rmr = r.message.guide_service_list[row];
                            if (rmr.guide_service == d.guide_service) {
                                frappe.model.set_value(cdt, cdn, 'guide_service', rmr.guide_service);
                                frappe.model.set_value(cdt, cdn, 'standard_price', rmr.price);
                                frappe.model.set_value(cdt, cdn, 'price', rmr.price);
                            }
                            frm.refresh_field("guide_package_list");
                        }
                    }
                }
            });

            $.each(frm.doc.guide_package_list, function(i, row) {
                if (row.date === d.date && row.name != d.name && row.guide === d.guide && row.guide_service === d.guide_service) {
                    frappe.msgprint('The '+ '<b>' + d.guide + ' with ' + d.guide_service + '</b>' +' you added already exists on the date scheduled in the table.');
                    frappe.model.remove_from_locals(cdt, cdn);
                    frm.refresh_field('guide_package_list');
                    return false;
                }
            });
    }
});