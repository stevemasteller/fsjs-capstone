(function() {
  'use strict';

	angular.module('app', ['ngRoute', 'uiGmapgoogle-maps'])
		
	.config(function(uiGmapGoogleMapApiProvider) {
		uiGmapGoogleMapApiProvider.configure({
		key: 'AIzaSyA093hUHMNfOZrtRIFcyWBLJvQESyQUP18',
		v: '3.17',
		libraries: 'places'
		});
	});
})();
