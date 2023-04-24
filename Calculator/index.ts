#!/usr/bin/env node
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
//import chalk from "chalk";

async function  welcome(ms: number, message:string) {
     return await new Promise((resolve) => {
        let rainbowtitle=chalkAnimation.rainbow(message);
        setTimeout(()=>{
            rainbowtitle.stop();
            resolve(" ")
        }, ms)

})
}
 await welcome(2000, "......Lets Start Calculator......");
// async function welcome(){
//    await setTimeout(() => {
//         let rainbowtitle=chalkAnimation.rainbow(`...Lets Start Calculator...`);
//     }, 2000);
// }
// welcome();
async function calulator() {
   
   return await inquirer.prompt([
        {
            type:"list",
            name:"Operator",
            choices:["+", "-", "*", "/"],
            message:"Which operation do you want to perform?"
        },
    {
        type:"number",
        name:"NumberOne",
        message:"Enter First Number",
        validate:(ans:number)=>{
            if(isNaN(ans)){
                console.log(` is not valid number, Please Enter valid number`)
            }else{return true;}
        }
    },
    {
        type:"number",
        name:"NumberTwo",
        message:"Enter Second Number",
        validate:(ans:number)=>{
            if(isNaN(ans)){
                console.log(` is not valid number, Please Enter valid number`)
            }else{return true;}
        }
    },
   
])
}
async function processcalculation(){
    await calulator().then((response=>{
        let {Operator, NumberOne, NumberTwo}= response;
        
        if(Operator && NumberOne && NumberTwo){
            if(Operator=="+"){
        
            console.log(`Addition of ${NumberOne} and ${NumberTwo} is: ${NumberOne + NumberTwo}`);
            
            }
            if(Operator=="-"){
                console.log(`Subtraction of ${NumberOne} and ${NumberTwo} is: ${NumberOne - NumberTwo}`);
                
            }
            if(Operator=="*"){
                console.log(`Multiplication of ${NumberOne} and ${NumberTwo} is: ${NumberOne * NumberTwo}`);
            }
            if(Operator=="/"){
                console.log(`Division of ${NumberOne} and ${NumberTwo} is: ${NumberOne / NumberTwo}`);
                
            }
        }
        }));
}

do{
    await  processcalculation();
    var option;
    await inquirer.prompt([{
        type:"list",
        name:"msg",
        choices:["Yes", "No"],
        message:"Do you want to perform more calculation?"
    }]).then((answer)=>{
        if(answer.msg=="No"){
             welcome(2000, ".....Thank You for using Calculator.....");
        }
        option=answer.msg;
    })    
}while(option=="Yes")


//export{};