(function ( module ) {
	'use strict';

	module.config( function ( $stateProvider ) {

		$stateProvider.state( 'dashboard', {
			abstract: true,
			parent:   'app',
			url:      '?estimated',
			resolve:  {
				'permissions': function ( $q, $state, user ) {
					var deferred     = $q.defer(),
						hasCountries = user.attributes.permissions.countries.length !== 0,
						hasAccounts  = user.attributes.permissions.accounts.length !== 0;

					if ( hasCountries || hasAccounts ) {
						deferred.resolve( user.attributes.permissions );
					}
					else {
						$state.go( 'unauthorized' );
						deferred.reject( 'unauthorized' );
					}
					return deferred.promise;
				},
				'estimated':   function ( $stateParams ) {
					return {estimated: $stateParams.estimated === 'false' ? false : true};
				}
			},
			views:    {
				'footer@app':     {
					template:   '<div ng-if="estimated.estimated" class="alert alert-estimated">*Based on estimated budget(s)</div>',
					controller: function ( $scope, estimated ) {
						$scope.estimated = estimated;
					}
				},
				'navbarForm@app': {
					templateUrl: 'states/dashboard/estimated-toggle.html',
					controller:  'EstimatedToggleController as toggle'
				},
				'navigation@app': {
					templateUrl: 'states/dashboard/navigation.html',
					controller:  'NavigationController as nav'
				}
			},
			params:   {
				estimated: {
					value:  'true',
					squash: true
				}
			}
		} );
	} );

})( angular
	.module( 'mpdDashboard.states.dashboard', [
		// Dependencies
		'ui.router',
		'angular-growl',
		'ui.bootstrap.buttons',

		// APIs
		'mpdDashboard.api.user',

		// Dependent States
		'mpdDashboard.states.app'
	] ) );
