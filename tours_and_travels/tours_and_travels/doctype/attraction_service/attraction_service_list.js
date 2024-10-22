// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.listview_settings['Attraction Service'] = {
    button: {
        show: function (doc) {
            return doc.name;
        },
        get_label: function () {
            return __("View Attraction", null, "Access");
        },
        get_description: function (doc) {
            return __("View Attraction of {0}", [`${doc.name}`]);
        },
        action: function (doc) {
            window.open("/app/attraction?attraction_service="+doc.name);
        }
    }   
};