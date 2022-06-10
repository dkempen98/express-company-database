// Want to start this file off with letting the viewer know I have some prior experience with SQL so I know how to do some
// things we have not gone over in class

const mysql = require('mysql2');
const home = require('../index');


const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'company_db'
    })

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids

function allDepts () {

    db.query(`SELECT
    d.id AS 'Department ID',
    d.name AS 'Department Name'

    FROM departments d;`, (err, results) => {
        console.log('')
        console.table(results)
    })
}

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

function allRoles (){
    db.query(`SELECT 
    r.id AS 'Role ID',
    r.job_title AS 'Job Title',
    departments.name AS 'Department',
    r.salary AS 'Salary'

    FROM roles r
    JOIN departments ON r.department_id = departments.id;`, (err, results) => {
        console.log('')
        console.table(results)
    })
}
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including
// employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

function allEmployees() {
    db.query(`SELECT
    e.id AS 'Employee ID',
    e.first_name AS 'First Name',
    e.last_name AS 'Last Name',
    roles.job_title AS 'Job Title',
    departments.name AS 'Department',
    roles.salary AS 'Salary',
    mgr.id AS 'Manager ID',
    CONCAT(mgr.first_name, ' ', mgr.last_name) AS 'Manager'

    FROM employees e
    JOIN employees mgr ON e.manager_id = mgr.id
    JOIN roles ON e.role_id = roles.id
    JOIN departments ON roles.department_id = departments.id
    
    ORDER BY e.id;`, (err, results) => {
        console.log('')
        console.table(results)
    })
}

function allManagers() {
    db.query(`SELECT
    id AS 'Manager ID',
    CONCAT(first_name, ' ', last_name) AS 'Manager'

    FROM employees
    
    WHERE is_manager = 1;`, (err, results) => {
        console.log('')
        console.table(results)
    })
}

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
function addDept (varName) {
    db.query(`INSERT INTO departments(name)
    VALUES ('${varName}');`, (err, results) => {
        console.log('Department Added')
        return results
    })
}

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
function addRole (varTitle, varSalary, varDept) {
    db.query(`INSERT INTO roles(job_title, salary, department_id)
    VALUES ('${varTitle}', ${varSalary}, ${varDept});`, (err, results) => {
        console.log('Role Added')
        return results
    })
}
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addEmployee(varFirst, varLast, varRole, varManager) {
db.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ('${varFirst}', '${varLast}', '${varRole}',  '${varManager}');`, (err, results) => {
    console.log('Employee Added')
    return
    })
}

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
function updateEmployee(varRole, varEmployee) {
    db.query(`UPDATE employees
    SET role_id = ${varRole}
    WHERE id = ${varEmployee};`, (err, results) => {
        return results
    })
}
async function roleList() {
    return new Promise ((resolve, reject) => {
        db.query(`SELECT
        id,
        job_title
        FROM roles`, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results)
            }
        })
    })
}

async function employeeList() {
    return new Promise ((resolve, reject) => {
        db.query(`SELECT
        id,
        CONCAT(first_name, ' ', last_name) AS 'employee'
        FROM employees`, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

async function deptList() {
    return new Promise ((resolve, reject) => {
        db.query(`SELECT
        id,
        name
        FROM departments`, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

module.exports = {
    allDepts,
    allRoles,
    allEmployees,
    allManagers,
    addDept,
    addRole,
    addEmployee,
    updateEmployee,
    roleList,
    employeeList,
    deptList
}
