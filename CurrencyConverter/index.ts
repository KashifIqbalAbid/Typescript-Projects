#!/usr/bin/env node
import inquirer from "inquirer"

let Conversion={
    "PKR":{
        "USD":0.00352112,
        "GBP":0.00284090,
        "PKR":1
    },
    "USD":{
        "USD":1,
        "GBP":0.8064,
        "PKR":284
    },
    "GBP":{
        "USD":1.2394,
        "GBP":1,
        "PKR":352
    }
}
interface  ans{
    from:"PKR"|"USD"|"GBP",
    to:"PKR"|"USD"|"GBP",
    amount:number
}
const question:ans = await inquirer.prompt([
    {
        type:"list",
        name:"from",
        choices:["PKR", "USD", "GBP"],
        message:"Select your currency"
    },
    {
        type:"list",
        name:"to",
        choices:["PKR", "USD", "GBP"],
        message:"Select your currency"
    },
    {
        type:"number",
        name:"amount",
        message:"Enter your amount to convert"
    }
])
const {from, to, amount} = question;

if(from && to && amount){

    let result=Conversion[from][to]*amount;
    console.log(`Your conversion of amount ${amount} from ${from} to ${to} is: ${result}`);

}else{
    console.log("Invalid Inputs! Please enter some valid values");
}
