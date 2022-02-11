import { format } from "date-fns";

export default class WeatherCurrent {
  constructor({ name, weather, main, dt, coord, id, sys }) {
    this.name = name;
    this.country = sys.country;
    this.weatherDescription = this.getWeatherDescription(weather);
    this.temperature = main.temp.toFixed(0);
    this.date = this.getDate(dt);
    this.id = id;
    this.coord = coord;
  }

  getWeatherDescription(weather) {
    return {
      icon: weather[0].icon,
      description: weather[0].main,
    };
  }

  getDate(date) {
    const formattedDate = new Date(date * 1000);
    const getDay = format(formattedDate, "dd/MM");

    return getDay;
  }
}
