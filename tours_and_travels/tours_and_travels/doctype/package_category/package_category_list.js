// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.listview_settings['Package Category'] = {
    refresh: function(listview) {
        $(".comment-count").css({'margin-left':'-15px'});
    },
    button: {
        show: function (doc) {
            return doc.name;
        },
        get_label: function () {
            return __("View Tour Package", null, "Access");
        },
        get_description: function (doc) {
            return __("View Tour Package of {0}", [`${doc.name}`]);
        },
        action: function (doc) {
            window.open("/app/tour-package?package_category="+doc.name);
        }
    }   
};