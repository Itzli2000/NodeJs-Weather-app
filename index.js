import { inquirerMenu, pause, readInput } from "./helpers/inquirer.js";
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
        const place = await readInput("City: ");
        searches.city(place);
        console.log("\nCity information\n".green);
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
