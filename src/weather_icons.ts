export function get_icon(code: number) { // Weather codes are documented here: https://www.weatherapi.com/docs/weather_conditions.xml
  switch(code) {
    case 1000: {  // Sunny
      return 'la-sun';
    }
    case 1003: {  // Partly cloudy
      return 'la-cloud-sun';
    }
    case 1006: {  // Cloudy
      return 'la-cloud';
    }
    case 1009: {  // Overcast
      return 'la-cloud';
    }
    case 1030: {  // Mist
      return 'la-water';
    }
    case 1063: {  // Patchy rain possible
      return 'la-cloud-rain';
    }
    case 1066: {  // Patchy snow possible
      return 'la-snowflake';
    }
    case 1069: {  // Patchy sleet possible
      return 'la-cloud-meatball';
    }
    case 1072: {  // Patchy freezing drizzle possible
      return 'la-cloud-rain';
    }
    case 1087: {  // Thundery outbreaks possible
      return 'la-bolt';
    }
    case 1114: {  // Blowing snow
      return 'la-snowflake';
    }
    case 1117: {  // Blizzard
      return 'la-cloud-rain';
    }
    case 1135: {  // Fog
      return 'la-smog';
    }
    case 1147: {  // Fog
      return 'la-smog';
    }
    case 1150: {  // Patchy light drizzle
      return 'la-cloud-rain';
    }
    case 1153: {  // light drizzle
      return 'la-cloud-rain';
    }
    case 1168: {  // freezing drizzle
      return 'la-cloud-rain';
    }
    case 1180: {  // Patchy light rain
      return 'la-cloud-rain';
    }
    case 1183: {  // light rain
      return 'la-cloud-rain';
    }
    case 1186: {  // Moderate rain at times
      return 'la-cloud-rain';
    }
    case 1189: {  // Moderate rain
      return 'la-cloud-rain';
    }
    case 1192: {  // Heavy rain
      return 'la-cloud-showers-heavy';
    }
    case 1195: {  // Heavy rain
      return 'la-cloud-showers-heavy';
    }
    case 1198: {  // Moderate rain
      return 'la-cloud-rain';
    }
    case 1201: {  // Heavy rain
      return 'la-cloud-showers-heavy';
    }
    case 1204: {  // sleet
      return 'la-cloud-meatball';
    }
    case 1207: {  // sleet
      return 'la-cloud-meatball';
    }
    case 1210: {  // Snow
      return 'la-snowflake';
    }
    case 1213: {  // Snow
      return 'la-snowflake';
    }
    case 1216: {  // Snow
      return 'la-snowflake';
    }
    case 1219: {  // Snow
      return 'la-snowflake';
    }
    case 1222: {  // Snow
      return 'la-snowflake';
    }
    case 1225: {  // Snow
      return 'la-snowflake';
    }
    case 1237: {  // Snow
      return 'la-snowflake';
    }
    case 1240: {  // Moderate rain
      return 'la-cloud-rain';
    }
    case 1243: {  // Heavy rain
      return 'la-cloud-showers-heavy';
    }
    case 1246: {  // Heavy rain
      return 'la-cloud-showers-heavy';
    }
    case 1252: {  // sleet
      return 'la-cloud-meatball';
    }
    case 1255: {  // Snow
      return 'la-snowflake';
    }
    case 1258: {  // Snow
      return 'la-snowflake';
    }
    case 1261: {  // sleet
      return 'la-cloud-meatball';
    }
    case 1264: {  // sleet
      return 'la-cloud-meatball';
    }
    case 1273: {  // Thunder
      return 'la-bolt';
    }
    case 1276: {  // Thunder
      return 'la-bolt';
    }
    case 1279: {  // Thunder
      return 'la-bolt';
    }
    case 1282: {  // Thunder
      return 'la-bolt';
    }
    default: {
      return 'la-question-circle';
    }
  }
}