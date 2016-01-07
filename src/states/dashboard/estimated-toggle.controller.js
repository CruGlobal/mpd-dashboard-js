(function ( module ) {
	'use strict';

	function EstimatedToggleController( $scope, $state, estimated ) {
		var self = this;
		this.model = estimated;

		$scope.$watch( function ( $scope ) {
			return self.model.estimated
		}, function ( newVal, oldVal ) {
			$state.go( $state.current, {estimated: newVal} );
		} );
	}

	module.controller( 'EstimatedToggleController', EstimatedToggleController );

})( angular.module( 'mpdDashboard.states.dashboard' ) );
