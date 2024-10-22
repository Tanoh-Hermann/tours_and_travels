// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.listview_settings['Hotel Room'] = {
    button: {
        show: function (doc) {
            return doc.name;
        },
        get_label: function () {
            return __("View Hotel", null, "Access");
        },
        get_description: function (doc) {
            return __("View Hotel of {0}", [`${doc.name}`]);
        },
        action: function (doc) {
            window.open("/app/hotel?hotel_room="+doc.name);
        }
    }   
};