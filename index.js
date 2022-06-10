// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

const inquirer = require('inquirer');
const mysql = require('mysql2');
const query = require('./database/queries')
const followUps = require('./inquiries/inquiries.js')

// setup the db connection

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Monstars',
      database: 'company_db'
    },
    console.log(`Connected to the classlist_db database.`)
  );

// make the primary route

const menuList = [
    'View all Employees', 
    'View all Managers',
    'View All Roles', 
    'View All Departments', 
    'Add Employee', 
    'Add Department',
    'Add Role',
    'Update Employee Role'
]

const [
    viewEmployee, 
    viewManagers,
    viewRole, 
    viewDept, 
    addEmployee, 
    addDept,
    addRole,
    updateEmployee] = menuList

function mainMenu() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'route',
            message: 'What would you like to do?',
            choices: menuList
        }
    ])
    .then((answer) => {
        let choice = answer.route;
        
        switch (choice) {
            case viewEmployee:
                query.allEmployees();
                mainMenu()
                break;
            case viewManagers:
                query.allManagers();
                mainMenu()
                break;
            case addEmployee:
                newEmployee()
                break;
            case updateEmployee:
                changeEmployee()
                break;
            case viewRole:
                query.allRoles();
                mainMenu();
                break;
            case viewDept:
                query.allDepts();
                mainMenu();
                break;
            case addDept:
                newDept();
                break;
            case addRole:
                newRole();
                break;
            }
    })
}

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
    let mgrData = await query.employeeList()
    mgrData.forEach(element => {
        mgrNames.push(element.employee)
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
        query.addEmployee(answer.first, answer.last, roleChoice, mgrChoice)
        mainMenu()
    })

}

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

async function changeEmployee() {
    let empChoice = null
    let empNames = []
    let empIds = []
    let empData = await query.employeeList()
    empData.forEach(element => {
        empNames.push(element.employee)
        empIds.push(element.id)
    });

    let roleChoice = null
    let roleNames = []
    let roleIds = []
    let roleData = await query.roleList()
    roleData.forEach(element => {
        roleNames.push(element.job_title)
        roleIds.push(element.id)
    });

    console.log(roleNames)
    console.log(empNames)

    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Select an employee to update: ',
            choices: empNames
        },
        {
            type: 'list',
            name: 'newRole',
            message: "Select the employee's new role: ",
            choices: roleNames
        }
    ])
    .then((answer) => {
        for (let i = 0; i < roleIds.length; i++) {
            if (roleNames[i] === answer.newRole) {
                roleChoice = roleIds[i];
            }
        }
        for (let i = 0; i < empIds.length; i++) {
            if (empNames[i] === answer.employee) {
                empChoice = empIds[i];
            }
        }
        query.updateEmployee(roleChoice, empChoice)
        console.log('Employee Updated')
        mainMenu()
    })
}

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

async function newRole() {

    let deptChoice = null
    let deptNames = []
    let deptIds = []
    let deptData = await query.deptList()
    deptData.forEach(element => {
        deptNames.push(element.name)
        deptIds.push(element.id)
    });

    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'What is the name of the new role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the new role?'
        },
        {
            type: 'list',
            name: 'dept',
            message: 'What department should this role be in?',
            choices: deptNames
        }
    ])
    .then((answer) => {
        for (let i = 0; i < deptIds.length; i++) {
            if (deptNames[i] === answer.dept) {
                deptChoice = deptIds[i];
            }
        }
        query.addRole(answer.role, answer.salary, deptChoice)
        mainMenu()
    })
}

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database

function newDept() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'dept',
            message: 'What is the name of the new department?'
        }
    ])
    .then((answer) => {
        query.addDept(answer.dept)
        mainMenu()
    })
}


mainMenu()

module.exports = {
    mainMenu
}
