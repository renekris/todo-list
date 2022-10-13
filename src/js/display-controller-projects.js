import { getProjectList } from "./data-db";
import { clearContent } from "./display-controller";
import { createTaskList } from "./display-controller-tasks";

const elContent = document.getElementById('content');

function displayProject(projectIndex) {
    clearContent();

    const elProject = elContent.appendChild(createProject(projectIndex));
}

function createProject(projectIndex) {
    const projects = getProjectList();
    const project = projects[projectIndex];

    // PARENT
    const elProject = document.createElement('div');
    elProject.className = 'project wrapper';

    // TITLE
    const elTitle = elProject.appendChild(document.createElement('h1'));
    elTitle.textContent = project.title;
    elTitle.className = 'project-title';

    // DESCRIPTION
    const elDescription = elProject.appendChild(document.createElement('p'));
    elDescription.textContent = project.description;
    elDescription.className = 'project-description';

    //// TASKS
    const elTasks = elProject.appendChild(document.createElement('div'));
    elTasks.className = 'project-tasks';

    elTasks.appendChild(createProjectCards(project.tasks));

    return elProject;
}

function createProjectCards(taskList) {
    const elTask = document.createElement('div');
    elTask.className = 'task';

    return createTaskList(taskList, 'project');
}

export { displayProject, createProject };
