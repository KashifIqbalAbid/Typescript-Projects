#!/usr/bin/env node
import inquirer from "inquirer";
let systemGeneratedNo = Math.floor((Math.random()) * 10);
const userGuess = await inquirer.prompt([
    {
        type: "number",
        name: "userInput",
        message: "Please enter number to Guess",
        validate: (ans) => {
            if (isNaN(ans)) {
                return "Enter valid number b/w 1-10";
            }
            else if (ans <= 0 || ans >= 10) {
                return "Enter valid number b/w 1-10";
            }
            else
                return true;
        }
    }
]);
// const noOfRound:{answer:number} = await inquirer.prompt([
//     {
//     type:"number",
//     name:"answer",
//     message:"Please enter number of round you want to play?",    
//     }
// ])
console.log(`System Number: ${systemGeneratedNo} \n User Number: ${userGuess.userInput}`);
if (systemGeneratedNo == userGuess.userInput) {
    console.log("Congrats! you have guessed the right number");
}
else {
    console.log("Sorry! Try Again, Better Luck next time");
}
