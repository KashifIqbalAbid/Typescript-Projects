#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bgCyan.bold(`........Welcome to online QUIZ module......
There are 10 MCQs in this QUIZ, so lets get started
`));
const question = await inquirer.prompt([
    {
        type: "list",
        name: "question1",
        choices: ["strongly typed", "object oriented", "compiled language", "All of the above"],
        message: "1. TypeScript is a ?"
    },
    {
        type: "list",
        name: "question2",
        choices: ["TypeScript is just JavaScript", "TypeScript supports other JS libraries", "TypeScript is portable", "All of the above"],
        message: "2. Which of the following are features of typeScript ?"
    },
    {
        type: "list",
        name: "question3",
        choices: [".d.ty", ".d.tp", ".d.ts", ".d.td"],
        message: "3. Extension of typescript is?"
    },
    {
        type: "list",
        name: "question4",
        choices: ["TRUE", "FALSE", "Can be true or false", "Can not say"],
        message: "4. TypeScript supports Object Oriented Programming concepts like classes, interfaces, inheritance."
    },
    {
        type: "list",
        name: "question5",
        choices: ["2", "3", "4", "5"],
        message: "5. How many components typescript has?"
    },
    {
        type: "list",
        name: "question6",
        choices: ["case-sensitive", "Case-insensitive", "depends on typescript version", "Can not say"],
        message: "6. TypeScript is ?"
    },
    {
        type: "list",
        name: "question7",
        choices: ["1", "2", "3", "4"],
        message: "7. TypeScript supports how many types of comments?"
    },
    {
        type: "list",
        name: "question8",
        choices: ["1", "2", "3", "4"],
        message: "8. According to Grady Brooch, every object must have _________ features."
    },
    {
        type: "list",
        name: "question9",
        choices: ["constructor", "method", "function", "class"],
        message: "9. A ________ in terms of OOP is a blueprint for creating objects."
    },
    {
        type: "list",
        name: "question10",
        choices: ["Yes", "No", "Can be yes or no", "Can not say"],
        message: "10. Semicolons are optional in TypeScript."
    }
]);
let score = 0;
let { question1, question2, question3, question4, question5, question6, question7, question8, question9, question10 } = question;
if (question1 == "All of the above") {
    ++score;
}
if (question2 == "All of the above") {
    ++score;
}
if (question3 == ".d.ts") {
    ++score;
}
if (question4 == "TRUE") {
    ++score;
}
if (question5 == "3") {
    ++score;
}
if (question6 == "case-sensitive") {
    ++score;
}
if (question7 == "2") {
    ++score;
}
if (question8 == "3") {
    ++score;
}
if (question9 == "class") {
    ++score;
}
if (question10 == "Yes") {
    ++score;
}
if (score == 0) {
    console.log(chalk.red(`Sorr! you have got ${score} out of 10`));
}
console.log(chalk.bgGreen(`You have got ${score} out of 10`));
