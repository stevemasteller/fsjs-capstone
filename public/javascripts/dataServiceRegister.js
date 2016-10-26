(function() {
'use strict';

angular.module('app').service('dataServiceRegister', function($http) {
		
	var vm = this;
	
	vm.postNewUser = function(data, callback, err) {
		console.log('reached dataServiceRegister ' + data.name);
		console.log('reached dataServiceRegister ' + data.emailAddress);
		$http.post('/api/users/', data).then(callback, err);
     };
	 
});

})();