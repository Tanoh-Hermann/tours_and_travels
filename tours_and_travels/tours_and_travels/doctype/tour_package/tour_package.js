// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.ui.form.on('Tour Package', {
    refresh: function(frm) {
        frm.set_query("state", function() {
            return {
                "filters": {
                    "country": frm.doc.country
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

        if (frm.doc.docstatus == 1) {
            frm.add_custom_button('Tour Registration', () => {
                frappe.new_doc('Tour Registration', {
                    tour_package: frm.doc.name
                });
            }, __('Create'));

            frm.add_custom_button(__("Hotel-wise Tour Package Analytics"), function() {
                frappe.route_options = {
                    "name": frm.doc.name,
                    "company": frm.doc.company
                };
                frappe.set_route("query-report", "Hotel-wise Tour Package Analytics");
            }, __("View"));

            frm.add_custom_button(__("Restaurant-wise Tour Package Analytics"), function() {
                frappe.route_options = {
                    "name": frm.doc.name,
                    "company": frm.doc.company
                };
                frappe.set_route("query-report", "Restaurant-wise Tour Package Analytics");
            }, __("View"));

            frm.add_custom_button(__("Transportation-wise Tour Package Analytics"), function() {
                frappe.route_options = {
                    "name": frm.doc.name,
                    "company": frm.doc.company
                };
                frappe.set_route("query-report", "Transportation-wise Tour Package Analytics");
            }, __("View"));

            frm.add_custom_button(__("Attraction-wise Tour Package Analytics"), function() {
                frappe.route_options = {
                    "name": frm.doc.name,
                    "company": frm.doc.company
                };
                frappe.set_route("query-report", "Attraction-wise Tour Package Analytics");
            }, __("View"));

            frm.add_custom_button(__("Guide-wise Tour Package Analytics"), function() {
                frappe.route_options = {
                    "name": frm.doc.name,
                    "company": frm.doc.company
                };
                frappe.set_route("query-report", "Guide-wise Tour Package Analytics");
            }, __("View"));
        }

        if (frm.doc.docstatus != 1 && !frm.doc.__islocal) {
            frm.add_custom_button(__("Hotel Price"), function() {
                $.each(frm.doc.hotel_package_list,  function(i,  d) {
                    frm.refresh_field('hotel_package_list');
                    frm.dirty();
                    frm.save();
                });
                frappe.show_alert({
                    message:__('The Standard Unit Price is Updated.'),
                    indicator:'green'
                });
                frappe.confirm("Are you sure you want to" + '<c style="color:red;">' + " Update/Reset " + '</c>' +'<b>'+"Hotel Price?"+'</b>',
                    () => {
                        $.each(frm.doc.hotel_package_list,  function(i,  d) {
                            d.unit_price = d.standard_unit_price;
                            d.total = d.duration * d.unit_price * d.room_qty;
                            frm.refresh_field('hotel_package_list');
                            frm.dirty();
                        });
                        frm.save();
                    }, () => {
                        frm.reload_doc();
                    });
            }, __("Update / Reset"));

            frm.add_custom_button(__("Restaurant Price"), function() {
                $.each(frm.doc.restaurant_package_list,  function(i,  d) {
                    frm.refresh_field('restaurant_package_list');
                    frm.dirty();
                    frm.save();
                });
                frappe.show_alert({
                    message:__('The Standard Unit Price is Updated.'),
                    indicator:'green'
                });
                frappe.confirm("Are you sure you want to" + '<c style="color:red;">' + " Update/Reset " + '</c>' +'<b>'+"Restaurant Price?"+'</b>',
                    () => {
                        $.each(frm.doc.restaurant_package_list,  function(i,  d) {
                            d.unit_price = d.standard_unit_price;
                            d.total = d.unit_price * d.qty;
                            frm.refresh_field('restaurant_package_list');
                            frm.dirty();
                        });
                        frm.save();
                    }, () => {
                        frm.reload_doc();
                    });
            }, __("Update / Reset"));

            frm.add_custom_button(__("Transportation Price"), function() {
                $.each(frm.doc.transportation_package_list,  function(i,  d) {
                    frm.refresh_field('transportation_package_list');
                    frm.dirty();
                    frm.save();
                });
                frappe.show_alert({
                    message:__('The Standard Unit Price is Updated.'),
                    indicator:'green'
                });
                frappe.confirm("Are you sure you want to" + '<c style="color:red;">' + " Update/Reset " + '</c>' +'<b>'+"Transportation Price?"+'</b>',
                    () => {
                        $.each(frm.doc.transportation_package_list,  function(i,  d) {
                            d.unit_price = d.standard_unit_price;
                            d.total = d.unit_price * d.qty;
                            frm.refresh_field('transportation_package_list');
                            frm.dirty();
                        });
                    frm.save();
                    }, () => {
                    frm.reload_doc();
                    });
            }, __("Update / Reset"));

            frm.add_custom_button(__("Attraction Price"), function() {
                $.each(frm.doc.attraction_package_list,  function(i,  d) {
                    frm.refresh_field('attraction_package_list');
                    frm.dirty();
                    frm.save();
                });
                frappe.show_alert({
                    message:__('The Standard Unit Price is Updated.'),
                    indicator:'green'
                });
                frappe.confirm("Are you sure you want to" + '<c style="color:red;">' + " Update/Reset " + '</c>' +'<b>'+"Attraction Price?"+'</b>',
                    () => {
                        $.each(frm.doc.attraction_package_list,  function(i,  d) {
                            d.unit_price = d.standard_unit_price;
                            d.total = d.unit_price * d.qty;
                            frm.refresh_field('attraction_package_list');
                            frm.dirty();
                        });
                        frm.save();
                    }, () => {
                        frm.reload_doc();
                    });
            }, __("Update / Reset"));

            frm.add_custom_button(__("Guide Price"), function() {
                $.each(frm.doc.guide_package_list,  function(i,  d) {
                    frm.refresh_field('guide_package_list');
                    frm.dirty();
                    frm.save();
                });
                frappe.show_alert({
                    message:__('The Standard Price is Updated.'),
                    indicator:'green'
                });
                frappe.confirm("Are you sure you want to" + '<c style="color:red;">' + " Update/Reset " + '</c>' +'<b>'+"Guide Price?"+'</b>',
                    () => {
                        $.each(frm.doc.guide_package_list,  function(i,  d) {
                            d.price = d.standard_price;
                            frm.refresh_field('guide_package_list');
                            frm.dirty();
                        });
                        frm.save();
                    }, () => {
                        frm.reload_doc();
                    });
            }, __("Update / Reset"));

        }
    },

    arrival_date: function(frm) {
        if (frm.doc.arrival_date > frm.doc.departure_date) {
            frappe.throw( '<b>'+ "Arrival Date" + '</b>' +" cannot be greater than " + '<b>' + "Departure Date" + '</b>')
        } else {
            var days = frappe.datetime.get_day_diff(frm.doc.departure_date, frm.doc.arrival_date) + 1;
            var nights = frappe.datetime.get_day_diff(frm.doc.departure_date, frm.doc.arrival_date);
            frm.set_value('package_days_nights', '<h2 class = "daynight" style = "color:green;">' + nights + " Nights / " + days + " Days" + '</h2>');
        }
    },
    departure_date: function(frm) {
        if (frm.doc.arrival_date > frm.doc.departure_date) {
            frappe.throw( '<b>'+ "Departure Date" + '</b>' +" cannot be less than " + '<b>' + "Arrival Date" + '</b>')
        } else {
            var days = frappe.datetime.get_day_diff(frm.doc.departure_date, frm.doc.arrival_date) + 1;
            var nights = frappe.datetime.get_day_diff(frm.doc.departure_date, frm.doc.arrival_date);
            frm.set_value('package_days_nights', '<h2 class = "daynight" style = "color:green;">' + nights + " Nights / " + days + " Days" + '</h2>');
        }
    },

    generate_itinerary_plan: function(frm) {
        if (!frm.doc.__islocal && frm.doc.docstatus < 1) {
            frappe.msgprint({
                title: __('Message'),
                indicator: 'yellow',
                message: __('Please Wait ... ')
            });
            frappe.call({
                    method: "tours_and_travels.tours_and_travels.doctype.tour_package.tour_package.generate_itinerary",
                    args: {
                        tp_name: frm.doc.name,
                        arrival_date: frm.doc.arrival_date,
                        departure_date: frm.doc.departure_date
                    },
                    callback(r) {
                        frappe.msgprint({
                            title: __('Success'),
                            indicator: 'green',
                            message: __('The Itinerary Plan is generated successfully.')
                        });
                        frm.reload_doc();
                    }
                });
        } else if (frm.doc.__islocal) {
            frappe.throw('Please, first save the doctype, and after then Generate Itinerary Plan.')
        }
    },

    validate: function(frm, cdt, cdn) {
        $.each(frm.doc.transportation_package_list || [], function(i, d) {
            if (!d.description) {
                d.description = 'Journey: '+d.source_location+ ' -> '+d.destination+' | Journey Date: '+d.journey_date+' | Vehicle: '+d.vehicle;
            }
        });
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
    // hotel: function(frm, cdt, cdn) {
    //     var d = locals[cdt][cdn];
    //     frappe.model.set_value(cdt,cdn, 'hotel_room', undefined)
    // },

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
            frappe.throw( '<b>'+ "From Date" + '</b>' +" cannot be less than " + '<b>' + "Arrival Date" + '</b>')
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
            frappe.throw( '<b>'+ "To Date" + '</b>' +" cannot be greater than " + '<b>' + "Departure Date" + '</b>')
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
    // restaurant: function(frm, cdt, cdn) {
    //     var d = locals[cdt][cdn];
    //     frappe.model.set_value(cdt,cdn, 'meal_type', undefined)
    // },

    restaurant_package_list_add: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        frappe.model.set_value(cdt, cdn, 'date', frm.doc.arrival_date);
    },

    date: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        if (d.date < frm.doc.arrival_date || d.date > frm.doc.departure_date) {
            frappe.throw( '<b>'+ "Date" + '</b>' +" must be between " + '<b>' + "Arrival Date" + '</b>' + " and to " + '<b>' + "Departure Date" + '</b>')
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
            frappe.throw( '<b>'+ "Journey Date" + '</b>' +" must be between " + '<b>' + "Arrival Date" + '</b>' + " and to " + '<b>' + "Departure Date" + '</b>')
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
            frappe.throw( '<b>'+ "Date" + '</b>' +" must be between " + '<b>' + "Arrival Date" + '</b>' + " and to " + '<b>' + "Departure Date" + '</b>')
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
    },
    // attraction: function(frm, cdt, cdn) {
    //     var d = locals[cdt][cdn];
    //     frappe.model.set_value(cdt,cdn, 'attraction_service', undefined)
    // }
});


frappe.ui.form.on("Guide Package List", {
    guide_package_list_add: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        frappe.model.set_value(cdt, cdn, 'date', frm.doc.arrival_date);
    },
    date: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        if (d.date < frm.doc.arrival_date || d.date > frm.doc.departure_date) {
            frappe.throw( '<b>'+ "Date" + '</b>' +" must be between " + '<b>' + "Arrival Date" + '</b>' + " and to " + '<b>' + "Departure Date" + '</b>')
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
    },
    // guide: function(frm, cdt, cdn) {
    //     var d = locals[cdt][cdn];
    //     frappe.model.set_value(cdt,cdn, 'guide_service', undefined)
    // }
});