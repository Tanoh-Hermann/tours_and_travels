// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.listview_settings['Meal Type'] = {
    button: {
        show: function (doc) {
            return doc.name;
        },
        get_label: function () {
            return __("View Restaurant", null, "Access");
        },
        get_description: function (doc) {
            return __("View Restaurant of {0}", [`${doc.name}`]);
        },
        action: function (doc) {
            window.open("/app/restaurant?meal_type="+doc.name);
        }
    }   
};