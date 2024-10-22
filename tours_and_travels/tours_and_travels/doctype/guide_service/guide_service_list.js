// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.listview_settings['Guide Service'] = {
    button: {
        show: function (doc) {
            return doc.name;
        },
        get_label: function () {
            return __("View Guide", null, "Access");
        },
        get_description: function (doc) {
            return __("View Guide of {0}", [`${doc.name}`]);
        },
        action: function (doc) {
            window.open("/app/guide?guide_service="+doc.name);
        }
    }   
};