(function(){
	
	'use strict';	
	
	angular
		.module('angularseed')
		.directive('pageTitle', pageTitle)
		.directive('sideNavigation', sideNavigation)
		.directive('icheck', icheck)
		.directive('minimalizaSidebar', minimalizaSidebar)
		.directive('loadingIndicator', loadingIndicator)

	function pageTitle($rootScope, $timeout) {
		return {
			link: function(scope, element) {
				var listener = function(event, toState, toParams, fromState, fromParams) {
					var title = 'Seed Project';
					if (toState.data && toState.data.pageTitle) title = 'Angular Seed | ' + toState.data.pageTitle;
					$timeout(function() {
						element.text(title);
					});
				};
				$rootScope.$on('$stateChangeStart', listener);
			}
		}
	}

	function sideNavigation($timeout) {
		return {
			restrict: 'A',
			link: function(scope, element) {
				// Call the metsiMenu plugin and plug it to sidebar navigation
				$timeout(function(){
					element.metisMenu();
				});
			}
		};
	}

	function minimalizaSidebar($timeout) {
		return {
			restrict: 'A',
			template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-link" href="" ng-click="minimalize()"><i class="fa fa-bars fa-2x"></i></a>',
			controller: function ($scope, $element) {
				$scope.minimalize = function () {
					$("body").toggleClass("mini-navbar");
					if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
						// Hide menu in order to smoothly turn on when maximize menu
						$('#side-menu').hide();
						// For smoothly turn on menu
						setTimeout(
							function () {
								$('#side-menu').fadeIn(400);
							}, 200);
					} else if ($('body').hasClass('fixed-sidebar')){
						$('#side-menu').hide();
						setTimeout(
							function () {
								$('#side-menu').fadeIn(400);
							}, 100);
					} else {
						// Remove all inline style from jquery fadeIn function to reset menu state
						$('#side-menu').removeAttr('style');
					}
				}
			}
		};
	}

	function icheck($timeout) {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function($scope, element, $attrs, ngModel) {
				return $timeout(function() {
					var value;
					value = $attrs['value'];

					$scope.$watch($attrs['ngModel'], function(newValue){
						$(element).iCheck('update');
					})

					return $(element).iCheck({
						checkboxClass: 'icheckbox_square-green',
						radioClass: 'iradio_square-green'

					}).on('ifChanged', function(event) {
							if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
								$scope.$apply(function() {
									return ngModel.$setViewValue(event.target.checked);
								});
							}
							if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
								return $scope.$apply(function() {
									return ngModel.$setViewValue(value);
								});
							}
						});
				});
			}
		};
	}

	function loadingIndicator() {
		return {
			restrict: 'E',
			scope: {
				text: '@'
			},
			template:
				"<div>" +
					"<h3>{{text}}<h3>" +
				"</div>" +
				"<div class='sk-spinner sk-spinner-wave'>" +
					"<div class='sk-rect1'></div> " +
					"<div class='sk-rect2'></div> " +
					"<div class='sk-rect3'></div> " +
					"<div class='sk-rect4'></div> " +
					"<div class='sk-rect5'></div>" +
				"</div>"
		};
	}

})();