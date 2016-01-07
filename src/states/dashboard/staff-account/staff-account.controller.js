(function ( module ) {
	'use strict';

	function StaffAccountController( $log, $window, $state, account, budgetTrendData, incomeBreakdownData, Staff ) {
		var budgetTrendDiv        = $window.jQuery( '.budget-trend' ),
			incomeBreakdownDiv    = $window.jQuery( '.income-breakdown' ),
			backgroundColor       = budgetTrendDiv.css( 'backgroundColor' ),
			textColor             = budgetTrendDiv.css( 'color' ),
			trendColors           = [
				budgetTrendDiv.find( '.color1' ).css( 'backgroundColor' ),
				budgetTrendDiv.find( '.color2' ).css( 'backgroundColor' ),
				budgetTrendDiv.find( '.color3' ).css( 'backgroundColor' ),
				budgetTrendDiv.find( '.color4' ).css( 'backgroundColor' ),
				budgetTrendDiv.find( '.color5' ).css( 'backgroundColor' )
			],
			incomeBreakdownColors = [
				incomeBreakdownDiv.find( '.color1' ).css( 'backgroundColor' ),
				incomeBreakdownDiv.find( '.color2' ).css( 'backgroundColor' ),
				incomeBreakdownDiv.find( '.color3' ).css( 'backgroundColor' )
			];

		this.$state = $state;
		this.mpdAnalysis = account.attributes.mpd_analysis;
		this.averageSupport = account.attributes.average_support;
		this.incorrect_association = account.attributes.incorrect_association;

		this.budgetTrend = {
			type:    'LineChart',
			data:    budgetTrendData,
			view:    {
				columns: [0, 1, 2, 3, 4, 5]
			},
			options: {
				legend:          {
					textStyle: {
						color: 'white'
					}
				},
				backgroundColor: backgroundColor,
				colors:          angular.copy( trendColors ),
				lineWidth:       3,
				series:          {
					2: {
						lineDashStyle: [10, 6]
					},
					4: {
						lineDashStyle: [10, 6]
					}
				},
				hAxis:           {baselineColor: textColor, textStyle: {color: textColor}},
				vAxis:           {baselineColor: textColor, textStyle: {color: textColor}}
			}
		};

		this.hideTrendSeries = function ( selectedItem ) {
			if ( angular.isUndefined( selectedItem ) ) return;
			var col = selectedItem.column;
			if ( selectedItem.row === null ) {

				// If series is enabled, disable it
				if ( this.budgetTrend.view.columns[col] == col ) {
					this.budgetTrend.view.columns[col] = {
						label: budgetTrendData.getColumnLabel( col ),
						type:  budgetTrendData.getColumnType( col ),
						calc:  function () {
							return null;
						}
					};
					this.budgetTrend.options.colors[col - 1] = '#CCCCCC';
				}
				else {
					this.budgetTrend.view.columns[col] = col;
					this.budgetTrend.options.colors[col - 1] = trendColors[col - 1];
				}
			}
		};

		this.incomeBreakdown = {
			type:    'PieChart',
			data:    incomeBreakdownData,
			options: {
				pieHole:             0.4,
				reverseCategories:   false,
				chartArea:           {
					left:   60,
					top:    20,
					width:  "120%",
					height: "90%"
				},
				legend:              {
					textStyle: {
						color: textColor
					}
				},
				backgroundColor:     backgroundColor,
				pieSliceBorderColor: backgroundColor,
				slices:              [
					{color: incomeBreakdownColors[0]},
					{color: incomeBreakdownColors[1]},
					{color: incomeBreakdownColors[2]}
				]
			}
		};

		this.reportIncorrectAssociation = function () {
			var self = this;
			Staff
				.remove( {id: account.id} )
				.$promise
				.then( function ( acct ) {
					self.incorrect_association = true;
				}, function () {
				} );
		}
	}

	module.controller( 'StaffAccountController', StaffAccountController );

})( angular.module( 'mpdDashboard.states.dashboard.staffAccount' ) );
