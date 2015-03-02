var fourSquare = new CC.CordovaFoursquare();
console.log(fourSquare);

function login2FourSquare() {
  fourSquare.login('FOURSQID', 'FOURSQSECRET', 
    'com.phonegap.whereimat://foursquare', // should have a uri structure with scheme and domain
    fourSqSuccess, fourSqFailure);
}

function fourSqSuccess(e) {
  alert('success logging in');
}

function fourSqFailure(e) {
  alert('failed to fourSquare');
}