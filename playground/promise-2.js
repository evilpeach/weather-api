const request = require('request');

const geocodeAddres = (address) => {
  return new Promise((resolve, reject) => {
    const encoedAddress = encodeURIComponent(address);
    const key = 'vaaNze52fTeuUyGkKqJsprvjoEK5sUl8';
  
    request({
      url: `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${encoedAddress}`,
      json: true
    }, (error, response, body) => {
      if(error) {
        reject('Unable to connect to map server.');
      } else if(body.statuscode === 0 || 200) {
        resolve({
          address: body.results[0].providedLocation.location,
          latitude: body.results[0].locations[0].latLng.lat,
          longitude: body.results[0].locations[0].latLng.lng
        });
      } else {
        reject('Somthing went wrong.');
      }
    });
  })
}

geocodeAddres('12940').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});