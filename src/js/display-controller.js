import profilePicture from "../img/temp/profile-picture.png";

import { getProjectList, createProject, createTask } from "./data-db";
import { eventAddModal } from './display-controller-tasks';
import { displayProject } from './display-controller-projects';

const elContent = document.getElementById('content');

export let currentProjectIndex = 0;

function initialize() {
    // IMMUTABLE DEFAULT PROJECT
    createProject('Default', 'Default', true);

    // TEMP PROJECTS
    createProject('Office', 'Ahh, more work at the office. Things that I have to finish at work.');
    createTask('Go outside', 'Go outside and touch some grass.', Date.now(), 1);
    createTask('Sleep', 'Jump onto your bed and take a nap.', 1643587200000, 4);

    addHeaderData();
    addSidebarData();
    displayProject(currentProjectIndex);
}

function addSidebarData() {
    setProjectsToSidebar();
    // possibly add checklist and/or notes
}

function setProjectsToSidebar() {
    const elProjectsDiv = document.getElementById('projects');
    elProjectsDiv.innerHTML = '';

    const projects = getProjectList();
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        const elProjectButton = document.createElement('button');
        elProjectButton.textContent = project.title;
        elProjectButton.dataset.id = project.id;
        elProjectButton.addEventListener('pointerdown', eventProjectButtonClicked);

        elProjectsDiv.appendChild(elProjectButton);
    }
}

function clearContent() {
    elContent.innerHTML = '';
}

function eventProjectButtonClicked(e) {
    const projects = getProjectList();
    const projectIndex = projects.findIndex(project => {
        return project.id === e.target.dataset.id;
    })
    displayProject(projectIndex);
}

function displayCurrentProject() {
    displayProject(0);
}

function addHeaderData() {
    const elLogo = Array.from(document.getElementsByClassName('logo'))[0];
    elLogo.addEventListener('pointerdown', () => {
        displayCurrentProject();
    });

    const elHeaderAddButton = Array.from(document.getElementsByClassName('manage-add'))[0];
    elHeaderAddButton.addEventListener('pointerdown', eventAddModal);

    const elProfilePicture = Array.from(document.getElementsByClassName('profile-picture'))[0];
    elProfilePicture.src = profilePicture;
}

export { initialize, clearContent, displayCurrentProject };
