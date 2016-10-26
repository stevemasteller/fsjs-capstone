(function() {
'use strict';

angular.module('app').controller('registerCtrl', function(dataServiceRegister, $location) {

	var vm = this;
	
	vm.user = {};
	vm.postNewUser = function() {
		console.log('reached registerCtrl postNewUser');
		dataServiceRegister.postNewUser(vm, function(res) {
			$location.path('/main.html');
		}, function(error) {
			vm.failure = true;
			vm.errorMessages = error.data.errors;
		});
	};
});

})();