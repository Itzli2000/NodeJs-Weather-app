import inquirer from "inquirer";
import colors from "colors";

const questions = [
  {
    type: "list",
    name: "option",
    message: "What do you want to do?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Create task`,
      },
      {
        value: "2",
        name: `${"2.".green} List tasks`,
      },
      {
        value: "3",
        name: `${"3.".green} list completed tasks`,
      },
      {
        value: "4",
        name: `${"4.".green} List pending tasks`,
      },
      {
        value: "5",
        name: `${"5.".green} Complete task`,
      },
      {
        value: "6",
        name: `${"6.".green} Delete task`,
      },
      {
        value: "7",
        name: `${"7.".green} Exit`,
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

const listOfTaskToDelete = async (tasks = []) => {
  const choices = tasks.map((task, index) => {
    return {
      value: task.id,
      name: `${(index + 1 + ".").green} ${task.description}`,
    };
  });
  const tasksList = [
    {
      type: "list",
      name: "deleteOption",
      message: "Which task would you like to delete?",
      choices,
    },
  ];
  const { deleteOption } = await inquirer.prompt(tasksList);
  return deleteOption;
};

const confirmTaskDeletion = async (id) => {
  const tasksList = [
    {
      type: "confirm",
      name: "confirmDeletion",
      message: `Are you sure you want to delete the task ${id}?`,
    },
  ];
  const { confirmDeletion } = await inquirer.prompt(tasksList);
  return confirmDeletion;
};

const listOfTaskToComplete = async (tasks = []) => {
  const choices = tasks.map((task, index) => {
    return {
      value: task.id,
      name: `${(index + 1 + ".").green} ${task.description}`,
      checked: task.completedOn,
    };
  });
  const tasksList = [
    {
      type: "checkbox",
      name: "completeOption",
      message: "Which tasks would you like to complete?",
      choices,
    },
  ];
  const { completeOption } = await inquirer.prompt(tasksList);
  return completeOption;
};

const confirmTaskComplete = async () => {
  const tasksList = [
    {
      type: "confirm",
      name: "confirmDeletion",
      message: "Are you sure you want to complete the selected tasks?",
    },
  ];
  const { confirmDeletion } = await inquirer.prompt(tasksList);
  return confirmDeletion;
};

export {
  inquirerMenu,
  pause,
  readInput,
  listOfTaskToDelete,
  confirmTaskDeletion,
  listOfTaskToComplete,
  confirmTaskComplete,
};