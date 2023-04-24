#!/usr/bin/env node
import inquirer from "inquirer";

interface getuserinput{
    getinput:string
}
let question:getuserinput = await inquirer.prompt([
    {
        type:"input",
        name:'getinput',
        message:'Please enter value'
    }
])

let words:string[] = question.getinput.split(" ");
let stringcount:number = question.getinput.replace(" ", "").length;

console.log(`String length without whitespace is: ${stringcount}`);
console.log(`Total Words are: ${words.length}`);

// console.log(`Every word has following number of characters: `);


