const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand:true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

const encoedAddress = encodeURIComponent(argv.address);
const key = 'vaaNze52fTeuUyGkKqJsprvjoEK5sUl8';
const geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${encoedAddress}`;

axios.get(geocodeUrl).then((response) => {
  if(response.data.status === 0) {
    throw new Error('Unable to find that address.');
  }
  
  let lat = response.data.results[0].locations[0].latLng.lat;
  let lng = response.data.results[0].locations[0].latLng.lng;
  console.log(response.data.results[0].providedLocation.location); 
  
  const weatherUrl = `https://api.darksky.net/forecast/ca93bf4fb90a469d1378d4af172efd67/${lat},${lng}`;
  return axios.get(weatherUrl);
}).then((response) => {
  let temperature = response.data.currently.temperature;
  let apparentTemperature = response.data.currently.apparentTemperature;

  console.log(`it's currently ${temperature}. It's feel like ${apparentTemperature}.`);
}).catch((e) => {
  if(e.response.status === 404) console.log('Unable to find server.');
  else console.log(e.message);
});
