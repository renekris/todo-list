import { getProjectList } from "./data-db";
import { clearContent } from "./display-controller";
import { createTaskList } from "./display-controller-tasks";
import { eventDisplayModal } from "./display-controller-modal";

const elContent = document.getElementById('content');

function displayProject(projectIndex) {
    clearContent();

    const elProject = elContent.appendChild(createProject(projectIndex));
}

function createProject(projectIndex) {
    const projects = getProjectList();
    const project = projects[projectIndex];

    const elProjectWrapper = createProjectWrapper(
        project.title,
        project.description,
        project.tasks,
    );

    return elProjectWrapper;
}

function createProjectWrapper(title, description, tasks) {
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

    // TASKS
    elWrapper.appendChild(createProjectCards(tasks));

    // BUTTON
    elWrapper.appendChild(createAddTaskButton());

    return elWrapper
}

function createProjectCards(taskList, doCounting) {
    const elTask = document.createElement('div');
    elTask.className = 'task';

    return createTaskList(taskList, doCounting);
}

function createAddTaskButton() {
    const elParentDiv = document.createElement('div');
    elParentDiv.className = 'add-button';
    const elButton = elParentDiv.appendChild(document.createElement('button'));
    elButton.textContent = 'Create a new task';
    elButton.classList.add('add-task-button');
    elButton.addEventListener('pointerup', eventDisplayModal);

    return elParentDiv;
}

export { displayProject, createProject, createProjectWrapper, createAddTaskButton, createProjectCards };
