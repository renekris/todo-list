import profilePicture from "../img/temp/profile-picture.png";

import { getProjectList } from "./data-db";
import { createBase as createTaskBase, eventAddModal } from './display-controller-tasks';
import { displayProject } from './display-controller-projects';

const elContent = document.getElementById('content');

function initialize() {
    addHeaderData();
    addSidebarData();
    createTaskBase();
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

function eventDisplayHome() {
    clearContent();
    createTaskBase();
}

function addHeaderData() {
    const elLogo = Array.from(document.getElementsByClassName('logo'))[0];
    elLogo.addEventListener('pointerdown', eventDisplayHome);

    const elHeaderAddButton = Array.from(document.getElementsByClassName('manage-add'))[0];
    elHeaderAddButton.addEventListener('pointerdown', eventAddModal);

    const elProfilePicture = Array.from(document.getElementsByClassName('profile-picture'))[0];
    elProfilePicture.src = profilePicture;
}

export { initialize, clearContent };
