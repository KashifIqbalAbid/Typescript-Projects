#!/usr/bin/env node
import inquirer from "inquirer";
class Person {
    personality;
    constructor() {
        this.personality = "Mystery";
    }
    AskQuestion(answer) {
        if (answer == 1) {
            this.personality = "Extravert";
        }
        else if (answer == 2) {
            this.personality = "Introvert";
        }
        else {
            this.personality = "still a mystery";
        }
    }
    get GetPersonality() {
        return this.personality;
    }
}
class Student extends Person {
    name;
    constructor() {
        super();
        this.name = "";
    }
    set setName(_name) {
        this.name = _name;
    }
    get getName() {
        return this.name;
    }
}
try {
    const question1 = await inquirer.prompt([
        {
            type: "number",
            name: "input",
            validate: (input) => {
                if (isNaN(input) || input <= 0) {
                    return "enter valid number";
                }
                else {
                    return true;
                }
            },
            message: "Type 1 if you want to talk to others type 2 if you would rather keep yourself"
        }
    ]);
    let person = new Person();
    person.AskQuestion(question1.input);
    console.log(`You are ${person.GetPersonality}`);
    const question2 = await inquirer.prompt([
        {
            type: "input",
            name: "input",
            validate: (input) => {
                if (input == " " || input == "" || !isNaN(parseInt(input))) {
                    return "enter valid name";
                }
                else {
                    return true;
                }
            },
            message: "What is your name?"
        }
    ]);
    let student = new Student();
    student.setName = question2.input;
    console.log(`Your name is ${student.getName} and your personality type is ${person.GetPersonality}`);
}
catch {
    console.log("Please enter inter value");
}
