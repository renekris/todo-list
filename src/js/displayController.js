const dateFns = require('date-fns');

import profilePicture from "../img/temp/profile-picture.png";
import { createProject } from "./createTask";
import { getTaskList, createTask } from "./createTask";

// DOM CACHE
const elContent = document.getElementById('content');
const elProfilePicture = Array.from(document.getElementsByClassName('profile-picture'))[0];
const elModal = document.getElementById('modal');
const elForm = document.getElementById('form');
//


function initialize() {
    const headerAddButton = Array.from(document.getElementsByClassName('manage-add'))[0];
    headerAddButton.addEventListener('pointerdown', eventAddCard);
    addProfileImage();
    createBase();
}

const draw = {
    addProject(data) {
        console.log(data);
        createProject(data);
    },
}

function createBase() {
    const taskList = getTaskList();
    const elTaskWrapper = elContent.appendChild(createTaskWrapper());
    const elTaskList = elTaskWrapper.appendChild(createTaskList(taskList));
    const elAddButton = elTaskList.appendChild(createButton());
}

function clearBase() {
    elContent.innerHTML = '';
}

function createTaskWrapper() {
    const taskWrapper = document.createElement('div');
    taskWrapper.className = 'task-wrapper';
    return taskWrapper;
}

function createTaskList(taskList) {
    const elTaskList = document.createElement('div');
    elTaskList.id = 'task-list';

    let taskCount = 0;
    for (let i = 0; i < taskList.length; i++) {
        const task = taskList[i];
        if (task.completed !== true) {
            elTaskList.appendChild(createCard(task));
            taskCount++;
        }
    }
    if (taskCount === 0) {
        const elSpan = elTaskList.insertBefore(document.createElement('span'), elTaskList.firstChild);
        elSpan.textContent = 'Looks like you have no remaining tasks!';
        elSpan.className = 'new-tasks-span';
    }
    return elTaskList;
}

function createCard(task) {
    // PARENT
    const elCard = document.createElement('div');
    elCard.className = 'card';
    elCard.dataset.id = task.id;

    // COMPLETE
    const elCardComplete = elCard.appendChild(document.createElement('div'));
    elCardComplete.className = 'card-complete';
    const elCardCompleteButton = elCardComplete.appendChild(document.createElement('button'));
    elCardCompleteButton.className = 'card-complete-button';
    elCardCompleteButton.addEventListener('pointerup', eventCompleteCard);

    // DATA PARENT
    const elCardData = elCard.appendChild(document.createElement('div'));
    elCardData.className = 'card-data';

    // TITLE
    const elTitle = elCardData.appendChild(document.createElement('p'));
    elTitle.className = 'card-title';
    elTitle.textContent = task.title;

    // DESCRIPTION
    const elDescription = elCardData.appendChild(document.createElement('p'));
    elDescription.className = 'card-description';
    elDescription.textContent = task.description;

    // DATE
    const elDate = elCardData.appendChild(document.createElement('p'));
    elDate.className = 'card-dueDate';
    if (dateFns.isValid(task.dueDate)) {
        elDate.textContent = dateFns.format(task.dueDate, 'yyyy-MM-dd');
    } else elDate.textContent = task.dueDate;

    // PRIORITY
    elCard.classList.add(`priority-${task.priority}`);

    // PROJECT
    const elProject = elCardData.appendChild(document.createElement('p'));
    elProject.className = 'card-project';
    // elProject.textContent = task.notes;

    // SETTINGS
    elCardData.appendChild(createCardElements());

    return elCard;
}

function createCardElements() {
    // PARENT
    const elCardSettings = document.createElement('div')
    elCardSettings.className = 'card-settings';

    // EDIT
    const elCardEdit = elCardSettings.appendChild(document.createElement('button'));
    elCardEdit.className = 'card-edit';
    elCardEdit.addEventListener('pointerup', eventEditCard)

    // MENU
    const elCardMenu = elCardSettings.appendChild(document.createElement('button'));
    elCardMenu.className = 'card-menu';
    elCardMenu.addEventListener('pointerup', eventMenuCard)

    return elCardSettings;
}

function eventCompleteCard(e) {
    const TARGET_ID = e.target.offsetParent.dataset.id;
    getTaskById(TARGET_ID).setCompleted(true);
    clearBase();
    createBase();
}

function getTaskById(id) {
    const taskList = getTaskList();
    for (let i = 0; i < taskList.length; i++) {
        const task = taskList[i];
        if (task.id === id) {
            return task;
        }
    }
}

function eventEditCard(e) {
    console.log(e.target.offsetParent.dataset.id);
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
    elTitle.className = 'title';
    elTitle.value = task.title;
    elTitle.type = 'text';

    // DESCRIPTION
    const elDescription = elParentDiv.appendChild(document.createElement('textarea'));
    elDescription.className = 'description';
    elDescription.value = task.description;

    // DATE
    const elDate = elParentDiv.appendChild(document.createElement('input'));
    elDate.className = 'dueDate';
    elDate.type = 'date';
    elDate.value = new Date(task.dueDate).toISOString().split('T')[0];

    // PRIORITY
    const elPriority = elParentDiv.appendChild(document.createElement('select'));
    elPriority.className = 'priority';
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

    // PARENT
    const elButtons = elParentDiv.appendChild(document.createElement('div'));
    elButtons.className = 'buttons';

    // CANCEL
    const elCancel = elButtons.appendChild(document.createElement('button'));
    elCancel.className = 'cancel';
    elCancel.textContent = 'Cancel';
    elCancel.addEventListener('pointerdown', eventCancelCard);

    // SUBMIT
    const elSubmit = elButtons.appendChild(document.createElement('button'));
    elSubmit.className = 'submit';
    elSubmit.textContent = 'Save';
    elSubmit.type = 'submit';
    elParentDiv.addEventListener('submit', eventSaveCard);

    return elParentDiv;
}

function eventSaveCard(e) {
    e.preventDefault();
    const TARGET_ID = e.target.offsetParent.dataset.id;
    const task = getTaskById(TARGET_ID);

    task.title = e.target[0].value;
    task.description = e.target[1].value;
    task.dueDate = e.target[2].value;
    task.priority = e.target[3].value;

    clearBase();
    createBase();
}

function eventCancelCard() {
    clearBase();
    createBase();
}

function eventMenuCard(e) {
    console.log(e.target.offsetParent.dataset.id);
    const TARGET_ID = e.target.offsetParent.dataset.id;
}

function createButton() {
    const elParentDiv = document.createElement('div');
    elParentDiv.className = 'add-button';
    const elButton = elParentDiv.appendChild(document.createElement('button'));
    elButton.textContent = 'Create a new task';
    elButton.addEventListener('pointerdown', eventAddCard);

    return elParentDiv;
}

function addProfileImage() {
    elProfilePicture.src = profilePicture;
}

function displayAddModal() {
    elModal.classList.remove('hidden');
    elModal.classList.add('blur');
    elModal.addEventListener('pointerdown', displayCancelModal);
    elForm.addEventListener('submit', eventSubmit);
}

function displayRemoveModal() {
    elModal.classList.add('hidden');
    elModal.classList.remove('blur');
    elModal.removeEventListener('pointerdown', displayCancelModal);
    elForm.removeEventListener('submit', eventSubmit);
}

function displayCancelModal(e) {
    if (e.target.id === 'modal') {
        displayRemoveModal();
    }
}

function eventSubmit(e) {
    e.preventDefault();

    const dirtyData = e.target;

    addCard(dirtyData);
    console.log(getTaskList());

    displayRemoveModal();
}

function addCard(dirtyData) {
    const data = serializeData(dirtyData);
    createTask(...data);
    clearBase();
    createBase();
}

function serializeData(dirtyData) {
    console.dir(`dirty data: ${dirtyData.dueDate.value}`)
    const data = [
        dirtyData.title.value,
        dirtyData.description.value,
        dirtyData.dueDate.value === ''
            ? Date.now()
            : Date.parse(dirtyData.dueDate.value),
        dirtyData.priority.value,
        dirtyData.notes.value,
        dirtyData.checklist.value,
    ]
    return data;
}

function eventAddCard() {
    displayAddModal();
    console.log('test');
}

export { initialize };
