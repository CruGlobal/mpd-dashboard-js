(function ( module ) {
	'use strict';

	module.config( function ( $stateProvider ) {

		$stateProvider.state( 'country', {
			parent:  'dashboard',
			url:     'country/{id:int}',
			resolve: {
				'hasCountry':       function ( $state, $stateParams, permissions ) {
					var country = _.findWhere( permissions.countries, {id: $stateParams.id} );
					if ( angular.isUndefined( country ) ) {
						$state.go( 'unauthorized' );
					}
					return country;
				},
				'country':          function ( $q, $state, $stateParams, Countries, estimated, hasCountry ) {
					var deferred = $q.defer();
					Countries
						.get(
							estimated.estimated ? {
								id:        $stateParams.id,
								estimated: true
							} : {id: $stateParams.id}
						)
						.$promise
						.then( function ( country ) {
							deferred.resolve( country );
						}, function () {
							$state.go( 'unauthorized' );
						} );
					return deferred.promise;
				},
				'mpdHealthData':    function ( country ) {
					return [
						['Support Level', 'Percentage Raised'],
						['> 100%', country.attributes.mpd_health[0].length],
						['80 - 100%', country.attributes.mpd_health[1].length],
						['50 - 80%', country.attributes.mpd_health[2].length],
						['< 50%', country.attributes.mpd_health[3].length],
						['No Budget', country.attributes.mpd_health[4].length]
					];
				},
				'supportTrendData': function ( $window, $q, googleChartApiPromise, country ) {
					var deferred = $q.defer();
					googleChartApiPromise.then( function () {
						var average_support = _.map( country.attributes.average_support, function ( data ) {
							data[0] = new Date( data[0] );
							return data;
						} );
						var data = $window.google.visualization.arrayToDataTable(
							[['Period', 'Average Support Level', 'Staff with more than 90%']].concat( average_support )
						);

						var dateFormat = new $window.google.visualization.DateFormat( {
							pattern: 'MMM y'
						} );
						dateFormat.format( data, 0 );

						var percentFormat = new $window.google.visualization.NumberFormat( {
							pattern:        '#,###%',
							fractionDigits: 2
						} );
						percentFormat.format( data, 1 );
						percentFormat.format( data, 2 );

						deferred.resolve( data );
					}, function () {
						deferred.reject();
					} );
					return deferred.promise;
				}
			},
			views:   {
				'@app':      {
					templateUrl: 'states/dashboard/country/country.html',
					controller:  'CountryController as country'
				},
				'title@app': {
					template:   '<span>{{name}}</span>',
					controller: function ( $scope, country ) {
						$scope.name = country.attributes.name;
					}
				}
			}
		} );
	} );

})( angular
	.module( 'mpdDashboard.states.dashboard.country', [
		// Dependencies
		'ui.router',
		'angular-growl',
		'googlechart',
		'mpdDashboard.components.percent',

		// API
		'mpdDashboard.api.countries',

		// Dependent States
		'mpdDashboard.states.dashboard',
		'mpdDashboard.states.dashboard.staffAccount',
		'mpdDashboard.states.unauthorized'
	] ) );
