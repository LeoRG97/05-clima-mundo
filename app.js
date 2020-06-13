const argv = require('./config/yargs').argv;
const lugar = require('./lugar/lugar');

const getInfo = async (direccion) => {

    try {
        let cityData = await lugar.getLugarLatLng(direccion);
        let weatherData = await lugar.getClima(cityData.key);
        return `El clima de ${cityData.direccion} es ${weatherData.temperature} °C`;
    } catch (error) {
        return `No se pudo determinar el clima de ${direccion}`;
    }




};

getInfo(argv.direccion).then(res => {
    console.log(res);
}).catch(err => {
    // console.log('ERROR', err);
});






