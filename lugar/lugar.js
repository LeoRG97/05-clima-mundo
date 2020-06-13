const axios = require('axios');
const apiKey = 'WNwzSEBF61ozbz4RldA8GJ6RXKALWkUr';
const cityUri = 'http://dataservice.accuweather.com/locations/v1/cities/search';
const weatherUri = 'http://dataservice.accuweather.com/currentconditions/v1';

const getLugarLatLng = async (city) => {

    const encodedUrl = encodeURI(city);

    const instance = axios.create({
        baseURL: `${cityUri}?apikey=${apiKey}&q=${encodedUrl}`,
    });

    const resp = await instance.get();

    if(resp.data.length === 0){
        throw new Error(`No hay resultados para ${direccion}`);
    } 
    const data = resp.data[0];
    const key = data.Key;
    const direccion = data.EnglishName;
    const lat = data.GeoPosition.Latitude;
    const lng = data.GeoPosition.Longitude;

    return {
        key,
        direccion,
        lat,
        lng,
    };

}

const getClima = async (key) => {
    const instance = axios.create({
        baseURL: `${weatherUri}/${key}?apikey=${apiKey}`,
    });

    const resp = await instance.get();

    if(resp.data.length === 0){
        throw new Error(`No hay resultados para ${direccion}`);
    } 
    
    const data = resp.data[0];

    const weather = data.WeatherText;
    const temperature = data.Temperature.Metric.Value;
    return {
        weather,
        temperature,
    };
}

module.exports = {
    getLugarLatLng,
    getClima,
};

