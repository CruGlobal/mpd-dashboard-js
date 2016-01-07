(function ( module ) {
	'use strict';

	module.directive( 'regionClick', function ( $log ) {
		return {
			restrict: 'A',
			scope:    false,
			require:  'googleChart',
			link:     function ( scope, element, attrs, googleChartController ) {
				function callback( chartWrapper, chart, args ) {
					callback.$inject = ['chartWrapper', 'chart', 'args'];
					var returnValues = {
						chartWrapper: chartWrapper,
						chart:        chart,
						args:         args,
						region:       args[0].region
					};
					scope.$apply( function () {
						scope.$eval( attrs.regionClick, returnValues );
					} );
				}

				googleChartController.registerChartListener( 'regionClick', callback, this );
			}
		};
	} );

})( angular.module( 'mpdDashboard.components.googlechart.regionClick', [
	'googlechart'
] ) );
