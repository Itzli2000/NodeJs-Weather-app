import {
  inquirerMenu,
  pause,
  readInput,
  listPlaces,
} from "./helpers/inquirer.js";
import { Searches } from "./models/searches.js";
import colors from "colors";

const main = async () => {
  console.clear();
  let option;
  const searches = new Searches();
  do {
    option = await inquirerMenu();

    switch (option) {
      case 1:
        const searchParam = await readInput("City: ");
        const places = await searches.city(searchParam);
        const selected = await listPlaces(places);
        const selectedPlace = places.find((place) => place.id === selected);
        const weather = await searches.searchWeather(selectedPlace.lat, selectedPlace.lng);
        console.log("\nCity information\n".green);
        console.log('City: ', selectedPlace.name);
        console.log('Lat: ', selectedPlace.lat);
        console.log('Lng: ', selectedPlace.lng);
        console.log('Temperature: ', weather.temp);
        console.log('Conditions: ', weather.description);
        console.log('Feels like: ', weather.feels_like);
        console.log('Min: ', weather.temp_min);
        console.log('Max: ', weather.temp_max);
        break;

      case 1:
        break;

      default:
        break;
    }

    if (option !== 0) await pause();
  } while (option !== 0);
};

main();
