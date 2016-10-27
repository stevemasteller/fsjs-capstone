(function() {
'use strict';

angular.module('app').service('dataServicePlace', function($http) {
		
	var vm = this;
	
	vm.postHome = function(data, callback, err) {
		console.log('reached dataServicePlace putHome');
		$http.post('/api/place/home', data).then(callback, err);
	};
	 
});

})();