const inquirer = require('inquirer')
const query = require('../database/queries')


// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, 
// and manager, and that employee is added to the database



async function newEmployee() {
    const questions = [
        'Employee First Name: ',
        'Employee Last Name: ',
        'Employee Role: ',
        "Employee's Manager: "];

    const [
        firstQ,
        lastQ,
        roleQ,
        managerQ
    ] = questions;

    let roleChoice = null
    let roleNames = []
    let roleIds = []
    let roleData = await query.roleList()
    roleData.forEach(element => {
        roleNames.push(element.job_title)
        roleIds.push(element.id)
    });

    let mgrChoice = null
    let mgrNames = []
    let mgrIds = []
    let mgrData = await query.mgrList()
    mgrData.forEach(element => {
        mgrNames.push(element.manager)
        mgrIds.push(element.id)
    });


    inquirer.prompt([
        {
            type: 'input',
            name: 'first',
            message: firstQ
        },
        {
            type: 'input',
            name: 'last',
            message: lastQ
        },
        {
            type: 'list',
            name: 'role',
            message: roleQ,
            choices: roleNames
        },
        {
            type: 'list',
            name: 'manager',
            message: managerQ,
            choices: mgrNames
        }
    ])
    .then((answer) => {
        for (let i = 0; i < roleIds.length; i++) {
            if (roleNames[i] === answer.role) {
                roleChoice = roleIds[i];
                console.log(roleChoice)
            }
        }
        for (let i = 0; i < mgrIds.length; i++) {
            if (mgrNames[i] === answer.manager) {
                mgrChoice = mgrIds[i];
                console.log(mgrChoice)
            }
        }
        console.log(answer)
        query.addEmployee(answer.first, answer.last, roleChoice, mgrChoice)
    })
    .then = () => mainPage.mainMenu();
}

module.exports = {
    newEmployee
}