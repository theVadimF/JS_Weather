import './styles.css'
import 'normalize.css'
import 'line-awesome/dist/line-awesome/css/line-awesome.css'

// TODO(vf) Move to github secrets
import {API_KEY} from './secret'
let metric_unit: boolean = true;
let location_name = 'Novosibirsk';
let weather_data: any = null;

// Buttons
const search = document.getElementById('search');
const close_btn = document.getElementById('close-btn');
const submit_btn = document.getElementById('submit-btn');
const reload = document.getElementById('reload');
const swap_units = document.getElementById('swap-units');

// UI Elements
const overlay = document.getElementById('overlay');
const location_input = (<HTMLInputElement>document.getElementById('location-input'));
const error_text = document.getElementById('location-error');

// Weather Now
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
const today_icon = document.getElementById('today-icon');
const top_temp = document.getElementById('top-temp');

search.addEventListener('click', () => {
  error_text.textContent = "";
  location_input.value = "";
  overlay.classList.remove('hidden');
})

close_btn.addEventListener('click', () => {
  overlay.classList.add('hidden')
})

reload.addEventListener('click', () => {
  load_weather();
})

swap_units.addEventListener('click', () => {
  if (weather_data !== null && !("error" in weather_data)) {
    if (metric_unit) {
      metric_unit = false;
    } else {
      metric_unit = true;
    }
    update_ui(weather_data, metric_unit);
  }
})

submit_btn.addEventListener('click', () => {
  if (location_input.value.length != 0) {
    location_name = location_input.value;
    location.textContent = location_name;
    load_weather();
    overlay.classList.add('hidden');
  } else {
    error_text.textContent = "Location can't be blank"
  }
})

function update_ui(weather: any, metric_unit: boolean) {
  location.textContent = weather.location.name;
  if (metric_unit) {
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
    pressure.textContent = weather.current.pressure_in + ' inHg';
  }
  today_cond.textContent = weather.current.condition.text;
  uv.textContent = weather.current.uv;
  set_icon(weather.current.condition.code);
}

function ui_na() {
  top_temp.textContent = "";
  today_temp.textContent = "N/A";
  min_temp.textContent = "N/A";
  max_temp.textContent = "N/A";
  feels_like.textContent = "N/A";
  wind_speed.textContent = "N/A";
  precipitation.textContent = "N/A";
  pressure.textContent = "N/A";
  today_cond.textContent = "N/A";
  uv.textContent = "N/A";
}

function display_error(err: string) {
  ui_na();
  reset_icon();
  today_temp.textContent = 'Error';
  today_cond.textContent = err;
  today_icon.classList.add('la-exclamation-triangle');
}

function display_updating() {
  ui_na();
  reset_icon();
  today_temp.textContent = 'Updating...';
  today_cond.textContent = 'Please wait';
  today_icon.classList.add('la-sync');
}

function set_icon(code: number) {
  reset_icon();
  switch(code) {
    case 1000: {  // Sunny
      today_icon.classList.add('la-sun');
      break;
    }
    case 1003: {  // Partly cloudy
      today_icon.classList.add('la-cloud-sun');
      break;
    }
    case 1006: {  // Cloudy
      today_icon.classList.add('la-cloud');
      break;
    }
    case 1009: {  // Overcast
      today_icon.classList.add('la-cloud');
      break;
    }
    case 1030: {  // Mist
      today_icon.classList.add('la-water');
      break;
    }
    case 1063: {  // Patchy rain possible
      today_icon.classList.add('la-cloud-rain');
      break;
    }
    case 1066: {  // Patchy snow possible
      today_icon.classList.add('la-snowflake');
      break;
    }
    case 1069: {  // Patchy sleet possible
      today_icon.classList.add('la-cloud-meatball');
      break;
    }
    case 1072: {  // Patchy freezing drizzle possible
      today_icon.classList.add('la-cloud-rain');
      break;
    }
    case 1087: {  // Thundery outbreaks possible
      today_icon.classList.add('la-bolt');
      break;
    }
    case 1114: {  // Blowing snow
      today_icon.classList.add('la-snowflake');
      break;
    }
    case 1117: {  // Blizzard
      today_icon.classList.add('la-cloud-rain');
      break;
    }
    case 1135: {  // Fog
      today_icon.classList.add('la-smog');
      break;
    }
    case 1147: {  // Fog
      today_icon.classList.add('la-smog');
      break;
    }
    case 1150: {  // Patchy light drizzle
      today_icon.classList.add('la-cloud-rain');
      break;
    }
    case 1153: {  // light drizzle
      today_icon.classList.add('la-cloud-rain');
      break;
    }
    case 1168: {  // freezing drizzle
      today_icon.classList.add('la-cloud-rain');
      break;
    }
    case 1180: {  // Patchy light rain
      today_icon.classList.add('la-cloud-rain');
      break;
    }
    case 1183: {  // light rain
      today_icon.classList.add('la-cloud-rain');
      break;
    }
    case 1186: {  // Moderate rain at times
      today_icon.classList.add('la-cloud-rain');
      break;
    }
    case 1189: {  // Moderate rain
      today_icon.classList.add('la-cloud-rain');
      break;
    }
    case 1192: {  // Heavy rain
      today_icon.classList.add('la-cloud-showers-heavy');
      break;
    }
    case 1195: {  // Heavy rain
      today_icon.classList.add('la-cloud-showers-heavy');
      break;
    }
    case 1198: {  // Moderate rain
      today_icon.classList.add('la-cloud-rain');
      break;
    }
    case 1201: {  // Heavy rain
      today_icon.classList.add('la-cloud-showers-heavy');
      break;
    }
    case 1204: {  // sleet
      today_icon.classList.add('la-cloud-meatball');
      break;
    }
    case 1207: {  // sleet
      today_icon.classList.add('la-cloud-meatball');
      break;
    }
    case 1210: {  // Snow
      today_icon.classList.add('la-snowflake');
      break;
    }
    case 1213: {  // Snow
      today_icon.classList.add('la-snowflake');
      break;
    }
    case 1216: {  // Snow
      today_icon.classList.add('la-snowflake');
      break;
    }
    case 1219: {  // Snow
      today_icon.classList.add('la-snowflake');
      break;
    }
    case 1222: {  // Snow
      today_icon.classList.add('la-snowflake');
      break;
    }
    case 1225: {  // Snow
      today_icon.classList.add('la-snowflake');
      break;
    }
    case 1237: {  // Snow
      today_icon.classList.add('la-snowflake');
      break;
    }
    case 1240: {  // Moderate rain
      today_icon.classList.add('la-cloud-rain');
      break;
    }
    case 1243: {  // Heavy rain
      today_icon.classList.add('la-cloud-showers-heavy');
      break;
    }
    case 1246: {  // Heavy rain
      today_icon.classList.add('la-cloud-showers-heavy');
      break;
    }
    case 1252: {  // sleet
      today_icon.classList.add('la-cloud-meatball');
      break;
    }
    case 1255: {  // Snow
      today_icon.classList.add('la-snowflake');
      break;
    }
    case 1258: {  // Snow
      today_icon.classList.add('la-snowflake');
      break;
    }
    case 1261: {  // sleet
      today_icon.classList.add('la-cloud-meatball');
      break;
    }
    case 1264: {  // sleet
      today_icon.classList.add('la-cloud-meatball');
      break;
    }
    case 1273: {  // Thunder
      today_icon.classList.add('la-bolt');
      break;
    }
    case 1276: {  // Thunder
      today_icon.classList.add('la-bolt');
      break;
    }
    case 1279: {  // Thunder
      today_icon.classList.add('la-bolt');
      break;
    }
    case 1282: {  // Thunder
      today_icon.classList.add('la-bolt');
      break;
    }
    default: {
      today_icon.classList.add('la-question-circle');
      break;
    }
  }
}

function reset_icon() {
  today_icon.className = '';
  today_icon.classList.add('today-icon');
  today_icon.classList.add('las');
}

async function get_weather(location: string) {
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3&aqi=no&alerts=no`, {mode: 'cors'});
    const weather = await response.json();
    return weather;
  } catch(err) {
    display_error("Network Error");
  }
}

function timeoutPromise(delay: number) {
	return new Promise( function(resolve,reject){
		setTimeout( function(){
			reject( "Request timeout" );
		}, delay );
	} );
}

async function load_weather() {
  display_updating();
  Promise.race([
    get_weather(location_name),
    timeoutPromise(5000)
  ]).then((weather) => {
      if (weather !== undefined) {
        weather_data = weather;
        if ("error" in weather) {
          display_error(weather.error.message);
        } else {
          console.log(weather);
          update_ui(weather, metric_unit);
        }
      }
  }, (err) => {
    display_error(err);
  })
}

load_weather();
