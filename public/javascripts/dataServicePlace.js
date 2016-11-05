(function() {
'use strict';

angular.module('app').service('dataServicePlace', function($http) {
		
	var vm = this;
	
	vm.getAll = function(callback, err) {
		$http.get('/api/place').then(callback, err);
	};
	 
	vm.postPlace = function(data, callback, err) {
		$http.post('/api/place/', data).then(callback, err);
	};
	 
	vm.deletePlace = function(data, callback, err) {
		console.log('reached dataServicePlace deletePlace');
		$http.put('/api/place/', data).then(callback, err);
	};
	 
});

})();