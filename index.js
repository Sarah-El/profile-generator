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
let teamArray = [];


// Employee questions array

const questions = [
    {
        type: "input",
        name: "name",
        message: "What is the team manager's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the team manager's ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the team manager's email address?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the team manager's office number?"
    },
    {
        type: "list",
        name: "role",
        message: "Add a team member (use arrow keys)",
        choices: ["Engineer", "Intern", "I don't want to add any more team members"]
    }
]


