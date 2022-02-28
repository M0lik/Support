var inquirer = require("inquirer");

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const MAX_TRY = 5;
let result = 0;
let wrong = 0;

inquirer
  .prompt([
    {
      type: "number",
      name: "min",
      message: "Select the min number",
    },
    {
      type: "number",
      name: "max",
      message: "Select the max number",
    },
  ])
  .then((response) => {
    result = randomNumber(response.min, response.max);
    askQuestion();
  });

const askQuestion = () => {
  inquirer
    .prompt([
      {
        type: "number",
        name: "secretNumber",
        message: "Guess the secret number",
      },
    ])
    .then((response) => {
      value = response.secretNumber;
      if (result === value) {
        console.log("You WIN!");
        return;
      } else if (result < value) console.log("-");
      else if (result > value) console.log("+");
      wrong++;
      if (wrong < MAX_TRY) {
        askQuestion();
      } else console.log("You lose, the number was", result);
    });
};