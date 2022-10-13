import { getProjectList } from "./data-db";
import { clearContent } from "./display-controller";

const elContent = document.getElementById('content');

function displayProject(index) {
    clearContent();

    const elProject = elContent.appendChild(createProject(index));
}

function createProject(index) {
    const projects = getProjectList();
    const project = projects[index];

    // PARENT
    const elProject = document.createElement('div');
    elProject.className = 'project';

    console.log(index);
    // TITLE
    const elTitle = elProject.appendChild(document.createElement('h1'));
    elTitle.textContent = project.title;

    // DESCRIPTION
    const elDescription = elProject.appendChild(document.createElement('p'));
    elDescription.textContent = project.description;

    return elProject;
}

export { displayProject };
