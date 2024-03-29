import './styles.css'
import 'normalize.css'
import 'line-awesome/dist/line-awesome/css/line-awesome.css'

// <!> secret.ts file with an API_KEY const needs to be created before use
import { API_KEY } from './secret'

import { get_icon } from './weather_icons'
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

// Forecast
const daily_forecast = document.querySelector('.daily-forecast')

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
  reset_icon();
  today_icon.classList.add(get_icon(weather.current.condition.code));
}

function getDayOfWeek(date: string) {
  const dayOfWeek = new Date(date).getDay();
  return isNaN(dayOfWeek) ? null : 
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
}

function clear_child(e: Element) {
  while (e.firstChild) {
    e.removeChild(e.firstChild);
  }
}

function gen_forecast(weather: any, metric_unit: boolean) {
  clear_child(daily_forecast);
  weather.forecast.forecastday.map((item: any) => {
    // console.log(item);
    const card = document.createElement('div');
    card.classList.add('daily-card');
    card.classList.add('frosted-glass');

    const icon = document.createElement('i');
    icon.classList.add('extra-icon');
    icon.classList.add('las');
    icon.classList.add(get_icon(item.day.condition.code));
    card.appendChild(icon);

    const weekday = document.createElement('p');
    weekday.classList.add('forecast-day');
    weekday.textContent = getDayOfWeek(item.date);
    card.appendChild(weekday);

    const daily_stats = document.createElement('div');
    daily_stats.classList.add('daily-stats');

    const stat_wrap = document.createElement('p');
    stat_wrap.classList.add('daily-stats')

    const down_arrow = document.createElement('i');
    down_arrow.classList.add('forecast-extra-icon');
    down_arrow.classList.add('las');
    down_arrow.classList.add('la-long-arrow-alt-down');
    stat_wrap.appendChild(down_arrow);

    const min_temp = document.createElement('span');
    const unit = document.createElement('span');
    unit.classList.add('temp-unit')
    if (metric_unit) {
      min_temp.textContent = item.day.mintemp_c;
      unit.textContent = "°C";
    } else {
      min_temp.textContent = item.day.mintemp_f;
      unit.textContent = "°F"
    }
    min_temp.appendChild(unit);
    stat_wrap.appendChild(min_temp);

    const up_arrow = document.createElement('i');
    up_arrow.classList.add('forecast-extra-icon');
    up_arrow.classList.add('las');
    up_arrow.classList.add('la-long-arrow-alt-up');
    stat_wrap.appendChild(up_arrow);

    const max_temp = document.createElement('span');
    const unit2 = unit.cloneNode(true)
    if (metric_unit) {
      max_temp.textContent = item.day.maxtemp_c;
    } else {
      max_temp.textContent = item.day.maxtemp_f;
    }
    max_temp.appendChild(unit2);
    stat_wrap.appendChild(max_temp);

    const spacer = document.createElement('span');
    spacer.textContent = " ";
    stat_wrap.appendChild(spacer);

    const rain_wrap = document.createElement('span');
    rain_wrap.classList.add('daily-stats');

    const umbrella = document.createElement('i');
    umbrella.classList.add('las');
    umbrella.classList.add('la-umbrella');
    rain_wrap.appendChild(umbrella);

    const rain_chance = document.createElement('span');
    rain_chance.textContent = item.day.daily_chance_of_rain + '%';
    rain_wrap.append(rain_chance);

    daily_stats.append(stat_wrap);
    daily_stats.append(rain_wrap);
    card.appendChild(daily_stats);
    // card.appendChild(stat_wrap);
    daily_forecast.appendChild(card);
  })
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

function reset_icon() {
  today_icon.className = '';
  today_icon.classList.add('today-icon');
  today_icon.classList.add('las');
}

async function get_weather(location: string) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3&aqi=no&alerts=no`, {mode: 'cors'});
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
  clear_child(daily_forecast);
  Promise.race([
    get_weather(location_name),
    timeoutPromise(5000)
  ]).then((weather) => {
      if (weather !== undefined) {
        weather_data = weather;
        if ("error" in weather) {
          display_error(weather.error.message);
        } else {
          update_ui(weather, metric_unit);
          gen_forecast(weather, metric_unit);
        }
      }
  }, (err) => {
    display_error(err);
  })
}

load_weather();
