import profilePicture from "../img/temp/profile-picture.png";

import { getProjectList, createProject, createTask, getTaskList, getAllUncompletedTasks } from "./data-db";
import { displayProject, createTasksWrapper } from "./display-controller-projects";
import { eventDisplayModal } from "./display-controller-modal";

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
    const elInboxButton = document.getElementById('button-inbox');
    elInboxButton.addEventListener('pointerdown', () => {
        currentProjectIndex = 0;
        displayProject(0);
    });

    const elTasksButton = document.getElementById('button-tasks');
    elTasksButton.addEventListener('pointerdown', () => {
        currentProjectIndex = 0;
        displayAllTasks();
    });

    const elTodayButton = document.getElementById('button-today');
    elTodayButton.addEventListener('pointerdown', () => {
        currentProjectIndex = 0;
        displayTodayTasks();
    })

    const elUpcomingButton = document.getElementById('button-upcoming');
    elUpcomingButton.addEventListener('pointerdown', () => {
        currentProjectIndex = 0;
        displayUpcomingTasks();
    })

    updateSidebar();
    // possibly add checklist and/or notes
}

function updateSidebar() {
    setTaskLengthsToSidebar();
    setProjectsToSidebar();
}

function setTaskLengthsToSidebar() {
    const inboxLength = getProjectList()[0].getUncompletedTasks().length;
    const elInboxLength = document.getElementById('inbox-length');
    checkSetLength(inboxLength, elInboxLength);

    const allTasksLength = getAllUncompletedTasks().length;
    const elAllTasksLength = document.getElementById('all-tasks-length');
    checkSetLength(allTasksLength, elAllTasksLength);

    const todayLength = getTodaysTasks().length;
    const elTodayLength = document.getElementById('today-length');
    checkSetLength(todayLength, elTodayLength);

    const upcomingLength = getUpcomingTasks().length;
    const elUpcoming = document.getElementById('upcoming-length');
    checkSetLength(upcomingLength, elUpcoming);
}

function checkSetLength(length, lengthElement) {
    if (length > 0) {
        lengthElement.textContent = length;
    } else {
        lengthElement.textContent = '';
    }
}

function setProjectsToSidebar() {
    const elProjectsDiv = document.getElementById('projects');
    elProjectsDiv.innerHTML = '';

    const projects = getProjectList();

    // i = 1 to ignore the default project
    for (let i = 1; i < projects.length; i++) {
        const project = projects[i];
        const elProjectButton = elProjectsDiv.appendChild(document.createElement('button'));
        elProjectButton.classList.add('project-button');
        elProjectButton.title = project.title;
        elProjectButton.dataset.id = project.id;
        elProjectButton.addEventListener('pointerdown', eventProjectButtonClicked);

        const elProjectTitle = elProjectButton.appendChild(document.createElement('span'));
        elProjectTitle.textContent = project.title;
        elProjectTitle.classList.add('button-title');

        const taskLength = elProjectButton.appendChild(document.createElement('span'));
        taskLength.classList.add('button-length');
        if (project.getUncompletedTasks().length > 0) {
            taskLength.textContent = project.getUncompletedTasks().length;
        } else {
            taskLength.textContent = " ";
        }
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
    const elWrapper = elContent.appendChild(createTasksWrapper(
        'All Tasks',
        'All active tasks',
        allTaskList,
    ));
}

function displayTodayTasks() {
    clearContent();
    const taskList = getTodaysTasks();

    const elWrapper = elContent.appendChild(createTasksWrapper(
        'Today',
        'Tasks for today',
        taskList,
    ));
}

function getTodaysTasks() {
    const allTaskList = getTaskList();
    const taskList = allTaskList.filter(task => {
        const currentDate = new Date(Date.now()).toISOString().split('T')[0];
        const taskDate = new Date(task.dueDate).toISOString().split('T')[0];
        return currentDate === taskDate;
    });

    return taskList;
}

function displayUpcomingTasks() {
    clearContent();
    const taskList = getUpcomingTasks();
    const elWrapper = elContent.appendChild(createTasksWrapper(
        'Upcoming 7 days',
        'Tasks for the upcoming 7 days',
        taskList,
    ));
}

function getUpcomingTasks() {
    const allTaskList = getTaskList();
    const taskList = allTaskList.filter(task => {
        const UNIX_WEEK_IN_SECONDS = 604800;
        const currentDateUnix = new Date(new Date(Date.now()).toISOString().split('T')[0]).getTime() / 1000;
        const currentDateWithinAWeekUnix = currentDateUnix + UNIX_WEEK_IN_SECONDS;
        const taskDateUnix = Math.floor(new Date(task.dueDate).getTime() / 1000.0);

        return taskDateUnix >= currentDateUnix
            && taskDateUnix <= currentDateWithinAWeekUnix;
    });

    return taskList;
}

export { initialize, clearContent, displayCurrentProject, setProjectsToSidebar, updateSidebar };
