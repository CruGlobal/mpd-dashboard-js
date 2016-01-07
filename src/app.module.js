(function () {
	'use strict';

	angular.module( 'mpdDashboard', [
		// Dependencies
		'gettext',
		'ui.router',
		'angular-growl',
		'cas-auth-api',
		'mpdDashboard.settingsService',

		// States
		'mpdDashboard.states.dashboard.countries'
	] );
})();
