#!/usr/bin/env node
import inquirer from "inquirer";
const question = await inquirer.prompt([
    {
        type: "number",
        name: "getvalue",
        message: "Please enter number to start the time from?"
    }
]);
const startingminute = question.getvalue;
var time = startingminute * 60;
setInterval(updatecounterdown, 1000);
function updatecounterdown() {
    const minute = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < startingminute ? 0 : seconds;
    console.clear();
    console.log(`${minute}:${seconds}`);
    time--;
}
