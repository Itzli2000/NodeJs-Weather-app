import { readInput } from "./helpers/inquirer.js";

const main = async () => {
  const test = await readInput("Testing base:");
  console.log(test);
};

main();
