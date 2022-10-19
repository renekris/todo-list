const dateFns = require('date-fns');

import { getTaskList, getProjectList, getProjectById } from "./data-db";
import { displayPriorities, updateSidebar } from "./display-controller";

let taskCount = 0;

function createTaskList(taskList, doCounting = true) {
    const elTaskList = document.createElement('div');
    elTaskList.id = 'task-list';

    if (doCounting !== true) {
        taskCount = 0;
        // makes it so new task span wont come up
    } else {
        taskCount = Number.POSITIVE_INFINITY;
    }

    for (let i = 0; i < taskList.length; i++) {
        const task = taskList[i];
        if (task.isCompleted !== true) {
            elTaskList.appendChild(createCard(task));
            taskCount++;
        }
    }
    canCreateNewTaskSpan(elTaskList);

    return elTaskList;
}

function canCreateNewTaskSpan(elTaskList = document.getElementById('task-list')) {
    if (taskCount === 0) {
        const elSpan = elTaskList.insertBefore(document.createElement('span'), elTaskList.firstChild);
        elSpan.textContent = 'How about we create some new tasks!';
        elSpan.className = 'new-tasks-span';
    }
}

function createCard(task) {
    const elCard = document.createElement('div');
    elCard.className = 'card';
    elCard.dataset.id = task.id;

    elCard.appendChild(createCardCompleteButton(elCard));
    elCard.appendChild(createCardData(task, elCard));

    return elCard;
}

function createCardCompleteButton() {
    const elCardComplete = document.createElement('div');
    elCardComplete.className = 'card-complete';
    const elCardCompleteButton = elCardComplete.appendChild(document.createElement('button'));
    elCardCompleteButton.className = 'card-complete-button';
    elCardCompleteButton.addEventListener('click', eventCompleteCard);

    return elCardComplete;
}

function createCardData(task, elParent) {
    // DATA PARENT
    const elCardData = document.createElement('div');
    elCardData.className = 'card-data';

    // TITLE
    const elTitle = elCardData.appendChild(document.createElement('p'));
    elTitle.className = 'card-title';
    elTitle.textContent = task.title;
    elTitle.title = task.title;

    // DESCRIPTION
    const elDescription = elCardData.appendChild(document.createElement('p'));
    elDescription.className = 'card-description';
    elDescription.textContent = task.description;
    elDescription.title = task.description;

    // DATE
    const elDate = elCardData.appendChild(document.createElement('p'));
    elDate.className = 'card-dueDate';

    const date = new Date(task.dueDate);
    if (dateFns.isValid(date)) {
        elDate.textContent = dateFns.format(date, 'Y LLL dd ');

        const elDaySpan = elDate.appendChild(document.createElement('span'));
        elDaySpan.className = 'day-span';
        elDaySpan.textContent = dateFns.format(date, '(E)');
    } else {
        elDate.textContent = task.dueDate;
    }

    // PRIORITY
    elParent.classList.add(`priority-${task.priority}`);

    // PROJECT
    const elProject = elCardData.appendChild(document.createElement('p'));
    elProject.className = 'card-project';
    elProject.textContent = getProjectById(task.parentProjectId).title;

    // SETTINGS
    elCardData.appendChild(createCardButtons());

    return elCardData;
}

function createCardButtons() {
    // PARENT
    const elCardButtons = document.createElement('div')
    elCardButtons.className = 'card-settings';

    // EDIT
    const elCardEdit = elCardButtons.appendChild(document.createElement('button'));
    elCardEdit.className = 'card-edit';
    elCardEdit.addEventListener('click', eventEditCard);

    return elCardButtons;
}

function eventCompleteCard(e) {
    const TARGET_ID = e.target.offsetParent.dataset.id;
    getTaskById(TARGET_ID).setIsCompleted(true);

    taskCount--;
    canCreateNewTaskSpan();

    e.target.offsetParent.remove();
    updateSidebar();
}

function getTaskById(id) {
    return getTaskList().find(task => task.id === id);
}

function eventEditCard(e) {
    const TARGET_ID = e.target.offsetParent.dataset.id;
    const elCardData = document.querySelector(`[data-id=\'${TARGET_ID}\'] .card-data`);
    const elCard = elCardData.offsetParent;
    elCard.classList.remove('card');
    elCard.classList.add('editing'); //replace everything with value
    elCard.innerHTML = '';

    const task = getTaskById(TARGET_ID);
    elCard.appendChild(createCardEdit(task));
}

function createCardEdit(task) {
    const elParentDiv = document.createElement('form');

    // TITLE
    const elTitle = elParentDiv.appendChild(document.createElement('input'));
    elTitle.className = 'edit-title';
    elTitle.value = task.title;
    elTitle.type = 'text';

    // DESCRIPTION
    const elDescription = elParentDiv.appendChild(document.createElement('textarea'));
    elDescription.className = 'edit-description';
    elDescription.value = task.description;

    // DATE
    const elDate = elParentDiv.appendChild(document.createElement('input'));
    elDate.className = 'edit-dueDate';
    elDate.type = 'date';
    elDate.value = new Date(task.dueDate).toISOString().split('T')[0];

    // PRIORITY
    const elPriority = elParentDiv.appendChild(document.createElement('select'));
    elPriority.className = 'edit-priority';
    const elOptionPriority1 = elPriority.appendChild(document.createElement('option'));
    elOptionPriority1.value = '1';
    elOptionPriority1.text = 'Priority 1';
    const elOptionPriority2 = elPriority.appendChild(document.createElement('option'));
    elOptionPriority2.value = '2';
    elOptionPriority2.text = 'Priority 2';
    const elOptionPriority3 = elPriority.appendChild(document.createElement('option'));
    elOptionPriority3.value = '3';
    elOptionPriority3.text = 'Priority 3';
    const elOptionPriority4 = elPriority.appendChild(document.createElement('option'));
    elOptionPriority4.value = '4';
    elOptionPriority4.text = 'Priority 4';
    for (let i = 0; i < elPriority.length; i++) {
        const element = elPriority[i];
        if (task.priority == element.value) {
            element.selected = true;
            break;
        }
    }

    // PROJECT
    const projects = getProjectList();
    const elProjectSelect = elParentDiv.appendChild(document.createElement('select'));
    elProjectSelect.className = 'edit-select-project';
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        const elOption = elProjectSelect.appendChild(document.createElement('option'));
        elOption.text = project.title;
        elOption.value = project.id;
        if (project.id === task.parentProjectId) {
            elOption.selected = true;
        }
    }

    // BUTTONS PARENT
    const elButtons = elParentDiv.appendChild(document.createElement('div'));
    elButtons.className = 'edit-buttons';

    // CANCEL
    const elCancel = elButtons.appendChild(document.createElement('button'));
    elCancel.className = 'edit-cancel';
    elCancel.textContent = 'Cancel';
    elCancel.addEventListener('click', eventCancelCard);

    // SUBMIT
    const elSubmit = elButtons.appendChild(document.createElement('button'));
    elSubmit.className = 'edit-submit';
    elSubmit.textContent = 'Save';
    elSubmit.type = 'submit';
    elParentDiv.addEventListener('submit', eventSaveCard);

    return elParentDiv;
}

function eventSaveCard(e) {
    e.preventDefault();
    const TARGET_ID = e.target.offsetParent.dataset.id;
    const task = getTaskById(TARGET_ID);
    const elCard = e.target.offsetParent;

    task.title = e.target[0].value;
    task.description = e.target[1].value;
    task.dueDate = e.target[2].value;
    task.priority = e.target[3].value;

    if (task.parentProjectId !== e.target[4].value) {
        task.setParentProjectId(e.target[4].value);
        // To make it look like card gets removed if card is being viewed from a project and its value gets changed
        elCard.remove();

        taskCount--;
        canCreateNewTaskSpan();


    }

    // To refresh priorities view if updating from there
    if (e.target?.offsetParent?.parentElement?.dataset?.from === 'priority') {
        displayPriorities();
    }

    elCard.replaceWith(createCard(task));
    updateSidebar();
}

function eventCancelCard(e) {
    const TARGET_ID = e.target.offsetParent.dataset.id;
    const task = getTaskById(TARGET_ID);
    const elCard = e.target.offsetParent;
    elCard.replaceWith(createCard(task));
}

function eventMenuCard(e) {
    console.log(e.target.offsetParent.dataset.id);
    const TARGET_ID = e.target.offsetParent.dataset.id;
}

export { createTaskList };
