#!/usr/bin/env node

import inquirer from "inquirer"

class Customer
{
   constructor(
    private FirstName:string,
    private LastName:string,
    private Gender:string,
    private Age:number,
    private MobileNumber:string,
    public bankaccount:BankAccount
     ){

    }

    CustomerInfo():string{
        return`Customer Name: ${this.FirstName } ${this.LastName}
        Age: ${this.Age}
        Gender: ${this.Gender}
        Mobile: ${this.MobileNumber}
        Account Balance: ${this.bankaccount.AccountBalance} 
        `;
    }
}

interface IBankAccount{
    Debit(d:number):string,
    Credit(d:number):string,
    
}

class BankAccount implements IBankAccount
{
    constructor(public AccountBalance:number=100){}

    Debit(amount: number): string {
    let statement:string="Sorry! you have insufficient balance";
        if(amount>0){
            statement = "the amount you entered is wrong";
            if(this.AccountBalance>amount){
                this.AccountBalance=this.AccountBalance-amount;
                statement = "Transaction successful! New Balance is " + this.AccountBalance;
            }else{
                statement = "You do not have enough money to do this transaction"
            }
        }
            return statement;
        }

    Credit(amount: number): string {
           let statement:string = "Transaction failed"
        if(amount>0){
            this.AccountBalance = this.AccountBalance+amount;
            if(amount>100){
                this.AccountBalance = this.AccountBalance - 1;
            }
            statement = "your account has been credited successfully!";
        }
        return statement;
        }
    
}

const customerinfo:{
    firstname:string,
    lastname:string,
    gender:string,
    age:number,
    mobilenumber:string
}=await inquirer.prompt([
    {
        type:"input",
        name:"firstname",
        //choices:["Debit Money", "Credit Money", "Check Account Balance", "Exit"],
        message:"Enter Customer First Name"
    },
    {
        type:"input",
        name:"lastname",
        //choices:["Debit Money", "Credit Money", "Check Account Balance", "Exit"],
        message:"Enter Customer Last Name"
    },
    {
        type:"input",
        name:"gender",
        //choices:["Debit Money", "Credit Money", "Check Account Balance", "Exit"],
        message:"Enter Gender"
    },
    {
        type:"number",
        name:"age",
        //choices:["Debit Money", "Credit Money", "Check Account Balance", "Exit"],
        message:"Enter Customer age"
    },
    {
        type:"input",
        name:"mobilenumber",
        //choices:["Debit Money", "Credit Money", "Check Account Balance", "Exit"],
        message:"Enter Customer Mobile Number"
    }
    
])

let {firstname, lastname, gender, age, mobilenumber} = customerinfo;

var bankaccount =new BankAccount();
var customer = new Customer(firstname, lastname, gender, age, mobilenumber, bankaccount);

console.log(`\n......Customer information added successfully......\n`);

var loop=true;
while(loop){
    
    const options:{option:string}=await inquirer.prompt([
        {
            type:"list",
            name:"option",
            choices:["Debit Money", "Credit Money","Cutomer Detail", "Check Account Balance", "Exit"],
            message:"Please select option"
        }
    ])
    
    if(options.option=="Debit Money"){
        const debitamount:{amount:number}=await inquirer.prompt([
            {
                type:"number",
                name:"amount",
                //choices:["Debit Money", "Credit Money", "Check Account Balance", "Exit"],
                message:"Please amount to be debited",
                validate:(amount:number)=>{
                    if(isNaN(amount) || amount <= 0){
                        return "Please enter valid debit amount"
                    }else{
                        return true
                    }
                }
            }
        ])
       let mess:string = customer.bankaccount.Debit(debitamount.amount);
        console.log(`${mess}`);
    }
    if(options.option=="Credit Money"){
        const crebitamount:{amount:number}=await inquirer.prompt([
            {
                type:"number",
                name:"amount",
                //choices:["Debit Money", "Credit Money", "Check Account Balance", "Exit"],
                message:"Please amount to be Credited",
                validate:(amount:number)=>{
                    if(isNaN(amount) || amount <= 0){
                        return "Please enter valid credit amount"
                    }else{
                        return true
                    }
                }
            }
        ])
       let mess:string = customer.bankaccount.Credit(crebitamount.amount);
        console.log(`${mess} Your new account balance is: ${customer.bankaccount.AccountBalance}`);
        
    }
    if(options.option=="Cutomer Detail"){
        console.log(`Customer Detail is:  ${customer.CustomerInfo()}`);
    }
    if(options.option=="Check Account Balance"){
        console.log(`Customer Account Balance is:  ${customer.bankaccount.AccountBalance}`)
    }

    if(options.option=="Exit"){
        
        loop=false

    }
    
}