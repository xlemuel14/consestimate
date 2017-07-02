(function(){
	
	'use strict';

	angular
		.module('angularseed')
		.controller('mainCtrl', mainCtrl)

	function mainCtrl($rootScope, $scope, $cookieStore, $state, $timeout, $interval, services, toaster) {
		
		$scope.showClock = true;
		
		$interval(function(){
			$rootScope.clock = Date.now();
		}, 1000);
		
	}

})();