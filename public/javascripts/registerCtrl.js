(function() {
'use strict';

angular.module('app').controller('registerCtrl', function(dataServiceRegister, $location) {

	var vm = this;
	
	vm.user = {};
	vm.postNewUser = function() {
		console.log('reached registerCtrl postNewUser');
		dataServiceRegister.postNewUser(vm, function(res) {
			
/*			var currentUser = sessionService.currentUser;
	
			// set the email address and password on the current user
			// so that the data service has access to these values
			currentUser.emailAddress = emailAddress;
			currentUser.password = password;
			*/
			$location.path('/main.html');
		}, function(error) {
			vm.failure = true;
			vm.errorMessages = error.data.errors;
		});
	};
});

})();