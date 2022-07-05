import inquirer from "inquirer";
import colors from "colors";

const questions = [
  {
    type: "list",
    name: "option",
    message: "What do you want to do?",
    choices: [
      {
        value: 1,
        name: `${"1.".green} Search place`,
      },
      {
        value: 2,
        name: `${"2.".green} Search history`,
      },
      {
        value: 0,
        name: `${"0.".green} Exit`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("====================".green);
  console.log("  Select an option  ".white);
  console.log("====================\n".green);

  const { option } = await inquirer.prompt(questions);

  return option;
};

const pause = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Press ${"Enter".green} to continue`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "description",
      message,
      validate(value) {
        if (value.length === 0) return "Please enter a value".red;
        return true;
      },
    },
  ];
  console.log("\n");
  const { description } = await inquirer.prompt(question);
  return description;
};

const listPlaces = async (places = []) => {
  const choices = places.map((choice, index) => ({
    value: choice.id,
    name: `${index + 1} ${choice.name}`,
  }));
  choices.unshift({
    value: "0",
    name: "0. Cancel",
  });
  const questions = [
    {
      type: "list",
      name: "placeId",
      message: "Select the place:",
      choices,
    },
  ];
  const { placeId } = await inquirer.prompt(questions);
  return placeId;
};

export { inquirerMenu, pause, readInput, listPlaces };
