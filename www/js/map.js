var myMap;
var locationLayer;
var audioLayer

var locationMarkers = [];
var locationInfos = [];

var audioMakers = [];
var audioInfos = [];

var styles = [
   {
     featureType: "poi",
     stylers: [
      { visibility: "off" }
     ]   
    }
];

var styledMap = new google.maps.StyledMapType(styles,{name: 'map_style'});

function initializeNearbyAudioMap() {
  var mapOptions = {
    zoom: 18,
    center: new google.maps.LatLng(Number(myPosition.coords.latitude), Number(myPosition.coords.longitude) ),
    disableDefaultUI: true
  };
  myMap = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  myMap.mapTypes.set('map_style', styledMap);
  myMap.setMapTypeId('map_style');

  google.maps.event.addListenerOnce(myMap, 'idle', function(){
      // do something only the first time the map is loaded
      addAudioToMap(recordings);
      addLocsToMap(nearbyLocations);
  });
}

function addAudioToMap(pinArray) {
  console.log('adding ' + recordings.length + ' recs to map');

  audioLayer = {"locations": [] };

  for (var i = 0; i < recordings.length; i++) {
    if ( typeof(recordings[i].lat) !== 'undefined' ) {
      console.log(recordings[i].location);
      audioLayer.locations.push([recordings[i].location, Number(recordings[i].lat), Number(recordings[i].lng) ])
    }
  }

  setMarkers(myMap, audioLayer.locations, true);

}

function addLocsToMap(locs) {
  console.log('we have ' + nearbyLocations.length + ' nearby locations');

  locationLayer = {"locations": [] };

  for (var i = 0; i < nearbyLocations.length; i++) {
    audioLayer.locations.push([nearbyLocations[i].name, nearbyLocations[i].location.lat, nearbyLocations[i].location.lng ])
  }

  // myMap.data = audioLayer;
  // setMarkers(myMap, locationLayer.locations);
}


function setMarkers(map, locations, isAudio) {

  locationInfos = [];
  locationMarkers = [];

  for (var i = 0; i < locations.length; i++) {
    var loc = locations[i];
    var myLatLng = new google.maps.LatLng(loc[1], loc[2]);
    locationMarkers.push ( new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: loc[0],
      index: i
    }) );

    locationInfos.push(new google.maps.InfoWindow({
      content: loc[0]
    }) );

    google.maps.event.addListener(locationMarkers[i], 'mousedown', function() {
      var self = this;
      for (var j = 0; j < locationInfos.length; j++) {
        locationInfos[j].close();
      }
      locationInfos[this.index].open(map,this);

      // if it's audio, play on click
      if (isAudio) {

        function isThisLocation(element) {
          console.log(element.location, self.title);
          return element.location === self.title;
        }

        var recordingsFromThisLocation = recordings.filter(isThisLocation);
        console.log('there are ' + recordingsFromThisLocation.length + ' recordings made here');
        playSound(recordingsFromThisLocation[0].audioFile);
      }
    });

  } // end for loop

  console.log('made ' + locationInfos.length + ' infoWindows');
}