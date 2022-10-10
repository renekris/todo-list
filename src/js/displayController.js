import profilePicture from "../img/temp/profile-picture.png";
import { createProject } from "./createTask";
import { getTaskList } from "./createTask";

// DOM CACHE
const elContent = document.getElementById('content');
const elProfilePicture = Array.from(document.getElementsByClassName('profile-picture'))[0];
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

function createTaskWrapper() {
    const taskWrapper = document.createElement('div');
    taskWrapper.className = 'task-wrapper';
    return taskWrapper;
}

function createTaskList(taskList) {
    const elTaskList = document.createElement('div');
    elTaskList.className = 'task-list';

    for (let i = 0; i < taskList.length; i++) {
        const task = taskList[i];
        elTaskList.appendChild(createCard(task));
    }
    return elTaskList;
}

function createCard(task) {
    const dateFns = require('date-fns');
    const elCard = document.createElement('div');
    elCard.className = 'card';

    const elTitle = elCard.appendChild(document.createElement('p'));
    elTitle.textContent = task.title;

    const elDescription = elCard.appendChild(document.createElement('p'));
    elDescription.textContent = task.description;

    const elDate = elCard.appendChild(document.createElement('p'));
    elDate.textContent = dateFns.format(task.dueDate, 'dd-MM-yyyy');

    const elPriority = elCard.appendChild(document.createElement('p'));
    elPriority.textContent = task.priority;

    const elNotes = elCard.appendChild(document.createElement('p'));
    elNotes.textContent = task.notes;

    const elChecklist = elCard.appendChild(document.createElement('p'));
    elChecklist.textContent = task.checklist;


    console.log(task);

    return elCard;
}

function createButton() {
    const elButton = document.createElement('button');
    elButton.addEventListener('pointerdown', addCardModal);
    const elParentDiv = document.createElement('div');
    elParentDiv.className = 'add-button';
    elParentDiv.appendChild(elButton);
    return elParentDiv;
}

function addProfileImage() {
    elProfilePicture.src = profilePicture;
}

function addCardModal() {
    console.log('test');
}

export { initialize };
