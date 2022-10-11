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

    for (let i = 0; i < taskList.length; i++) {
        const task = taskList[i];
        if (task.completed === false) {
            elTaskList.appendChild(createCard(task));
        }
    }
    return elTaskList;
}

function createCard(task) {
    // PARENT
    const elCard = document.createElement('div');
    elCard.className = 'card';
    elCard.dataset.id = task.id;

    // TITLE
    const elTitle = elCard.appendChild(document.createElement('p'));
    elTitle.className = 'card-title';
    elTitle.textContent = task.title;

    // DESCRIPTION
    const elDescription = elCard.appendChild(document.createElement('p'));
    elDescription.className = 'card-description';
    elDescription.textContent = task.description;

    // DATE
    const elDate = elCard.appendChild(document.createElement('p'));
    elDate.className = 'card-dueDate';
    if (dateFns.isValid(task.dueDate)) {
        elDate.textContent = dateFns.format(task.dueDate, 'MM-dd-yyyy');
    } else elDate.textContent = task.dueDate;

    // PRIORITY
    elCard.classList.add(`priority-${task.priority}`);

    // NOTES
    const elNotes = elCard.appendChild(document.createElement('p'));
    elNotes.className = 'card-notes';
    elNotes.textContent = task.notes;

    // CHECKLIST
    const elChecklist = elCard.appendChild(document.createElement('p'));
    elChecklist.className = 'card-checkList';
    elChecklist.textContent = task.checklist;

    // SETTINGS
    elCard.appendChild(createCardElements());

    console.log(task);

    return elCard;
}

function createCardElements() {
    // PARENT
    const elCardSettings = document.createElement('div')
    elCardSettings.className = 'card-settings';

    // COMPLETE
    const elCardComplete = elCardSettings.appendChild(document.createElement('button'));
    elCardComplete.className = 'card-complete';
    elCardComplete.addEventListener('pointerdown', eventCompleteCard)

    // EDIT
    const elCardEdit = elCardSettings.appendChild(document.createElement('button'));
    elCardEdit.className = 'card-edit';
    elCardEdit.addEventListener('pointerdown', eventEditCard)

    // MENU
    const elCardMenu = elCardSettings.appendChild(document.createElement('button'));
    elCardMenu.className = 'card-menu';
    elCardMenu.addEventListener('pointerdown', eventMenuCard)

    return elCardSettings;
}

function eventCompleteCard(e) {
    console.log(e.target.offsetParent.dataset.id);
    const taskList = getTaskList();
    for (let i = 0; i < taskList.length; i++) {
        const task = taskList[i];
        const TARGET_ID = e.target.offsetParent.dataset.id;
        if (task.id === TARGET_ID) {
            task.setCompleted(true);
            break;
        }
    }
    clearBase();
    createBase();
}

function eventEditCard(e) {

}

function eventMenuCard(e) {

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
