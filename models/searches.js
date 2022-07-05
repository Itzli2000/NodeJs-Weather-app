import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

class Searches {
  record = [];

  constructor() {
    //TODO: read DB if exist
  }

  get mapboxParams() {
    return {
      access_token: process.env.MAPBOX_KEY,
      language: "en",
      limit: 5,
    };
  }

  async city(place = "") {
    const instance = axios.create({
      baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
      params: this.mapboxParams,
    });
    try {
      const { data } = await instance.get();
      return data.features.map((item) => ({
        id: item.id,
        name: item.place_name,
        lng: item.center[0],
        lat: item.center[1],
      }));
    } catch (error) {
      throw new Error(error);
    }
  }

  async searchWeather(lat, lon) {
    const instance = axios.create({
      baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_KEY}&units=metric`,
    });
    try {
      const { data } = await instance.get();
      return {
        description: data.weather[0].description,
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

export { Searches };
