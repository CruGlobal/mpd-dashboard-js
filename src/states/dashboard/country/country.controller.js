(function ( module ) {
	'use strict';

	function CountryController( $log, $window, $state, mpdHealthData, supportTrendData, country ) {
		this.$state = $state;

		this.mpdHealth = {
			type:    'PieChart',
			data:    mpdHealthData,
			options: {
				pieHole:             0.4, reverseCategories: false,
				chartArea:           {
					left:   60,
					top:    20,
					width:  "120%",
					height: "90%"
				},
				legend:              {
					textStyle: {
						color: 'white'
					}
				},
				backgroundColor:     $window.jQuery( '.mpd-health' ).css( 'backgroundColor' ),
				pieSliceBorderColor: $window.jQuery( '.mpd-health' ).css( 'backgroundColor' ),
				slices:              [
					{color: $window.jQuery( '.mpd-health .chart-colors .color1' ).css( 'backgroundColor' )},
					{color: $window.jQuery( '.mpd-health .chart-colors .color2' ).css( 'backgroundColor' )},
					{color: $window.jQuery( '.mpd-health .chart-colors .color3' ).css( 'backgroundColor' )},
					{color: $window.jQuery( '.mpd-health .chart-colors .color4' ).css( 'backgroundColor' )},
					{color: $window.jQuery( '.mpd-health .chart-colors .color5' ).css( 'backgroundColor' )}
				]
			}
		};

		this.supportTrend = {
			type:    'LineChart',
			data:    supportTrendData,
			options: {
				legend:          {
					textStyle: {
						color: 'white'
					}
				},
				backgroundColor: $window.jQuery( '.support-trend' ).css( 'backgroundColor' ),
				colors:          [
					$window.jQuery( '.support-trend .chart-colors .color1' ).css( 'backgroundColor' ),
					$window.jQuery( '.support-trend .chart-colors .color2' ).css( 'backgroundColor' )
				],
				lineWidth:       3,
				pointSize:       4,
				hAxis:           {baselineColor: 'white', format: 'MMM y', textStyle: {color: 'white'}},
				vAxis:           {baselineColor: 'white', format: 'percent', textStyle: {color: 'white'}}
			}
		};

		this.onMpdHealthSelect = function ( selectedItem ) {
			if ( angular.isUndefined( selectedItem ) ) {
				delete this.staff;
			}
			else {
				this.staffHeading = mpdHealthData[selectedItem.row + 1][0];
				this.staff = country.attributes.mpd_health[selectedItem.row];
			}
		}
	}

	module.controller( 'CountryController', CountryController );

})( angular.module( 'mpdDashboard.states.dashboard.country' ) );
