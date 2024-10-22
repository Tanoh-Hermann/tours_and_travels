from . import __version__ as app_version

app_name = "tours_and_travels"
app_title = "Tours And Travels"
app_publisher = "Ketan Patel"
app_description = "Tours And Travels"
app_email = "contact@solufy.in"
app_license = "MIT"

# Includes in <head>
# ------------------

fixtures = [{
	"doctype": "Custom Field",
		"filters": {
			"module": ["in", ["Tours And Travels", "Hotel", "Restaurant", "Transportation"]]
			}
	},
	{
	"doctype": "Property Setter",
		"filters": {
			"module": ["in", ["Tours And Travels", "Hotel", "Restaurant", "Transportation"]]
			}
	}
]


# include js, css files in header of desk.html
# app_include_css = "/assets/tours_and_travels/css/tours_and_travels.css"
# app_include_js = "/assets/tours_and_travels/js/tours_and_travels.js"

# include js, css files in header of web template
# web_include_css = "/assets/tours_and_travels/css/tours_and_travels.css"
# web_include_js = "/assets/tours_and_travels/js/tours_and_travels.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "tours_and_travels/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}

doctype_js = {
	"Address" : "public/js/address.js",
	"Contract" : "public/js/contract.js",
	"Vehicle" : "public/js/vehicle.js"
}
doctype_list_js = {
	"Contract" : "public/js/contract_list.js",
	"Quotation" : "public/js/quotation_list.js",
	"Vehicle" : "public/js/vehicle_list.js"
}

# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
#	"methods": "tours_and_travels.utils.jinja_methods",
#	"filters": "tours_and_travels.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "tours_and_travels.install.before_install"
# after_install = "tours_and_travels.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "tours_and_travels.uninstall.before_uninstall"
# after_uninstall = "tours_and_travels.uninstall.after_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "tours_and_travels.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
#	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
#	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
#	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
#	"*": {
#		"on_update": "method",
#		"on_cancel": "method",
#		"on_trash": "method"
#	}
# }

doc_events = {
	"Tour Package": {
		"before_save": "tours_and_travels.tours_and_travels.doctype.tour_package.tour_package.update_hotel_restaurant_price"
	},
	"Tour Registration": {
		"before_save": "tours_and_travels.tours_and_travels.doctype.tour_registration.tour_registration.hotel_restaurant_brief"
	},
	"Transportation Registration":{
		"on_update": [
			"tours_and_travels.transportation.doctype.transportation_registration.transportation_registration.veh_list"
		],
	},
	"Hotel":{
		"before_save": [
			"tours_and_travels.hotel.doctype.hotel.hotel.upd_val"
		],
	},
	"Restaurant":{
		"before_save": [
			"tours_and_travels.restaurant.doctype.restaurant.restaurant.upd_val"
		],
	},
	"Sales Invoice":{
		"on_update": [
			"tours_and_travels.hotel.doctype.hotel_folio.hotel_folio.upd_hotel_folio_id"
		],
	},
	"Address":{
		"on_update": [
			"tours_and_travels.public.py.address.upd_address"
		],
	}
}

# Scheduled Tasks
# ---------------

# scheduler_events = {
#	"all": [
#		"tours_and_travels.tasks.all"
#	],
#	"daily": [
#		"tours_and_travels.tasks.daily"
#	],
#	"hourly": [
#		"tours_and_travels.tasks.hourly"
#	],
#	"weekly": [
#		"tours_and_travels.tasks.weekly"
#	],
#	"monthly": [
#		"tours_and_travels.tasks.monthly"
#	],
# }

# Testing
# -------

# before_tests = "tours_and_travels.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
#	"frappe.desk.doctype.event.event.get_events": "tours_and_travels.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
#	"Task": "tours_and_travels.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]


# User Data Protection
# --------------------

# user_data_fields = [
#	{
#		"doctype": "{doctype_1}",
#		"filter_by": "{filter_by}",
#		"redact_fields": ["{field_1}", "{field_2}"],
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_2}",
#		"filter_by": "{filter_by}",
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_3}",
#		"strict": False,
#	},
#	{
#		"doctype": "{doctype_4}"
#	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
#	"tours_and_travels.auth.validate"
# ]
