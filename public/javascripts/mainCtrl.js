(function() {
'use strict';

angular.module('app').controller('mainCtrl', function (NgMap, dataServicePlace) {
	
	var vm = this;
	var markers = [];
	var selectedMarker = {};
	
	console.log('reached mainCtrl');


	vm.getPlaces = function() {
		NgMap.getMap().then( function(map) {
			
			console.log('reached mainCtrl getAll');
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
						
						// currently selected marker
						selectedMarker.position  = this.getPosition();
						selectedMarker.title = this.getTitle();
						selectedMarker.icon = this.getIcon();
					});
				}
				
				map.fitBounds(bounds);
			});
		});
	};
		
	vm.postHome = function() {
		console.log('reached mainCtrl postHome');
		console.log('selectedMarker: ' + JSON.stringify(selectedMarker));
		dataServicePlace.postHome(selectedMarker, function(res) {
//			$location.path('/main.html');
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

		console.log('reached NgMap');
		
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
					
					// currently selected marker
					selectedMarker.position  = this.getPosition();
					selectedMarker.title = this.getTitle();
					selectedMarker.icon = this.getIcon();
				});
		
				if (place.geometry.viewport) {
					
					// Only geocodes have viewport.
					bounds.union(place.geometry.viewport);
				} else {
					bounds.extend(place.geometry.location);
				}
			});
			
			map.fitBounds(bounds);
		});
	});

});
})();