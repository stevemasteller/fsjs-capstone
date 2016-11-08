(function() {
  'use strict';

	/** The Angular $routeProvider is used to configure routes for the application. */

	angular
		.module('app')
		.config(config);

	function config($routeProvider) {
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
			controller: 'mainCtrl',
			controllerAs: 'vm',
			templateUrl: 'views/main.html'
		});
	}
})();
