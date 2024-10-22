// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.listview_settings['Quotation'] = {
    add_fields: ["tour_registration"],
    button: {
        show: function (doc) {
            return doc.tour_registration;
        },
        get_label: function () {
            return __("View Tour Reg.", null, "Access");
        },
        get_description: function (doc) {
            return __("View Tour Reg. of {0}", [`${doc.name}`]);
        },
        action: function (doc) {
            window.open("/app/tour-registration/"+doc.tour_registration);
        }
    }   
};