import { getProjectList } from "./data-db";
import { clearContent, updateSidebar } from "./display-controller";
import { createTaskList } from "./display-controller-tasks";
import { eventDisplayModal } from "./display-controller-modal";
import { deleteProject } from "./data-db";

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
        project.id,
        !project.isDefault,
    );

    return elProjectWrapper;
}

function createProjectWrapper(title, description, tasks, id, isActualProject = false) {
    const elWrapper = document.createElement('div');
    elWrapper.className = 'wrapper';

    // TITLE DIV
    const elTitleDiv = elWrapper.appendChild(document.createElement('div'));
    elTitleDiv.classList.add('title-div');

    //// TITLE
    const elTitle = elTitleDiv.appendChild(document.createElement('h1'));
    elTitle.textContent = title;
    elTitle.className = 'wrapper-title';

    if (isActualProject) {
        //// SETTINGS
        const elSettings = elTitleDiv.appendChild(document.createElement('div'));
        elSettings.classList.add('project-settings');

        //// DELETE
        const elDelete = elSettings.appendChild(document.createElement('button'));
        elDelete.classList.add('delete-project-button');
        elDelete.dataset.id = id;
        elDelete.addEventListener('click', (id) => {
            deleteProject(id);
            updateSidebar();
            displayProject(0);
        });
    }


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
    elButton.addEventListener('click', eventDisplayModal);

    return elParentDiv;
}

export { displayProject, createProject, createProjectWrapper, createAddTaskButton, createProjectCards };
