(function() {
'use strict';

angular.module('app').controller('mainCtrl', function (NgMap, dataServicePlace, dataServiceYelp) {
	
	var vm = this;
	var markers = [];
	var selectedMarker = {};
	
	// Hide unusable buttons
	function hideButtons() {

		var savePlace = document.getElementById("save-place");
		var deletePlace = document.getElementById("delete-place");
		
		savePlace.style.display = "none";
		deletePlace.style.display = "none";
	};
	
	function displaySaveButton() {

		var savePlace = document.getElementById("save-place");
		
		savePlace.style.display = "inline-block";
	};
	
	function displayDeleteButton() {
		var deletePlace = document.getElementById("delete-place");
		
		deletePlace.style.display = "inline-block";
	};
	
	function hideYelpInfo() {
		var yelpInfo = document.getElementById("yelp-info");
		
		yelpInfo.style.display = "none";
	};
	
	function displayYelpInfo() {
		var yelpInfo = document.getElementById("yelp-info");
		
		yelpInfo.style.display = "block";
	}
	
	function displayYelpBusiness (data) {
		console.log('reached displayYelpBusiness');
		
		var total = data.total;
		var name = "Not available";
		var rating;
		var is_closed;
		var review_count;
		var price;
		var url;
		
		console.log('total = ' + total);
		if (total > 0) {
			displayYelpInfo();
			
			vm.name   = data.businesses[0].name;
			vm.rating = data.businesses[0].rating;
			vm.is_closed = data.businesses[0].is_closed;
			vm.review_count = data.businesses[0].review_count;
			vm.price = data.businesses[0].price;
			vm.url = data.businesses[0].url;
		}
	};
	
	function getYelpBusiness () {
		
		var title = selectedMarker.title;
		var lat = selectedMarker.position.lat();
		var lng = selectedMarker.position.lng();
		
		dataServiceYelp.getYelp( title, lat, lng, function(res) {
			var data = res.data;
			console.log('reached mainCtrl getYelp: ' + data);
			displayYelpBusiness(data);
		}, function(error) {
			vm.failure = true;
			vm.errorMessages = error.data.errors;
		});
	};
	
	vm.getAll = function() {
		NgMap.getMap().then( function(map) {
			
			dataServicePlace.getAll( function(res) {
				
				clearMarkers();
				
				console.log('reached getAll response: ' + JSON.stringify(res));
				var data = res.data;
				
				// For each marker, get the icon, name and location.
				var bounds = new google.maps.LatLngBounds();
				var marker;
				
				for (var i = 0; i < data.length; i++) {
					
					var icon = {
						url: data[i].icon.url,
						size: new google.maps.Size(71, 71),
						origin: new google.maps.Point(0, 0),
						anchor: new google.maps.Point(17, 34),
						scaledSize: new google.maps.Size(25, 25)
					};
					
					marker = new google.maps.Marker({
						map: map,
						icon: icon,
						title: data[i].title,
						animation: null,
						position: data[i].position
					}); 
					
					markers.push(marker);
					console.log('position: ' + data.position);
					bounds.extend(data[i].position);
					
					// Add a listener to toggle bounce
					marker.addListener('click', function() {
						
						// Select marker, deselect all others.
						clearBounce();
						this.setAnimation(google.maps.Animation.BOUNCE);
						displayDeleteButton();
						
						// currently selected marker
						selectedMarker.position  = this.getPosition();
						selectedMarker.title = this.getTitle();
						selectedMarker.icon = this.getIcon();
						
						// get the Yelp reviews
						getYelpBusiness();
					});
				}
				
				map.fitBounds(bounds);
				
				// hide unusable buttons
				hideButtons();
				hideYelpInfo();
			});
		});
	};
		
	vm.postPlace = function() {
		console.log("post place : " + selectedMarker);
		
		dataServicePlace.postPlace(selectedMarker, function(res) {
			hideButtons();
		}, function(error) {
			vm.failure = true;
			vm.errorMessages = error.data.errors;
		});
	};
			
	vm.deletePlace = function() {
		console.log('reached MainCtrl deletePlace');
		console.log("post place : " + selectedMarker);
		
		dataServicePlace.deletePlace(selectedMarker, function(res) {
			vm.getAll();
		}, function(error) {
			vm.failure = true;
			vm.errorMessages = error.data.errors;
		});
	};
			
	// Mark searchResults places
	function searchResults(results, status) {

		if (status === google.maps.places.PlacesServiceStatus.OK) {
			for (var i = 0; i < results.length; i++) {
				createMarker(results[i]);
			}
		}
	};

	// Create a Marker
	function createMarker(place) {
		var marker = new google.maps.Marker();
	};

	// Clear bouncing marker
	function clearBounce() {
		
		selectedMarker = {};
		
		markers.forEach(function(marker) {
			if (marker.getAnimation() !== null) {
				marker.setAnimation(null);
			} 
		});
	};
	
	// Clear out the old markers.
	function clearMarkers() {
		var marker;
		
		markers.forEach(function(marker) {
			marker.setMap(null);
		});
		markers = [];
	};

	NgMap.getMap().then( function(map) {
		
		// get the location 
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition( function (currentPosition) {
				console.log('lat: ' + currentPosition.coords.latitude);
				console.log('lng: ' + currentPosition.coords.longitude);
            var pos = {
              lat: currentPosition.coords.latitude,
              lng: currentPosition.coords.longitude
            };
            map.setCenter(pos);
			map.setZoom(12);
			});
		}
 
		// Create the search box and link it to the UI element.
		var input = document.getElementById('searchbox-input');
		var searchBox = new google.maps.places.SearchBox(input);
		map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
		
		// Bias the SearchBox results towards current map's viewport.
		map.addListener('bounds_changed', function() {
			searchBox.setBounds(map.getBounds());
		});

		// Listen for the event fired when the user selects a prediction and retrieve
		// more details for that place.
		searchBox.addListener('places_changed', function() {
			var places = searchBox.getPlaces();

			if (places.length == 0) {
				return;
			}
	         
			// Clear out the old markers
			clearMarkers();
			
			// For each place, get the icon, name and location.
			var bounds = new google.maps.LatLngBounds();
			
			places.forEach(function(place) {
				
				if (!place.geometry) {
					console.log("Returned place contains no geometry");
					return;
				}

				var icon = {
					url: place.icon,
					size: new google.maps.Size(71, 71),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(17, 34),
					scaledSize: new google.maps.Size(25, 25)
				};

				var marker = new google.maps.Marker({
					map: map,
					icon: icon,
					title: place.name,
					animation: null,
					position: place.geometry.location
				}); 
				
				// Create a marker for each place.
				markers.push(marker);
				
				// Add a listener to toggle bounce
				marker.addListener('click', function() {
					
					// Select marker, deselect all others.
					clearBounce();
					this.setAnimation(google.maps.Animation.BOUNCE);
					displaySaveButton();
					
					// currently selected marker
					selectedMarker.position  = this.getPosition();
					selectedMarker.title = this.getTitle();
					selectedMarker.icon = this.getIcon();
					
					// get the Yelp reviews
					getYelpBusiness();
				});
		
				if (place.geometry.viewport) {
					
					// Only geocodes have viewport.
					bounds.union(place.geometry.viewport);
				} else {
					bounds.extend(place.geometry.location);
				}
			});
			
			map.fitBounds(bounds);
			
			// hide unusable buttons
			hideButtons();
			hideYelpInfo();
		});
	});
});

})();