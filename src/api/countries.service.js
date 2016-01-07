/**
 GET /countries?estimated=(false|true)

 Fetch a list of countries (ministries technically) and corresponding mpd status using either actual or estimated budgets.
 If estimated is missing, assume false.

 Response:
 [
 {
	 name: "Chile",     // Country Name
	 min_code: "CHL"       // Ministry Code
	 iso_code: "CL",       // ISO 3166 alpha-2
	 mpd_level: 0.72,        // MPD Level used in geochart
	 staff_with_budget: 0, // Staff with a budget (%)
	 staff_raised: [       // % of Staff who have raised
		 0,    // Less than 50%
		 0.75, // 50 to 80%
		 0.25, // 80 to 100%
		 0     // Greater than 100%
	 ],
	 budget_spent: 1,      // % of Expense Budget Spent
	 raised_locally: 0.7   // Support raised locally (%)
 },
 ...
 ]
 */

(function ( module ) {
	'use strict';
	module.factory( 'Countries', function ( $log, $resource, Settings ) {
		var returnDataAttr = function ( response ) {
			return response.data.data;
		};

		return $resource( Settings.api.mpdDashboard( '/countries/:id' ), {}, {
			query: {method: 'GET', interceptor: {response: returnDataAttr}},
			get:   {method: 'GET', interceptor: {response: returnDataAttr}}
		} );
	} );

})( angular.module( 'mpdDashboard.api.countries', ['ngResource'] ) );
