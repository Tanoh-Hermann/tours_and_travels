from . import __version__ as app_version
app_name = 'tours_and_travels'
app_title = 'Tours And Travels'
app_publisher = 'Ketan Patel'
app_description = 'Tours And Travels'
app_email = 'contact@solufy.in'
app_license = 'MIT'
fixtures = [{'doctype': 'Custom Field', 'filters': {'module': ('in', ['Tours And Travels', 'Hotel', 'Restaurant', 'Transportation'])}}, {'doctype': 'Property Setter', 'filters': {'module': ('in', ['Tours And Travels', 'Hotel', 'Restaurant', 'Transportation'])}}]
doctype_js = {'Address': 'public/js/address.js', 'Contract': 'public/js/contract.js', 'Vehicle': 'public/js/vehicle.js'}
doctype_list_js = {'Contract': 'public/js/contract_list.js', 'Quotation': 'public/js/quotation_list.js', 'Vehicle': 'public/js/vehicle_list.js'}
doc_events = {'Tour Package': {'before_save': 'tours_and_travels.tours_and_travels.doctype.tour_package.tour_package.update_hotel_restaurant_price'}, 'Tour Registration': {'before_save': 'tours_and_travels.tours_and_travels.doctype.tour_registration.tour_registration.hotel_restaurant_brief'}, 'Transportation Registration': {'on_update': ['tours_and_travels.transportation.doctype.transportation_registration.transportation_registration.veh_list']}, 'Hotel': {'before_save': ['tours_and_travels.hotel.doctype.hotel.hotel.upd_val']}, 'Restaurant': {'before_save': ['tours_and_travels.restaurant.doctype.restaurant.restaurant.upd_val']}, 'Sales Invoice': {'on_update': ['tours_and_travels.hotel.doctype.hotel_folio.hotel_folio.upd_hotel_folio_id']}, 'Address': {'on_update': ['tours_and_travels.public.py.address.upd_address']}}
