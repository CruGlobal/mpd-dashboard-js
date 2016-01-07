(function ( module ) {
	'use strict';

	function NavigationController( $log, $state, permissions ) {
		this.$state = $state;
		this.countries = permissions.countries;
		this.accounts = permissions.accounts;
	}

	module.controller( 'NavigationController', NavigationController );

})( angular.module( 'mpdDashboard.states.dashboard' ) );
