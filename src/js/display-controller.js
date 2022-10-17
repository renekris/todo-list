import profilePicture from "../img/temp/profile-picture.png";

import { getProjectList, createProject, createTask, getTaskList } from "./data-db";
import { displayProject, createTasksWrapper } from './display-controller-projects';
import { eventDisplayModal } from "./display-controller-modal";
import { createTaskList } from "./display-controller-tasks";

const elContent = document.getElementById('content');

export let currentProjectIndex = 0;

function initialize() {
    // IMMUTABLE DEFAULT PROJECT
    createProject('Inbox', 'Active tasks', true);

    // TEMP PROJECTS
    createProject('Office', 'Ahh, more work at the office. Things that I have to finish at work.');
    createTask('Go outside', 'Go outside and touch some grass.', Date.now(), 1);
    createTask('Sleep', 'Jump onto your bed and take a nap.', 1643587200000, 4);

    addHeaderData();
    addSidebarData();
    displayProject(currentProjectIndex);
}

function addSidebarData() {
    const elTasksButton = document.getElementById('button-tasks');
    elTasksButton.addEventListener('pointerdown', () => displayAllTasks());

    const elInboxButton = document.getElementById('button-inbox');
    elInboxButton.addEventListener('pointerdown', () => displayProject(0));

    setProjectsToSidebar();
    // possibly add checklist and/or notes
}

function setProjectsToSidebar() {
    const elProjectsDiv = document.getElementById('projects');
    elProjectsDiv.innerHTML = '';

    const projects = getProjectList();

    // i = 1 to ignore the default project
    for (let i = 1; i < projects.length; i++) {
        const project = projects[i];
        const elProjectButton = elProjectsDiv.appendChild(document.createElement('button'));
        elProjectButton.textContent = project.title;
        elProjectButton.dataset.id = project.id;
        elProjectButton.addEventListener('pointerdown', eventProjectButtonClicked);
    }

    elProjectsDiv.appendChild(createAddProjectButton());
}

function createAddProjectButton() {
    const elButton = document.createElement('button');
    elButton.classList.add('add-project-button');
    // using pointerUP to make focus on form element possible
    elButton.addEventListener('pointerup', eventDisplayModal);
    return elButton;
}

function clearContent() {
    elContent.innerHTML = '';
}

function eventProjectButtonClicked(e) {
    const projects = getProjectList();
    const projectIndex = projects.findIndex(project => {
        return project.id === e.target.dataset.id;
    })
    currentProjectIndex = projectIndex;
    displayProject(projectIndex);
}

function displayCurrentProject(overwriteProjectIndex = null) {
    currentProjectIndex = overwriteProjectIndex ?? currentProjectIndex;
    displayProject(currentProjectIndex);
}

function addHeaderData() {
    const elLogo = Array.from(document.getElementsByClassName('logo'))[0];
    elLogo.addEventListener('pointerdown', () => {
        displayCurrentProject(0);
    });

    const elHeaderAddButton = Array.from(document.getElementsByClassName('add-task-button'))[0];
    // using pointerUP to make focus on form element possible
    elHeaderAddButton.addEventListener('pointerup', eventDisplayModal);

    const elProfilePicture = Array.from(document.getElementsByClassName('profile-picture'))[0];
    elProfilePicture.src = profilePicture;
}

function displayAllTasks() {
    clearContent();
    const allTaskList = getTaskList();
    const elWrapper = elContent.appendChild(createTasksWrapper('All tasks', 'Here are all of your active tasks'));

    elWrapper.appendChild(createTaskList(allTaskList));
}

export { initialize, clearContent, displayCurrentProject, setProjectsToSidebar };
