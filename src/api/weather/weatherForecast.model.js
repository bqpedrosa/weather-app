import { format } from "date-fns";

export default class WeatherForecast {
  constructor({ weather, temp, dt }) {
    this.weatherDescription = this.getWeatherDescription(weather);
    this.temperature = this.getWeatherTemperature(temp);
    this.date = this.getDate(dt);
  }

  getWeatherDescription(weather) {
    return {
      icon: weather[0].icon,
      description: weather[0].main,
    };
  }

  getWeatherTemperature(temp) {
    const { max, min } = temp;

    return {
      temp_max: max.toFixed(0),
      temp_min: min.toFixed(0),
    };
  }

  getDate(date) {
    const formattedDate = new Date(date * 1000);
    const getDay = format(formattedDate, "dd/MM");

    return getDay;
  }
}
