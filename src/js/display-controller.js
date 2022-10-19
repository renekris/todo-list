import profilePicture from "../img/temp/profile-picture.png";

import { getProjectList, createProject, createTask, getTaskList, getAllUncompletedTasks } from "./data-db";
import { displayProject, createProjectWrapper, createAddTaskButton, createProjectCards } from "./display-controller-projects";
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
    elInboxButton.addEventListener('click', () => {
        currentProjectIndex = 0;
        displayProject(0);
    });

    const elTasksButton = document.getElementById('button-tasks');
    elTasksButton.addEventListener('click', () => {
        currentProjectIndex = 0;
        displayAllTasks();
    });

    const elTodayButton = document.getElementById('button-today');
    elTodayButton.addEventListener('click', () => {
        currentProjectIndex = 0;
        displayTodayTasks();
    })

    const elUpcomingButton = document.getElementById('button-upcoming');
    elUpcomingButton.addEventListener('click', () => {
        currentProjectIndex = 0;
        displayUpcomingTasks();
    })

    const elPriorities = document.getElementById('button-priority');
    elPriorities.addEventListener('click', () => {
        currentProjectIndex = 0;
        displayPriorities();
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
        elProjectButton.addEventListener('click', eventProjectButtonClicked);

        // TITLE
        const elProjectTitle = elProjectButton.appendChild(document.createElement('span'));
        elProjectTitle.textContent = project.title;
        elProjectTitle.classList.add('button-title');

        // LENGTH
        const elProjectTaskLength = elProjectButton.appendChild(document.createElement('span'));
        elProjectTaskLength.classList.add('button-length');
        if (project.getUncompletedTasks().length > 0) {
            elProjectTaskLength.textContent = project.getUncompletedTasks().length;
        } else {
            elProjectTaskLength.textContent = "";
        }
    }

    elProjectsDiv.appendChild(createAddProjectButton());
}

function createAddProjectButton() {
    const elButton = document.createElement('button');
    elButton.classList.add('add-project-button');
    // using click to make focus on form element possible
    elButton.addEventListener('click', eventDisplayModal);
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
    elLogo.addEventListener('click', () => {
        displayCurrentProject(0);
    });

    const elHeaderAddButton = Array.from(document.getElementsByClassName('add-task-button'))[0];
    // using click to make focus on form element possible
    elHeaderAddButton.addEventListener('click', eventDisplayModal);

    const elProfilePicture = Array.from(document.getElementsByClassName('profile-picture'))[0];
    elProfilePicture.src = profilePicture;
}

function displayAllTasks() {
    clearContent();
    const allTaskList = getTaskList();
    const elWrapper = elContent.appendChild(createProjectWrapper(
        'All Tasks',
        'All active tasks',
        allTaskList,
    ));
}

function displayTodayTasks() {
    clearContent();
    const taskList = getTodaysTasks();

    const elWrapper = elContent.appendChild(createProjectWrapper(
        'Today',
        'Tasks for today',
        taskList,
    ));
}

function getTodaysTasks() {
    const allTaskList = getAllUncompletedTasks();
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
    const elWrapper = elContent.appendChild(createProjectWrapper(
        'Upcoming 7 days',
        'Tasks for the upcoming 7 days',
        taskList,
    ));
}

function getUpcomingTasks() {
    const allTaskList = getAllUncompletedTasks();
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

function displayPriorities() {
    clearContent();
    const elWrapper = elContent.appendChild(createPriorities());
}

function createPriorities() {
    const elWrapper = document.createElement('div');
    elWrapper.className = 'wrapper';

    const priorityTasks = createPriority().priority();

    // TITLE
    const elListTitle = elWrapper.appendChild(createPriority().title('Priorities'));
    elListTitle.classList.add('priority-list-title');

    // DESCRIPTION
    const elPriorityOne = elWrapper.appendChild(createPriority().description("Priority 1"));
    elPriorityOne.classList.add('priority-1', 'priority-list');

    // TASKS where tasks = priority 1
    if (priorityTasks[0].length > 0) {
        const elTasks = elWrapper.appendChild(createProjectCards(priorityTasks[0], true));
        elTasks.dataset.from = 'priority';
    }

    // DESCRIPTION
    const elPriorityTwo = elWrapper.appendChild(createPriority().description("Priority 2"));
    elPriorityTwo.classList.add('priority-2', 'priority-list');

    // TASKS where tasks = priority 2
    if (priorityTasks[1].length > 0) {
        const elTasks = elWrapper.appendChild(createProjectCards(priorityTasks[1], true));
        elTasks.dataset.from = 'priority';
    }

    // DESCRIPTION
    const elPriorityThree = elWrapper.appendChild(createPriority().description("Priority 3"));
    elPriorityThree.classList.add('priority-3', 'priority-list');

    // TASKS where tasks = priority 3
    if (priorityTasks[2].length > 0) {
        const elTasks = elWrapper.appendChild(createProjectCards(priorityTasks[2], true));
        elTasks.dataset.from = 'priority';
    }
    // DESCRIPTION
    const elPriorityFour = elWrapper.appendChild(createPriority().description("Priority 4"));
    elPriorityFour.classList.add('priority-4', 'priority-list');

    // TASKS where tasks = priority 4
    if (priorityTasks[3].length > 0) {
        const elTasks = elWrapper.appendChild(createProjectCards(priorityTasks[3], true));
        elTasks.dataset.from = 'priority';
    }

    elWrapper.appendChild(createAddTaskButton());

    return elWrapper;
}

function createPriority() {
    function title(title) {
        const elTitle = document.createElement('h1');
        elTitle.textContent = title;
        elTitle.className = 'wrapper-title';
        return elTitle;
    }

    function description(description) {
        const elDescription = document.createElement('p');
        elDescription.textContent = description;
        elDescription.className = 'wrapper-description';
        return elDescription;
    }

    function priority() {
        const taskList = getAllUncompletedTasks();
        let priorityOne = [];
        let priorityTwo = [];
        let priorityThree = [];
        let priorityFour = [];
        for (let i = 0; i < taskList.length; i++) {
            const task = taskList[i];
            if (task.priority == 1) {
                priorityOne.push(task);
            }
            if (task.priority == 2) {
                priorityTwo.push(task);
            }
            if (task.priority == 3) {
                priorityThree.push(task);
            }
            if (task.priority == 4) {
                priorityFour.push(task);
            }
            console.log(task.priority);
        }

        return [priorityOne, priorityTwo, priorityThree, priorityFour];
    }

    return {
        title,
        description,
        priority,
    };
}

export {
    initialize,
    clearContent,
    displayCurrentProject,
    setProjectsToSidebar,
    updateSidebar,
    displayPriorities,
};
