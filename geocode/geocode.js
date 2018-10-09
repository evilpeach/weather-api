const request = require('request');

let geocodeAddress = (address, callback) => {
  const encoedAddress = encodeURIComponent(address);
  // console.log(encoedAddress);
  const key = 'vaaNze52fTeuUyGkKqJsprvjoEK5sUl8';

  request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${encoedAddress}`,
    json: true
  }, (error, response, body) => {
    if(error) {
      callback('Unable to connect to map server.');
    } else if(body.statuscode === 0 || 200) {
      callback(undefined, {
        address: body.results[0].providedLocation.location,
        latitude: body.results[0].locations[0].latLng.lat,
        longitude: body.results[0].locations[0].latLng.lng
      });
    } else {
      callback('Somthing went wrong.');
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;