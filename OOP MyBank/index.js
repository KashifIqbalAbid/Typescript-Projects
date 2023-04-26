#!/usr/bin/env node
import inquirer from "inquirer";
class Customer {
    FirstName;
    LastName;
    Gender;
    Age;
    MobileNumber;
    bankaccount;
    constructor(FirstName, LastName, Gender, Age, MobileNumber, bankaccount) {
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Gender = Gender;
        this.Age = Age;
        this.MobileNumber = MobileNumber;
        this.bankaccount = bankaccount;
    }
    CustomerInfo() {
        return `Customer Name: ${this.FirstName} ${this.LastName}
        Age: ${this.Age}
        Gender: ${this.Gender}
        Mobile: ${this.MobileNumber}
        Account Balance: ${this.bankaccount.AccountBalance} 
        `;
    }
}
class BankAccount {
    AccountBalance;
    constructor(AccountBalance = 100) {
        this.AccountBalance = AccountBalance;
    }
    Debit(amount) {
        let statement = "Sorry! you have insufficient balance";
        if (amount > 0) {
            statement = "the amount you entered is wrong";
            if (this.AccountBalance > amount) {
                this.AccountBalance = this.AccountBalance - amount;
                statement = "Transaction successful! New Balance is " + this.AccountBalance;
            }
            else {
                statement = "You do not have enough money to do this transaction";
            }
        }
        return statement;
    }
    Credit(amount) {
        let statement = "Transaction failed";
        if (amount > 0) {
            this.AccountBalance = this.AccountBalance + amount;
            if (amount > 100) {
                this.AccountBalance = this.AccountBalance - 1;
            }
            statement = "your account has been credited successfully!";
        }
        return statement;
    }
}
const customerinfo = await inquirer.prompt([
    {
        type: "input",
        name: "firstname",
        //choices:["Debit Money", "Credit Money", "Check Account Balance", "Exit"],
        message: "Enter Customer First Name"
    },
    {
        type: "input",
        name: "lastname",
        //choices:["Debit Money", "Credit Money", "Check Account Balance", "Exit"],
        message: "Enter Customer Last Name"
    },
    {
        type: "input",
        name: "gender",
        //choices:["Debit Money", "Credit Money", "Check Account Balance", "Exit"],
        message: "Enter Gender"
    },
    {
        type: "number",
        name: "age",
        //choices:["Debit Money", "Credit Money", "Check Account Balance", "Exit"],
        message: "Enter Customer age"
    },
    {
        type: "input",
        name: "mobilenumber",
        //choices:["Debit Money", "Credit Money", "Check Account Balance", "Exit"],
        message: "Enter Customer Mobile Number"
    }
]);
let { firstname, lastname, gender, age, mobilenumber } = customerinfo;
var bankaccount = new BankAccount();
var customer = new Customer(firstname, lastname, gender, age, mobilenumber, bankaccount);
console.log(`\n......Customer information added successfully......\n`);
var loop = true;
while (loop) {
    const options = await inquirer.prompt([
        {
            type: "list",
            name: "option",
            choices: ["Debit Money", "Credit Money", "Cutomer Detail", "Check Account Balance", "Exit"],
            message: "Please select option"
        }
    ]);
    if (options.option == "Debit Money") {
        const debitamount = await inquirer.prompt([
            {
                type: "number",
                name: "amount",
                //choices:["Debit Money", "Credit Money", "Check Account Balance", "Exit"],
                message: "Please amount to be debited",
                validate: (amount) => {
                    if (isNaN(amount) || amount <= 0) {
                        return "Please enter valid debit amount";
                    }
                    else {
                        return true;
                    }
                }
            }
        ]);
        let mess = customer.bankaccount.Debit(debitamount.amount);
        console.log(`${mess}`);
    }
    if (options.option == "Credit Money") {
        const crebitamount = await inquirer.prompt([
            {
                type: "number",
                name: "amount",
                //choices:["Debit Money", "Credit Money", "Check Account Balance", "Exit"],
                message: "Please amount to be Credited",
                validate: (amount) => {
                    if (isNaN(amount) || amount <= 0) {
                        return "Please enter valid credit amount";
                    }
                    else {
                        return true;
                    }
                }
            }
        ]);
        let mess = customer.bankaccount.Credit(crebitamount.amount);
        console.log(`${mess} Your new account balance is: ${customer.bankaccount.AccountBalance}`);
    }
    if (options.option == "Cutomer Detail") {
        console.log(`Customer Detail is:  ${customer.CustomerInfo()}`);
    }
    if (options.option == "Check Account Balance") {
        console.log(`Customer Account Balance is:  ${customer.bankaccount.AccountBalance}`);
    }
    if (options.option == "Exit") {
        loop = false;
    }
}
