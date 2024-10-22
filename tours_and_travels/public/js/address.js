// Copyright (c) 2022, Nihantra C. Patel and contributors
// For license information, please see license.txt

frappe.ui.form.on('Address', {
    refresh: function(frm) {
        frm.set_query("h_r_state", function() {
            return {
                "filters": {
                    "country": frm.doc.country
                    }
                };
        });
        frm.set_query("h_r_city", function() {
            return {
                "filters": {
                    "country": frm.doc.country,
                    "state": frm.doc.h_r_state
                    }
                };
        });
    },
    h_r_state: function(frm) {
        frm.set_value("state", frm.doc.h_r_state);
    },
    h_r_city: function(frm) {
        frm.set_value("city", frm.doc.h_r_city);
    } 
});