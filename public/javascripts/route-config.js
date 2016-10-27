(function() {
  'use strict';

	/** The Angular $routeProvider is used to configure routes for the application. */

	angular
		.module('app')
		.config(config);

	function config($routeProvider) {
		console.log('reached route-config');
		$routeProvider
		.when('/', {
			controller: '',
			controllerAs: '',
			templateUrl: 'views/home.html'
		})
		.when('/register.html', {
			controller: 'registerCtrl',
			controllerAs: 'vm',
			templateUrl: 'views/register.html'
		})
		.when('/main.html', {
			controller: '',
			controllerAs: '',
			templateUrl: 'views/main.html'
		});
	}
})();
