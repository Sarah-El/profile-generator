const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// Empty team array
const teamMembers = [];


// Manager questions array

const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the team manager's name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is the team manager's ID?",
    },
    {
        type: "input",
        name: "email",
        message: "What is the team manager's email address?"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the team manager's office number?"
    }
];

// Engineer questions array

const engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the Engineer's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the Engineer's ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the Engineer's email address?"
    },
    {
        type: "input",
        name: "gitHub",
        message: "What is the the Engineer's GitHub username?"
    }
];

// Intern questions array

const internQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the Intern's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the Intern's ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the Intern's email address?"
    },
    {
        type: "input",
        name: "school",
        message: "What is the the Intern's school?"
    }
];

// Function to build team

function buildTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  };

// Function to add to team

function addToTeam () {
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "Add a team member (use arrow keys)",
            choices: ["Engineer", "Intern", "I don't want to add any more team members"]
        }
    ]).then((data) => {
        if (data.role === "Engineer") {
            addEngineer();
        } else if (data.role === "Intern") {
            addIntern();
        } else {
            buildTeam();
        }
    })
};

// Function to prompt manager questions

function addManager() {
    inquirer.prompt(managerQuestions).then((data) => {
        const manager = new Manager(data.name, data.id, data.email, data.officeNumber)
        teamMembers.push(manager);
        addToTeam();
    })
};

// Function to add Engineer

function addEngineer() {
    inquirer.prompt(engineerQuestions).then((data) => {
        const engineer = new Engineer(data.name, data.id, data.email, data.gitHub)
        teamMembers.push(engineer);
        addToTeam();
    })    
};

// Function to add intern

function addIntern() {
    inquirer.prompt(internQuestions).then((data) => {
        const intern = new Intern(data.name, data.id, data.email, data.school)
        teamMembers.push(intern);
        addToTeam();
    })    
};

// Calling function to initiate questions

addManager();

