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
      'access_token': process.env.MAPBOX_KEY,
      'language': 'en',
      'limit': 5
    }
  }

  async city(place = "") {
    const instance = axios.create({
      baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
      params: this.mapboxParams,
    });
    try {
      const { data } = await instance.get();
      console.log("city", data);
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

export { Searches };
