(function ( module ) {
	'use strict';

	module.config( function ( $stateProvider, $urlRouterProvider ) {
		$urlRouterProvider.otherwise( '/countries' );

		$stateProvider.state( 'app', {
			abstract:    true,
			url:         '/',
			resolve:     {
				'user': function ( $log, $q, $state, User ) {
					return User.get().$promise;
				}
			},
			templateUrl: 'states/app.html'
		} );
	} );

})( angular
	.module( 'mpdDashboard.states.app', [
		// Dependencies
		'ui.router',
		'angular-growl',
		'ui.bootstrap.collapse',
		'ui.bootstrap.dropdown',

		// APIs
		'mpdDashboard.api.user',

		// States
		'mpdDashboard.states.unauthorized'
	] ) );
