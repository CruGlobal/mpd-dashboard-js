(function ( module ) {
	'use strict';

	// Enable html5mode
	module.config( function ( $locationProvider ) {
		$locationProvider.html5Mode( true );
	} );

	// Initialize Application Settings
	module.config( function ( SettingsProvider ) {
		SettingsProvider.setConfig( window.MPDDashboard.config );
	} );

	// Configure Debug Logging
	module.config( function ( $logProvider, SettingsProvider ) {
		$logProvider.debugEnabled( SettingsProvider.isDevelopment() );
	} );

	// Configure Cas Authenticated Api
	module.config( function ( casAuthApiProvider, SettingsProvider ) {
		casAuthApiProvider
			.setRequireAccessToken( true )
			.setCacheAccessToken( true )
			.setAuthenticationApiBaseUrl( SettingsProvider.casAuthApiBaseUrl() )
			.setTicketUrl( SettingsProvider.ticketUrl() );
	} );

	// Configure Growl
	module.config( function ( growlProvider ) {
		growlProvider.globalPosition( 'top-right' );
		growlProvider.globalDisableCountDown( true );
		growlProvider.globalTimeToLive( {success: 10000, error: -1, warning: -1, info: 10000} );
	} );

	// Register managed API with casAuthApi
	module.run( function ( casAuthApi, Settings ) {
		casAuthApi.addManagedApi( Settings.api.mpdDashboard() );
	} );

	module.run( function ( $log, $rootScope ) {
		$rootScope.$on( '$stateChangeStart', function () {
			angular.element( 'div.loading' ).removeClass( 'hide' );
		} );
		$rootScope.$on( '$stateChangeSuccess', function () {
			angular.element( 'div.loading' ).addClass( 'hide' );
		} );
		$rootScope.$on( '$stateChangeError', function ( event, toState, toParams, fromState, fromParams, error ) {
			$log.error( '$stateChangeError:', toState, toParams, error );
		} );
	} );

})( angular.module( 'mpdDashboard' ) );
