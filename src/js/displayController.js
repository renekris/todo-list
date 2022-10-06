import profilePicture from "../img/temp/profile-picture.png";
import { createProject } from "./createTask";

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
    const elTaskWrapper = elContent.appendChild(createTaskWrapper());
    const elTaskList = elTaskWrapper.appendChild(createTaskList());
    const elAddButton = elTaskList.appendChild(createButton());

}

function createTaskWrapper() {
    const taskWrapper = document.createElement('div');
    taskWrapper.className = 'task-wrapper';
    return taskWrapper;
}

function createTaskList() {
    const taskList = document.createElement('div');
    taskList.className = 'task-list';
    return taskList;
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
