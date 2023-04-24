#!/usr/bin/env node
import inquirer from "inquirer";
const transaction = await inquirer.prompt([
    {
        type: "input",
        name: "userid",
        message: "Please enter your ID"
    },
    {
        type: "number",
        name: "pin",
        message: "Please enter your PIN"
    },
    {
        type: "list",
        name: "accounttype",
        choices: ["Current", "Saving"],
        message: "Select Your Account Type"
    },
    {
        type: "list",
        name: "transactiontype",
        choices: ["Fast Cash", "Withdrawal"],
        message: "Select Transaction Type"
    },
    {
        type: "list",
        name: "amount",
        choices: ["1000", "2000", "3000", "4000", "10000"],
        message: "Select your amount (Fast Cash)",
        when: (ans) => {
            return ans.transactiontype == "Fast Cash";
        }
    },
    {
        type: "number",
        name: "amount",
        message: "Select your amount (withdrawal)",
        when: (ans) => {
            return ans.transactiontype == "Withdrawal";
        }
    }
]);
const { userid, pin, accounttype, transactiontype, amount } = transaction;
const balance = Math.floor(Math.random() * 100000);
if (balance < amount) {
    console.log("Balance is insufficient");
}
else {
    console.log(`Your Previous Balance was: ${balance} \nafter withdrawal ${amount}, new Balance is: ${balance - amount}`);
}
