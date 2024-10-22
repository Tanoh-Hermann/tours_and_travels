// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.ui.form.on('Hotel Folio', {
    from_date: function(frm) {
        if (frm.doc.from_date > frm.doc.to_date) {
            frappe.throw( '<b>'+ "From Date" + '</b>' +" cannot be greater than " + '<b>' + "To Date" + '</b>')
        } else if (frm.doc.from_date == frm.doc.to_date) {
            frappe.throw( '<b>'+ "From Date" + '</b>' +" cannot be equal to " + '<b>' + "To Date" + '</b>')
        } else {
            var days = frappe.datetime.get_day_diff(frm.doc.to_date, frm.doc.from_date) + 1;
            var nights = frappe.datetime.get_day_diff(frm.doc.to_date, frm.doc.from_date);
            frm.set_value('days_nights', nights + " Nights/" + days + " Days");

            var duration_days = frappe.datetime.get_day_diff(frm.doc.to_date, frm.doc.from_date);
            frm.set_value('duration', duration_days);
        }
    },
    to_date: function(frm) {
        if (frm.doc.from_date > frm.doc.to_date) {
            frappe.throw( '<b>'+ "To Date" + '</b>' +" cannot be less than " + '<b>' + "From Date" + '</b>')
        } else if (frm.doc.from_date == frm.doc.to_date) {
            frappe.throw( '<b>'+ "To Date" + '</b>' +" cannot be equal to " + '<b>' + "From Date" + '</b>')
        } else {
            var days = frappe.datetime.get_day_diff(frm.doc.to_date, frm.doc.from_date) + 1;
            var nights = frappe.datetime.get_day_diff(frm.doc.to_date, frm.doc.from_date);
            frm.set_value('days_nights', nights + " Nights/" + days + " Days");

            var duration_days = frappe.datetime.get_day_diff(frm.doc.to_date, frm.doc.from_date);
            frm.set_value('duration', duration_days);
        }
    },
    room_qty: function(frm) {
        frm.set_value('total', (frm.doc.duration * frm.doc.room_qty * frm.doc.unit_price) + frm.doc.extra_service_charge);
    },
    unit_price: function(frm) {
        frm.trigger('room_qty')
    },
    extra_service_charge: function(frm) {
        frm.trigger('room_qty')
    },
    duration: function(frm) {
        frm.trigger('room_qty')
    },
    hotel_room: function(frm) {
            frappe.call({
                method: "frappe.client.get",
                args: {
                    name: frm.doc.hotel,
                    doctype: "Hotel"
                },
                callback(r) {
                    if (r.message) {
                        for (var row in r.message.hotel_room_list) {
                            var rmh = r.message.hotel_room_list[row];
                            if (rmh.hotel_room == frm.doc.hotel_room) {
                                frm.set_value('unit_price', rmh.unit_price);
                            }
                        }
                    }
                }
            });
    },
    refresh: function(frm) {
        if (frm.doc.__islocal || frm.doc.docstatus != 1) {
            frm.add_custom_button(__("Get Hotel"), function() {
                new frappe.ui.form.MultiSelectDialog({
                    doctype: "Hotel",
                    target: cur_frm,
                    setters: {
                        hotel_name: null
                    },
                    get_query() {
                        return {
                            filters: { docstatus: ['!=', 2] }
                        };
                    },
                    primary_action_label: 'Get Hotel',
                    action(selections) {
                        let leng = selections.length;
                        for (let i = 0; i < leng; i++) {
                            let htl = selections[i];
                            frm.set_value('hotel',htl);
                        }
                        $(".modal").modal("hide");
                    }
                });
            });
        }

        if (frm.doc.docstatus == 1) {
            frm.add_custom_button(__("Sales Invoice"), function() {
                if (!frm.doc.sales_invoice) {
                    frappe.confirm('Are you sure you want to submit the Sales Invoice?',
                        () => {
                        frappe.call({
                            method: "tours_and_travels.hotel.doctype.hotel_folio.hotel_folio.create_submit_invoice",
                            args: {
                                name: frm.doc.name,
                                customer: frm.doc.customer,
                                date: frm.doc.to_date,
                                qty: frm.doc.room_qty,
                                hotel_price: frm.doc.unit_price,
                                hotel_br_des: frm.doc.from_date + ' - ' + frm.doc.to_date + ' | Days/Nights: '+ frm.doc.days_nights + ' | Duration: '+ frm.doc.duration +'<br>Hotel: '+ frm.doc.hotel + '<br>Hotel Room: '+ frm.doc.hotel_room,
                                extra_service: frm.doc.extra_service || "Extra Service",
                                extra_service_charge: frm.doc.extra_service_charge
                                }
                            });
                        }, () => {
                        frappe.call({
                            method: "tours_and_travels.hotel.doctype.hotel_folio.hotel_folio.create_draft_invoice",
                            args: {
                                name: frm.doc.name,
                                customer: frm.doc.customer,
                                date: frm.doc.to_date,
                                qty: frm.doc.room_qty,
                                hotel_price: frm.doc.unit_price,
                                hotel_br_des: frm.doc.from_date + ' - ' + frm.doc.to_date + ' | Days/Nights: '+ frm.doc.days_nights + ' | Duration: '+ frm.doc.duration +'<br>Hotel: '+ frm.doc.hotel + '<br>Hotel Room: '+ frm.doc.hotel_room,
                                extra_service: frm.doc.extra_service || "Extra Service",
                                extra_service_charge: frm.doc.extra_service_charge
                                }
                            });
                        });
                } else {
                    frappe.throw('Sales Invoice: '+ frm.doc.sales_invoice + ' already created.')
                }
            },__('Create'));

            frm.add_custom_button(__("Hotel Folio Details"), function() {
                frappe.route_options = {
                    "name": frm.doc.name
                };
                frappe.set_route("query-report", "Hotel Folio Details");
            }, __("View"));
        }
    }
});