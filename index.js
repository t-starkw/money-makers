const inquirer = require('inquirer');
const util = require('util');

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
                // function call to display dept. table
                break;
            case 'View all Roles':
                // function call to display role table
                break;
            case 'View all Employees':
                // function call to display empl table
                break;
            case 'Add a Department':
                // function call to add a dept to table
                break;
            case 'Add a Role':
                // function call to add a role to table
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
init()