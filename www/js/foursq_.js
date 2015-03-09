// var fourSquare = new CC.CordovaFoursquare();
// console.log(fourSquare);

// function login2FourSquare() {
//   fourSquare.login('FOURSQID', 'FOURSQSECRET', 
//     'com.phonegap.whereimat://foursquare', // should have a uri structure with scheme and domain
//     fourSqSuccess, fourSqFailure);
// }

// function fourSqSuccess(e) {
//   alert('success logging in');
// }

// function fourSqFailure(e) {
//   alert('failed to fourSquare');
// }

function getNearbyLocations(lat, lng, query) {
  var client = FOURSQID;
  var secret = FOURSQSECRET;
  var url = 'https://api.foursquare.com/v2/venues/search?client_id='+client+'&client_secret='+secret+'&v=20130815&ll='+lat+','+lng;
  if (typeof(query) !== 'undefined') {
    url = url + '&query=' + query;
  }

  // update nearbyLocations 
  $.getJSON( url , function gotLocations(data) {
    var venues = data.response.venues;
    nearbyLocations = venues.map(function(venue) {return venue});

    // update the index with new locations
    addLocations(nearbyLocations);
  });
}

function logHi() {
  alert('fsq loaded');
  console.log('hello fourSquare');
}

// $.ajax({
//   dataType: "json",
//   url: url,
//   data: data,
//   success: success,
//   error: 
// });