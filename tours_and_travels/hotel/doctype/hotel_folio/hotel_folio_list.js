// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.listview_settings['Hotel Folio'] = {
    add_fields: ["name", "customer", "from_date", "to_date", "days_nights", "duration", "hotel", "hotel_room",
    "extra_service", "extra_service_charge", "room_qty", "unit_price", "sales_invoice"],

    button: {
        show: function (doc) {
            return doc.docstatus == 1;
        },
        get_label: function (doc) {
            if (doc.sales_invoice) {
                return __("View Invoice", null, "Access");
            } else {
                return __("Create Invoice", null, "Access");
            }
        },
        get_description: function (doc) {
            if (doc.sales_invoice) {
                return __("View Invoice of {0}", [`${doc.name}`]);
            } else {
                return __("Create Invoice of {0}", [`${doc.name}`]);
            }
        },
        action: function (doc) {
            if (doc.sales_invoice) {
                window.open("/app/sales-invoice/"+doc.sales_invoice);
            } else {
                frappe.confirm('Are you sure you want to submit the Sales Invoice?',
                    () => {
                    frappe.call({
                        method: "tours_and_travels.hotel.doctype.hotel_folio.hotel_folio.create_submit_invoice",
                        args: {
                            name: doc.name,
                            customer: doc.customer,
                            date: doc.to_date,
                            qty: doc.room_qty,
                            hotel_price: doc.unit_price,
                            hotel_br_des: doc.from_date + ' - ' + doc.to_date + ' | Days/Nights: '+ doc.days_nights + ' | Duration: '+ doc.duration +'<br>Hotel: '+ doc.hotel + '<br>Hotel Room: '+ doc.hotel_room,
                            extra_service: doc.extra_service || "Extra Service",
                            extra_service_charge: doc.extra_service_charge
                            }
                        });
                    }, () => {
                    frappe.call({
                        method: "tours_and_travels.hotel.doctype.hotel_folio.hotel_folio.create_draft_invoice",
                        args: {
                            name: doc.name,
                            customer: doc.customer,
                            date: doc.to_date,
                            qty: doc.room_qty,
                            hotel_price: doc.unit_price,
                            hotel_br_des: doc.from_date + ' - ' + doc.to_date + ' | Days/Nights: '+ doc.days_nights + ' | Duration: '+ doc.duration +'<br>Hotel: '+ doc.hotel + '<br>Hotel Room: '+ doc.hotel_room,
                            extra_service: doc.extra_service || "Extra Service",
                            extra_service_charge: doc.extra_service_charge
                            }
                        });
                    });
            }
        }
    }
};