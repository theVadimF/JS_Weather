import './styles.css'
import 'normalize.css'
import 'line-awesome/dist/line-awesome/css/line-awesome.css'

// TODO(vf) Move to github secrets
import {API_KEY} from './secret'
let units: string = "metric"

const today_temp = document.getElementById('today-temp');
const today_cond = document.getElementById('today-condition');
const location = document.getElementById('location');
const min_temp = document.getElementById('min-temp');
const max_temp = document.getElementById('max-temp');
const feels_like = document.getElementById('feels-like');
const wind_speed = document.getElementById('wind-speed')
const precipitation = document.getElementById('precipitation');
const pressure = document.getElementById('pressure');
const uv = document.getElementById('uv');

const temp_units = document.querySelectorAll('.temp-unit');

function update_ui(weather: any, units: string) {
  location.textContent = weather.location.name;
  if (units == 'c') {
    temp_units.forEach((unit) => {
      unit.textContent = "°C";
    })
    today_temp.textContent = weather.current.temp_c;
    min_temp.textContent = weather.forecast.forecastday[0].day.mintemp_c;
    max_temp.textContent = weather.forecast.forecastday[0].day.maxtemp_c;
    feels_like.textContent = weather.current.feelslike_c;
    wind_speed.textContent = weather.current.wind_kph + ' km/h';
    precipitation.textContent = weather.current.precip_mm + ' mm';
    pressure.textContent = weather.current.pressure_mb + ' hPa';
  } else {
    temp_units.forEach((unit) => {
      unit.textContent = "°F";
    })
    today_temp.textContent = weather.current.temp_f;
    min_temp.textContent = weather.forecast.forecastday[0].day.mintemp_f;
    max_temp.textContent = weather.forecast.forecastday[0].day.maxtemp_f;
    feels_like.textContent = weather.current.feelslike_f;
    wind_speed.textContent = weather.current.wind_mph + ' mp/h';
    precipitation.textContent = weather.current.precip_in + ' in';
    pressure.textContent = weather.current.pressure_in + ' in'; // TODO(vf) unit
  }
  today_cond.textContent = weather.current.condition.text;
  uv.textContent = weather.current.uv;

}

async function get_weather(location: string) {
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3&aqi=no&alerts=no`, {mode: 'cors'});
    const weather = await response.json();
    return weather;
  } catch(err) {
    console.error(err);
  }
}

// async function get_weather(lat: number, lon: number) {
//   try {
//     const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`);
//     const weather = await response.json();
//     // console.log(weather);
//     return weather;
//   } catch(err) {
//     console.error(err);
//   }
// }

// async function get_weather_by_name(name: string) {
//   try {
//     const location = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${API_KEY}`);
//     const data = await location.json();
//     if (data.length != 0) {
//       // console.log(data[0]);
//       return await get_weather(data[0].lat, data[0].lon);
//     } else {
//       throw new Error("Location not found")
//     }
//   } catch(err) {
//     console.error(err);
//   }
// }


// TODO(vf) Detect if city not found
get_weather('novosibirsk')
  .then((weather) => {
    console.log(weather);
    update_ui(weather, 'c');
  });
// get_weather_by_name('ijkegregrijgriojegr')
