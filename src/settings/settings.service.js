(function ( module ) {
	'use strict';

	module.provider( 'Settings', function () {
		var config = {};

		this.setConfig = function ( c ) {
			config = c;
		};

		this.isDevelopment = function () {
			return config.environment === 'development';
		};

		this.casAuthApiBaseUrl = function() {
			return config.api.casAuthApi;
		};

		this.ticketUrl = function() {
			return config.api.refresh;
		};

		function apiUrl( base, path ) {
			if ( typeof path === 'undefined' ) return base;
			return ( path.indexOf( '/' ) === 0 )
				? base + path
				: base + '/' + path;
		}

		this.$get = function () {
			return {
				api: {
					mpdDashboard: function ( path ) {
						return apiUrl( config.api.mpdDashboard, path );
					}
				}
			};
		}
	} );

})( angular.module( 'mpdDashboard.settingsService', [] ) );
