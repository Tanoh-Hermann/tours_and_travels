// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.listview_settings['Tour Registration'] = {
    refresh: function(listview) {
        $(".comment-count").css({'margin-left':'-15px'});
    },

    add_fields: ["tour_package"],
    button: {
        show: function (doc) {
            return doc.name
        },
        get_label: function () {
            return __("View Tour Package", null, "Access");
        },
        get_description: function (doc) {
            return __("View Tour Package of {0}", [`${doc.name}`]);
        },
        action: function (doc) {
            window.open("/app/tour-package/"+doc.tour_package);
        }
    }   
};