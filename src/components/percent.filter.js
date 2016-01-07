(function ( module ) {
	'use strict';

	module.filter( 'percent', function ( $window ) {
		return function ( input, decimals, suffix ) {
			decimals = angular.isNumber( decimals ) ? decimals : 2;
			if ( angular.isUndefined( suffix ) ) {
				suffix = '%';
			}
			if ( $window.isNaN( input ) ) {
				return '';
			}
			return Math.round( input * Math.pow( 10, decimals + 2 ) ) / Math.pow( 10, decimals ) + (suffix ? suffix : 0)
		};
	} );

})( angular.module( 'mpdDashboard.components.percent', [] ) );

