(function(){
	
	'use strict';
	
	angular
		.module('angularseed')
		.config(config)
		.run(run)

	function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
		
		$urlRouterProvider.when('', '/home');
		$urlRouterProvider.otherwise("/404");

		$ocLazyLoadProvider.config({
			debug: false
		});

		$stateProvider
			.state('404', {
				url: "/404",
				templateUrl: "app/views/404.html",
				data: { pageTitle: '404 Not Found', specialClass: 'gray-bg' }
			})
			.state('restricted', {
				url: "/restricted",
				templateUrl: "app/views/restricted.html",
				data: { pageTitle: 'Restricted', specialClass: 'gray-bg' }
			})
			.state('index', {
				url: "/home",
				templateUrl: "app/views/dashboard.html",
				data: { pageTitle: 'Home' },
				resolve: {
					loadPlugin: function ($ocLazyLoad) {
						return $ocLazyLoad.load([
							{
								 files: ['assets/js/plugins/moment/moment.min.js']
							}
						]);
					}
				},
				controller: 'homeCtrl'
			})
	}

	function run($rootScope, $state, $location, $cookieStore, authenticate) {
		$rootScope.$state = $state;
		$rootScope.globals = $cookieStore.get('globals') || {};
	}
	
})();