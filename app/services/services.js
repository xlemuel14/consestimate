(function(){
	
    'use strict';
	
	angular
		.module('angularseed')
		.factory('services', ['$http', '$timeout', services])
		.service('authenticate', authenticate)

	function services($http, $timeout){
		var serviceBase = 'api/'
		var obj = {};

		obj.login = function(username, password){
			return $http.get(serviceBase + 'login?username=' + username + '&password=' + password); 
		}
		
		obj.getCredentials = function(id){
			return $http.get(serviceBase + 'getCredentials?id=' + id); 
		}

		obj.changePassword = function(change){
			return $http.post(serviceBase + 'changePassword', change).then(function(results){
				return results.data;
			});
		}
		
		obj.checkUsername = function(username, requestType){
			return $http.get(serviceBase + 'checkUsername?username=' + username + '&requestType=' + requestType).then(function(results){
				return results.data;
			});
		}

		obj.getUsers = function(){
			return $http.get(serviceBase + 'getUsers'); 
		}
		
		obj.getUsersRequests = function(){
			return $http.get(serviceBase + 'getUsersRequests'); 
		}

		obj.insertUserRequest = function(user) {
			return $http.post(serviceBase + 'insertUserRequest', user).then(function(results){
				return results.data;
			});
		}
		
		obj.removeFromPending = function(requestUserId){
			return $http.get(serviceBase + 'removeFromPending?requestUserId=' + requestUserId).then(function(results){
				return results.data;
			});
		}
		
		obj.insertUser = function(user) {
			return $http.post(serviceBase + 'insertUser', user).then(function (results){
				return results.data;
			});
		}

		obj.updateUserStat = function(user_id, stat) {
			return $http.get(serviceBase + 'updateUserStat?user_id=' + user_id + '&stat=' + stat).then(function(results){
				return results.data;
			});
		}

		obj.updateUser = function(user) {
			return $http.post(serviceBase + 'updateUser', user).then(function(results){
				return results.data;
			});
		}

		obj.deleteUser = function(user_id){
			return $http.get(serviceBase + 'deleteUser?user_id=' + user_id).then(function(results){
				return results.data;
			});
		}

		obj.sendMail = function(user){
			return $http.post(serviceBase + 'sendMail', user).then(function(results){
				return results.data;
			});
		}
		
		obj.getServerTimeService = function(){
			return $http.get(serviceBase + 'getServerTimeService').then(function(results){
				return results.data;
			}); 
		}

		return obj;
		 
	}

	function authenticate(){	
		return {
			isAuthenticated: function(userType, location){
				if(location=='/maintenance/users'){
					if(userType == 0)
						return true;
					else
						return false;
				}
				return true;
			}
		};
	}
	
})();