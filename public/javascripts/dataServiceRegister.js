(function() {
'use strict';

angular.module('app').service('dataServiceRegister', function($http) {
		
	var vm = this;
	
	vm.postNewUser = function(data, callback, err) {
		$http.post('/api/users/', data).then(callback, err);
     };
	 
});

})();