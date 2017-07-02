(function(){
	
	'use strict';	
	
	angular
		.module('angularseed')
		.controller('homeCtrl', homeCtrl)

	function homeCtrl($scope, $rootScope, services) {
		
		// Footing
		
		$scope.footing = {};
		$scope.footing.byUnit = {};
		
		$scope.footingValuesChanged = function() {
			$scope.footing.volume = calculateVolume($scope.footing.length, $scope.footing.width, $scope.footing.thickness);
			if($scope.footing.quantity){
				$scope.footingValuesByUnit();
			}
		}
		
		$scope.footingValuesByUnit = function() {
			$scope.footing.byUnit.volume = +($scope.footing.volume * $scope.footing.quantity).toFixed(2);
			$scope.footing.byUnit.cementNumber = Math.ceil($scope.footing.byUnit.volume * 9);
			$scope.footing.byUnit.sandNumber = +($scope.footing.byUnit.volume * 0.5).toFixed(1);
			$scope.footing.byUnit.gravelNumber = +($scope.footing.byUnit.volume * 1).toFixed(1);
		}
		
		// Wall Footing
		
		$scope.wlFooting = {};
		
		$scope.wlFootingValuesChanged = function() {
			if($scope.wlFooting.length && $scope.wlFooting.width && $scope.wlFooting.thickness){
				$scope.wlFooting.volume = calculateVolume($scope.wlFooting.length, $scope.wlFooting.width, $scope.wlFooting.thickness);
				$scope.wlFooting.cementNumber = Math.ceil($scope.wlFooting.volume * 9);
				$scope.wlFooting.sandNumber = +($scope.wlFooting.volume * 0.5).toFixed(1);
				$scope.wlFooting.gravelNumber = +($scope.wlFooting.volume * 1).toFixed(1);
			}
		}
		
		function calculateVolume (length, width, height) {
			return (length * width * height);
		}
		
	}
	
})();