/**
 GET /account?min_code=(min_code)&person_id=(person_id)&estimated=(true|false)

 Returns mpd data for the selected staff account at the given ministry

 Response:
 {
 	name: "Babyvic Spomaul",
 	person_id: "uuid",
 	min_code: "RUS",
 	mpd_analysis: 0.8, // red/yellow/green traffic light, possibly number between 0 and 1?
 	average_support:[
 		0.964, // Year
 		0.991, // Quarter
 		1.116 // Month
 	],
 	income: [
 		// ['Income Type', 'Amount'],
		['Local Income', 6672.95],
		['Foreign Income', 0.00],
		['Subsidy', 0.00]
 	],
	budget_trend: [
		// [ 'Month', 'Balance', 'Income', 'To Raise', 'Expenses', 'Expense Budget' ]
		['2015-04', 31866.54, 3076.00, 0.00, 5188.74, 0.00 ],
		[ ... ],
		[ ... ],
		[ ... ]
	]
 }
 */

(function ( module ) {
	'use strict';
	module.factory( 'Staff', function ( $log, $resource, Settings ) {
		var returnDataAttr = function ( response ) {
			return response.data.data;
		};

		return $resource( Settings.api.mpdDashboard( '/staff/:id' ), {}, {
			get: {method: 'GET', interceptor: {response: returnDataAttr}},
			remove: {method: 'DELETE', interceptor: {response: returnDataAttr}}
		} );
	} );

})( angular.module( 'mpdDashboard.api.staff', ['ngResource'] ) );
