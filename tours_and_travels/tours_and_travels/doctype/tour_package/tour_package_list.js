// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.listview_settings['Tour Package'] = {
    button: {
        show: function (doc) {
            return doc.docstatus == 1;
        },
        get_label: function () {
            return __("View Tour Reg.", null, "Access");
        },
        get_description: function (doc) {
            return __("View Tour Reg. of {0}", [`${doc.name}`]);
        },
        action: function (doc) {
            window.open("/app/tour-registration?tour_package="+doc.name);
        }
    }   
};