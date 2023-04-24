#!/usr/bin/env node
import inquirer from "inquirer";
let question = await inquirer.prompt([
    {
        type: "input",
        name: 'getinput',
        message: 'Please enter value'
    }
]);
let words = question.getinput.split(" ");
let stringcount = question.getinput.replace(" ", "").length;
console.log(`String length without whitespace is: ${stringcount}`);
console.log(`Total Words are: ${words.length}`);
// console.log(`Every word has following number of characters: `);
