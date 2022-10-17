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

    const elWrapper = createTasksWrapper(project.title, project.description);

    elWrapper.appendChild(createProjectCards(project.tasks));

    return elWrapper;
}

function createTasksWrapper(title, description) {
    const elWrapper = document.createElement('div');
    elWrapper.className = 'wrapper';

    // TITLE
    const elTitle = elWrapper.appendChild(document.createElement('h1'));
    elTitle.textContent = title;
    elTitle.className = 'wrapper-title';

    // DESCRIPTION
    const elDescription = elWrapper.appendChild(document.createElement('p'));
    elDescription.textContent = description;
    elDescription.className = 'wrapper-description';

    return elWrapper
}

function createProjectCards(taskList) {
    const elTask = document.createElement('div');
    elTask.className = 'task';

    return createTaskList(taskList);
}

export { displayProject, createProject, createTasksWrapper };
