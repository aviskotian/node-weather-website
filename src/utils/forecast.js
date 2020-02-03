const request = require('request');



const forecast = (latitude, longitude, callback) =>{
    const url = `https://api.darksky.net/forecast/e88eaf180135c7d40a89373f07e0cd42/${latitude},${longitude}`;

    request({ url, json: true },(error, { body }) => {  //Property shorthand and Object Destructuring used url:url to url and reponse.body to {body}
        if(error){
            callback('Unable to connect to weather service!', undefined);
        } else if(body.error){
            callback('Unable to find location', undefined);
        } else {
            const temp =  body.currently.temperature;
            const tempLow = body.daily.data[0].temperatureLow;
            const tempHigh = body.daily.data[0].temperatureHigh;
            const preciptation = body.currently.precipProbability;
            callback(undefined,`${body.daily.data[0].summary} It is currently ${temp} degrees out. There is a ${preciptation}% chance of rain. Today's Low Temperature is ${tempLow} and High temperature is ${tempHigh}` )
        }
    })

}

module.exports = forecast;