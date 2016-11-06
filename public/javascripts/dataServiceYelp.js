(function() {
'use strict';

angular.module('app').service('dataServiceYelp', function($http) {
		
	var vm = this;
	
/*	var accessParams = {
		grant_type: "client_credentials",
		client_id: "d8KeA8WtUkeUvTK9GOTIRA",
		client_secret: "1ylhinIz2LmfjakzifyzqSW9nfPoFd8B6gelKC3zo8ym1dmkFdquGMkP0daxnqdr"
	}
	
    vm.getYelpAccessToken = function(res, err) {
	  console.log('Executing Yelp Access Token');
      $http.post('https://api.yelp.com/oauth2/token', accessParams).then(res, err);
		console.log('Yelp access token: ' + res);
     }; */

/*    this.getISS = function(callback, failure) {
      $http.jsonp('http://api.open-notify.org/iss-now.json?callback=JSON_CALLBACK')
           .then(callback, failure);
     };*/
	 
//	curl -H "Authorization: Bearer RsT5OjbzRn430zqMLgV3Ia" \
//	https://api.oauth2server.com/1/me
	

	vm.getYelpAccessToken = function(callback, err) {
		console.log('reached dataServiceYelp getYelpAccessToken');
		
/*		$http.jsonp('//api.yelp.com/v3/autocomplete?text=del&latitude=37.786882&longitude=-122.399972', { 
	headers: {'Authorization': 'Bearer Xn6rcZrQTdEmV5JFNsTcnot78sESXc7P0-tbBFID8filvrfm49eXACastEejl1avhdE_SgVW0sgosL3gtGF-kMMoGgiiNoBnI0rj7CfPuS-z2B6Cxvqr7lRheUUeWHYx'}})
			.then(callback, err);
	};*/
	 
		$http({method: 'GET', url: '//api.yelp.com/v3/autocomplete?text=del&latitude=37.786882&longitude=-122.399972', headers: {'Authorization': 'Bearer Xn6rcZrQTdEmV5JFNsTcnot78sESXc7P0-tbBFID8filvrfm49eXACastEejl1avhdE_SgVW0sgosL3gtGF-kMMoGgiiNoBnI0rj7CfPuS-z2B6Cxvqr7lRheUUeWHYx'}})
			.then(callback, err);
	};
	
/*	vm.postPlace = function(data, callback, err) {
		$http.post('/api/place/', data).then(callback, err);
	};
	 
	vm.deletePlace = function(data, callback, err) {
		console.log('reached dataServicePlace deletePlace');
		$http.put('/api/place/', data).then(callback, err);
	};
*/	 
});

})();