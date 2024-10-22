// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.listview_settings['Contract'] = {
    onload: function(listview) {
        if (listview.page.fields_dict.package_contract_type) {
            listview.page.fields_dict.package_contract_type.get_query = function() {
                return {
                    "filters": {
                        "name": ["in", ["Hotel", "Restaurant", "Transportation Registration"]]
                    }
                };
            };
        }
    },
    
    add_fields: ["package_contract_type", "hotel_restaurant"],
    button: {
        show: function (doc) {
            return doc.name;
        },
        get_label: function (doc) {
            if (doc.package_contract_type == "Hotel") {
                return __("View Hotel", null, "Access");
            } else if (doc.package_contract_type == "Restaurant") {
                return __("View Rest.", null, "Access");
            } else if (doc.package_contract_type == "Transportation Registration") {
                return __("View Trans.", null, "Access");
            }
        },
        get_description: function (doc) {
            if (doc.package_contract_type == "Hotel") {
                return __("View Hotel of {0}", [`${doc.name}`]);
            } else if (doc.package_contract_type == "Restaurant") {
                return __("View Restaurant of {0}", [`${doc.name}`]);
            } else if (doc.package_contract_type == "Transportation Registration") {
                return __("View Transportation of {0}", [`${doc.name}`]);
            }
        },
        action: function (doc) {
            if (doc.package_contract_type == "Hotel") {
                window.open("/app/hotel/"+doc.hotel_restaurant);
            } else if (doc.package_contract_type == "Restaurant") {
                window.open("/app/restaurant/"+doc.hotel_restaurant);
            } else if (doc.package_contract_type == "Transportation Registration") {
                window.open("/app/transportation-registration/"+doc.hotel_restaurant);
            }
        }
    }
};