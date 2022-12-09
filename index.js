const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const util = require('util');

// connect to sql db (find work around to displaying password)
const db = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    password: 'Christopher0720!', 
    database: 'employeesDB'
    },
    console.log(`Connected to the database`)
);

db.query = util.promisify(db.query);

// run init after establishing connection to db
db.connect(function (err) {
    if (err) throw err;
    init();
})

// initialization of inquirer prompting session
const init = async () => {
    try {
        // tell response to wait for prompt session initialization
        let response = await inquirer.prompt({
            name : "action",
            type : "list",
            message : "Which action would you like to perform?",
            choices : [
                'View all Departments',
                'View all Roles',
                'View all Employees',
                new inquirer.Separator(),
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                new inquirer.Separator(),
            ]
        });
// declare case expressions for selected action(response)
        switch (response.action) {
            case 'View all Departments':
                viewDept();
                break;
            case 'View all Roles':
                viewRole();
                break;
            case 'View all Employees':
                viewEmpl()
                break;
            case 'Add a Department':
                addDept();
                break;
            case 'Add a Role':
                // addRole();
                break;
            case 'Add an Employee':
                // function call to add an employee to table
                break;
            case 'Update an Employee Role':
                // function call to query for employee and change role
                break;
            
            default:
                console.log('I have no clue what you want from me');

        };
 
    } catch (err) {
        console.log(err);
        init();
    };
};

// VIEW functions

const viewDept = async () => {
    console.log('Department Data')
    try {
        db.query('SELECT * FROM department', function (err, res) {
            if (err) throw err;
            console.table(res);
            init();
        });
    } catch(err) {
        console.log(err);
        init()
        }  
};

const viewRole = async () => {
    console.log('Role Data')
    try {
        db.query('SELECT * FROM role', function (err, res) {
            if (err) throw err;
            console.table(res);
            init();
        });
    } catch(err) {
        console.log(err);
        init()
        }  
};

const viewEmpl = async () => {
    console.log('Employee Data')
    try {
        db.query('SELECT * FROM employee', function (err, res) {
            if (err) throw err;
            console.table(res);
            init();
        });
    } catch(err) {
        console.log(err);
        init()
        }  
};

// ADD functions

const addDept = async () => {
    try {
        console.log('Add Departments');

        let response = await inquirer.prompt([
            {
                name: 'deptName',
                type: 'input',
                message: 'What is the name of your new department?'
            }

        ]);

        let res = await db.query("INSERT INTO department SET ?", {
            name: response.deptName
        });
        console.log(`${response.deptName} successfully added to the departments database.\n`);
        init();
    } catch (err) {
        console.log(err);
        init();
    }
};

// const addRole = async () => {
//     try {
//         console.log('Add Role');

//         let depts = await db.query('SELECT * FROM department');

//         let response = await inquirer.prompt([
//             {
//                 name: 'roleTitle',
//                 type: 'input',
//                 message: 'What is the name of your new role?'
//             },
//             {
//                 name: 'salary',
//                 type: 'input',
//                 message: 'What is the salary of your new role?'
//             },
//             {
//                 name: 'dept',
//                 type: 'list',
//                 choices: depts.map((name) => {
//                     return {
//                         name: depts.name
//                     }
//                 })
//             }

//         ]);

//         let res = await db.query("INSERT INTO role SET ?", {
//             name: response.deptName
//         });
//         console.log(`${response.deptName} successfully added to the roles database.\n`);
//         init();
//     } catch (err) {
//         console.log(err);
//         init();
//     }
// }