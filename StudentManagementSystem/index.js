#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from 'chalk';
//import chalk-Animation from "chalk-animation";
class student {
    stdName;
    stdFatheName;
    stdCNIC;
    stdAge;
    stdType;
    stdCourse;
    stdFeeSubmitted;
    stdTotalFee;
    bankName;
    accountNumber;
    accountType;
    stdID;
    static studentcount = 10;
    constructor(stdName, stdFatheName, stdCNIC, stdAge, stdType, stdCourse, stdFeeSubmitted = 0, stdTotalFee = 0, bankName = "", accountNumber = 0, accountType = "", stdID = "PIAIC") {
        this.stdName = stdName;
        this.stdFatheName = stdFatheName;
        this.stdCNIC = stdCNIC;
        this.stdAge = stdAge;
        this.stdType = stdType;
        this.stdCourse = stdCourse;
        this.stdFeeSubmitted = stdFeeSubmitted;
        this.stdTotalFee = stdTotalFee;
        this.bankName = bankName;
        this.accountNumber = accountNumber;
        this.accountType = accountType;
        this.stdID = stdID;
        this.stdID = stdID + "_" + (++student.studentcount);
        if (this.stdType == "Online Student") {
            this.stdTotalFee = 3000 * this.stdCourse.length;
        }
        else {
            this.stdTotalFee = 5000 * this.stdCourse.length;
        }
    }
    get cnic() {
        return this.stdCNIC;
    }
    get age() {
        return this.stdAge;
    }
    get courses() {
        return this.stdCourse;
    }
    get fathername() {
        return this.stdFatheName;
    }
    get stdtype() {
        return this.stdType;
    }
    get bankname() {
        return this.bankName;
    }
    set bankname(value) {
        this.bankName = value;
    }
    get accountno() {
        return this.accountNumber;
    }
    set accountno(value) {
        this.accountNumber = value;
    }
    get accounttype() {
        return this.accountType;
    }
    set accounttype(value) {
        this.accountType = value;
    }
    get getstdid() {
        return this.stdID;
    }
    get getstdname() {
        return this.stdName;
    }
    get getstdtotalfee() {
        return this.stdTotalFee;
    }
    get getstdpaidfee() {
        return this.stdFeeSubmitted;
    }
    set payfee(value) {
        this.stdFeeSubmitted = value;
    }
    set setfeesubmitted(value) {
        this.stdFeeSubmitted = value;
    }
    // set settotalfee(value:number){
    //     this.stdFeeSubmitted +=  value;
    //     this.stdFeeBalance = (this.stdTotalFee-this.stdFeeSubmitted);
    // }
    // set setsubmittedfee(value:number){
    //     this.stdFeeSubmitted +=  value;
    // }
    get gettotalfee() {
        return this.stdTotalFee;
    }
}
var enrolledStudents = [];
var TempenrolledStudents = [];
var loop = true;
while (loop) {
    const question = await inquirer.prompt([
        {
            type: 'list',
            name: "option",
            choices: ["Enrol New Student", "View balance", "Pay tuition fee", "Show Status", "Exit"],
            message: "Please select some option:"
        }
    ]);
    if (question.option && question.option == "Enrol New Student") {
        console.log(chalk.green("..... Welcome to enrol new student module ......\n Kindly enter following student information"));
        var addmorestd = true;
        while (addmorestd) {
            addmorestd = false;
            let addstudent = await inquirer.prompt([
                {
                    type: "input",
                    name: "stdname",
                    message: "Enter student name"
                },
                {
                    type: "input",
                    name: "stdfname",
                    message: "Enter student Father name"
                },
                {
                    type: "input",
                    name: "stdcnic",
                    message: "Enter student CNIC"
                },
                {
                    type: "number",
                    name: "stdage",
                    message: "Enter student age"
                },
                {
                    type: "list",
                    name: "stdtype",
                    choices: ["Online Student", "Onsite Student"],
                    message: "Select student type"
                },
                {
                    type: "checkbox",
                    name: "stdcourses",
                    choices: ["AI", "DB Design", "Javascript ", "Cloud Computing", "Numerical Methods"],
                    message: "Enter student name",
                    validate: (element) => {
                        if (element.length == 0) {
                            return console.log(`Please select some course to enroll new Student...`);
                        }
                        else {
                            return true;
                        }
                    }
                },
            ]);
            const { stdname, stdfname, stdcnic, stdage, stdtype, stdcourses } = addstudent;
            const addnewstudent = new student(stdname, stdfname, stdcnic, stdage, stdtype, stdcourses);
            //console.log(`details are \n ${stdname}, ${stdfname}, ${stdage}, ${stdcourses}, ${stdtype}`);   
            console.log(chalk.bgRedBright(`...Student detail added successfully....`));
            console.table([addnewstudent], ["stdID", "stdName", "stdType", "stdCourse", "stdTotalFee"]);
            enrolledStudents.push(addnewstudent);
            const addmorestudent = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: "addmore",
                    message: "Do you want to enrol more Students.....:"
                }
            ]);
            if (addmorestudent.addmore) {
                addmorestd = true;
            }
        }
    }
    else if (question.option && question.option === "View balance") {
        // console.table( [enrolledStudents], ["stdID", "stdName", "stdType", "stdCourse", "stdFeeBalances"]);   
        enrolledStudents.forEach(student => {
            if (enrolledStudents.length > 0) {
                console.table([student], ["stdID", "stdName", "stdType", "stdCourse", "stdTotalFee", "stdFeeSubmitted"]);
            }
        });
    }
    else if (question.option && question.option === "Pay tuition fee") {
        let studentIds = [];
        for (let i = 0; i < enrolledStudents.length; i++) {
            if (enrolledStudents[i].getstdpaidfee == 0) {
                studentIds.push(enrolledStudents[i].getstdid + " " + enrolledStudents[i].getstdname);
            }
        }
        if (enrolledStudents.length == 0) {
            console.log(chalk.bgCyan(`\nSorry! No student record exist....\n`));
        }
        else if (studentIds.length == 0) {
            console.log(chalk.bgGreen(`\nSorry! No student exist whose fee is unpaid....\n`));
        }
        else {
            const ids = await inquirer.prompt([
                {
                    type: "list",
                    name: "stdid",
                    choices: studentIds,
                    message: "Please select student to pay tuition fee"
                },
            ]);
            let getids = ids.stdid.split(" ");
            //console.log(getids);
            var studentinDb;
            var arraylength = enrolledStudents.length;
            for (var i = 0; i < arraylength; i++) {
                if (enrolledStudents[i].getstdid == getids[0] && enrolledStudents[i].getstdpaidfee == 0) {
                    studentinDb = enrolledStudents[i];
                    var stdfeemsg = chalk.bgYellow(`\nStudent Name: ${studentinDb.getstdname}\nFee Paid: ${studentinDb.getstdpaidfee}\nTotal fee is:${studentinDb.getstdtotalfee}
                        \nPlease enter amount ${studentinDb.getstdtotalfee} to pay fee`);
                    var feemsg = await inquirer.prompt([
                        {
                            type: "number",
                            name: 'feevalue',
                            message: stdfeemsg,
                            validate: (element) => {
                                if (isNaN(element) || element <= 0 || element != studentinDb.getstdtotalfee) {
                                    return ("Please enter valid fee which is: " + studentinDb.getstdtotalfee);
                                }
                                else {
                                    return true;
                                }
                            }
                        },
                        {
                            type: "list",
                            name: 'bank',
                            choices: ["HBL", "NBP", "Askari Bank", "Meezan"],
                            message: "Please select Bank to submit fee...",
                        },
                        {
                            type: "list",
                            name: 'accounttype',
                            choices: ["Current", "Saving"],
                            message: "Please select Account Type...",
                        },
                        {
                            type: "number",
                            name: 'accountno',
                            message: "Please enter Account Number...",
                            validate: (element) => {
                                if (isNaN(element) || element <= 0) {
                                    return ("Please enter valid Account No...");
                                }
                                else {
                                    return true;
                                }
                            }
                        }
                    ]);
                    // var updatedb:number = feemsg.feevalue;
                    enrolledStudents[i].payfee = feemsg.feevalue;
                    enrolledStudents[i].bankname = feemsg.bank;
                    enrolledStudents[i].accounttype = feemsg.accounttype;
                    enrolledStudents[i].accountno = feemsg.accountno;
                    console.log(chalk.bgGreen(`\nStudent ${enrolledStudents[i].getstdname} fee paid successfully\n`));
                }
            }
        }
    }
    else if (question.option && question.option === "Show Status") {
        if (enrolledStudents.length == 0) {
            console.log(chalk.bgRedBright(`No student record exist...`));
        }
        else {
            enrolledStudents.forEach((element, index) => {
                console.log(chalk.green(`
                    ...............Student ${index + 1}.............
                        Student ID:     ${element.getstdid}
                        Student Name:   ${element.getstdname}
                        Father Name:    ${element.fathername}
                        CNIC:           ${element.cnic}
                        Age:            ${element.age}
                        Courses:        ${element.courses}
                        Total Fee:      ${element.getstdtotalfee}
                        Fee Submitted:  ${element.setfeesubmitted}
                        Bank Name:      ${element.bankname}
                        Account Type:   ${element.accounttype}
                        Account No:     ${element.accountno}
                    ..............................................\n
                        `));
            });
        }
    }
    else if (question.option && question.option === "Exit") {
        loop = false;
    }
}
// console.log(question.option);
