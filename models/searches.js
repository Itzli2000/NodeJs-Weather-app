import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const dir = "./db";
const file = `${dir}/records.json`;

class Searches {
  record = [];

  constructor() {
    this.readDB();
  }

  get capitalizedRecord() {
    return this.record.map((place) => {
      const placeToArray = place.split(" ");
      for (let i = 0; i < placeToArray.length; i++) {
        placeToArray[i] =
          placeToArray[i][0].toUpperCase() + placeToArray[i].substr(1);
      }
      return placeToArray.join(" ");
    });
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

  saveRecords(place = "") {
    if (this.record.includes(place.toLocaleLowerCase())) return;
    this.record.unshift(place.toLocaleLowerCase());
    if (this.record.length >= 6) this.record.pop();
    this.saveDB();
  }

  saveDB() {
    const payload = {
      record: this.record,
    };
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      fs.writeFileSync(file, JSON.stringify(payload, null, 2));
    } catch (error) {
      throw error;
    }
  }

  readDB() {
    try {
      if (!fs.existsSync(file)) return null;
      const info = fs.readFileSync(file, { encoding: "utf-8" });
      const converted = JSON.parse(info);
      this.record = converted.record;
    } catch (error) {
      throw error;
    }
  }
}

export { Searches };
