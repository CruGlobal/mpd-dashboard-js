(function ( module ) {
	'use strict';

	module.config( function ( $stateProvider ) {

		$stateProvider.state( 'staffAccount', {
			parent:  'dashboard',
			url:     'staff/{id:int}',
			resolve: {
				'account':             function ( $q, $state, $stateParams, Staff, estimated, permissions ) {
					var deferred = $q.defer();
					Staff
						.get(
							estimated.estimated ? {
								id:        $stateParams.id,
								estimated: true
							} : {id: $stateParams.id}
						)
						.$promise
						.then( function ( account ) {
							deferred.resolve( account );
						}, function () {
							$state.go( 'unauthorized' );
						} );
					return deferred.promise;
				},
				'budgetTrendData':     function ( $window, $q, googleChartApiPromise, account ) {
					var deferred = $q.defer();
					googleChartApiPromise.then( function () {
						var budget_trend = _.map( account.attributes.budget_trend, function ( data ) {
							data[0] = new Date( data[0] );
							return data;
						} );
						var data = $window.google.visualization.arrayToDataTable(
							[['Month', 'Balance', 'Income', 'To Raise', 'Expenses', 'Expense Budget']].concat( budget_trend )
						);

						var dateFormat = new $window.google.visualization.DateFormat( {
							pattern: 'MMM y'
						} );
						dateFormat.format( data, 0 );

						deferred.resolve( data );
					}, function () {
						deferred.reject();
					} );
					return deferred.promise;
				},
				'incomeBreakdownData': function ( account ) {
					return [['Income Type', 'Amount']].concat( account.attributes.income );
				}
			},
			views:   {
				'@app': {
					templateUrl: 'states/dashboard/staff-account/staff-account.html',
					controller:  'StaffAccountController as staffAccountCtrl'
				},
				'title@app': {
					template:   '<span>{{name}}</span>',
					controller: function ( $scope, account ) {
						$scope.name = account.attributes.name;
					}
				}
			}
		} );
	} );

})( angular
	.module( 'mpdDashboard.states.dashboard.staffAccount', [
		// Dependencies
		'ui.router',
		'angular-growl',
		'googlechart',
		'ui.bootstrap.dropdown',
		'mpdDashboard.components.percent',

		// API
		'mpdDashboard.api.staff',

		// Dependent States
		'mpdDashboard.states.dashboard.country',
		'mpdDashboard.states.unauthorized'
	] ) );
