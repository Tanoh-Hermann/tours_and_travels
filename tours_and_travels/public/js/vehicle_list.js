// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.listview_settings['Vehicle'] = {
    button: {
        show: function (doc) {
            return doc.name;
        },
        get_label: function () {
            return __("View Transporter", null, "Access");
        },
        get_description: function (doc) {
            return __("View Transporter of {0}", [`${doc.name}`]);
        },
        action: function (doc) {
            window.open("/app/transportation-registration?vehicle="+doc.name);
        }
    }   
};