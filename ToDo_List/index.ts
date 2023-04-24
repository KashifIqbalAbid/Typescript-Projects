#!/usr/bin/env node
import inquirer from "inquirer";

let ToDos:string[]=[];

interface todoquestion {
    addtodo:string,
    moretodo:boolean
}
async function todo() {
    return inquirer.prompt([
        {
        type:"input",
        name:"addtodo",
        message:"Please Enter your Todo"
        },
        {
            type:"confirm",
            name:"moretodo",
            message:"do you want to add more todo?"
        }
    ])  
} 
var confirmtodo:boolean = false;
do{
    confirmtodo = false;
    var todos = await todo();
    //var {addtodo:string, moretodo:boolean} = todos;

    ToDos.push(todos.addtodo);
    confirmtodo = todos.moretodo;
    if(!confirmtodo && ToDos.length > 0){
        console.log(`Your ToDos are: `);
        ToDos.forEach(element => {
        console.log(`${element}`);    
        });
   }

}while(todos.moretodo)

//console.log(question.addtodo);