(function ( module ) {
	'use strict';

	module.config( function ( $stateProvider ) {

		$stateProvider.state( 'unauthorized', {
			parent:  'app',
			url:     '',
			resolve: {
				'permissions': function ( $q, $state, User ) {
					var deferred = $q.defer();
					User.get().$promise.then( function ( user ) {
						var countries = _.sortBy( user.attributes.permissions.countries, 'name' ),
							accounts  = _.sortBy( user.attributes.permissions.accounts, 'name' );
						if ( countries.length === 0 && accounts.length === 0 ) {
							deferred.resolve( true );
						}
						else if ( countries.length !== 0 ) {
							if ( countries.length === 1 ) {
								var country = _.first( countries );
								$state.go( 'country', {id: country.id} );
							}
							else {
								$state.go( 'countries' );
							}
						}
						else {
							var account = _.first( accounts );
							$state.go( 'staffAccount', {id: account.id} );
						}
					}, function () {
						deferred.resolve( true );
					} );
					return deferred.promise;
				}
			},
			views:   {
				'@app': {
					templateUrl: 'states/unauthorized/unauthorized.html',
					controller:  function ( $scope, permissions, $stateParams ) {
						console.log( $stateParams );
						// require permissions so it gets resolved
						$scope.message = angular.isDefined( $stateParams.message ) ? $stateParams.message : undefined;
					}
				}
			},
			params: {
				message: null
			}
		} );
	} );

})( angular
	.module( 'mpdDashboard.states.unauthorized', [
		// Dependencies
		'ui.router',
		'angular-growl',

		// Dependent States
		'mpdDashboard.states.app',
		'mpdDashboard.states.dashboard.countries',
		'mpdDashboard.states.dashboard.staffAccount',
		'mpdDashboard.states.dashboard.country'
	] ) );
