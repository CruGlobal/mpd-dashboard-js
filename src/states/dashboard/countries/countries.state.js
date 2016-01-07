(function ( module ) {
	'use strict';

	module.config( function ( $stateProvider ) {

		$stateProvider.state( 'countries', {
			parent:  'dashboard',
			url:     'countries',
			resolve: {
				'hasCountries': function ( $state, permissions ) {
					if ( permissions.countries.length === 0 ) {
						$state.go( 'unauthorized' );
					}
					return permissions.countries;
				},
				'countries':    function ( $log, $q, $state, Countries, estimated, hasCountries ) {
					var deferred = $q.defer();
					Countries
						.query( estimated.estimated ? {estimated: true} : {} )
						.$promise
						.then( function ( countries ) {
							deferred.resolve( countries );
						}, function () {
							$state.go( 'unauthorized' );
						} );
					return deferred.promise;
				},
				'geodata':      function ( $log, $filter, countries ) {
					var data       = _.reject( _.pluck( countries, 'attributes' ), function ( obj ) {
							return angular.isUndefined( obj.iso_code ) || _.isNull( obj.iso_code ) || obj.iso_code === '';
						} ),
						iso_codes  = ['Country'].concat( _.pluck( data, 'iso_code' ) ),
						mpd_levels = ['MPD Level'].concat( _.map( _.pluck( data, 'mpd_level' ), function ( num ) {
							return $filter( 'percent' )( num, 2, false );
						} ) );
					return _.zip( iso_codes, mpd_levels );
				}
			},
			views:   {
				'@app': {
					templateUrl: 'states/dashboard/countries/countries.html',
					controller:  'CountriesController as countries'
				}
			}
		} );
	} );

})( angular
	.module( 'mpdDashboard.states.dashboard.countries', [
		// Dependencies
		'ui.router',
		'angular-growl',
		'googlechart',
		'mpdDashboard.components.googlechart.regionClick',
		'mpdDashboard.components.percent',

		// API
		'mpdDashboard.api.countries',

		// Dependent States
		'mpdDashboard.states.dashboard',
		'mpdDashboard.states.dashboard.country',
		'mpdDashboard.states.unauthorized'
	] ) );
