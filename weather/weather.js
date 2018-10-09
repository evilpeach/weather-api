const request = require('request');

const getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/ca93bf4fb90a469d1378d4af172efd67/${lat},${lng}`,
    json: true
  },(error, response, body) => {
    if(!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to connect to darksky.');
    }
  });
}

module.exports.getWeather = getWeather;