import profilePicture from "../img/temp/profile-picture.png";
import { createProject } from "./createTask";

// DOM CACHE
const elContent = document.getElementById('content');
const elProfilePicture = Array.from(document.getElementsByClassName('profile-picture'))[0];


// EVENT LISTENERS


const draw = {
    initialize() {
        createTaskWrapper();
        this.addProfileImage();
    },
    addProject(data) {
        console.log(data);
        createProject(data);
    },
    addButton() {
        const elButton = document.createElement('button');
        elButton.addEventListener('pointerdown', this.addCard);

        const elParentDiv = document.createElement('div');
        elParentDiv.className = 'add-button';
        elParentDiv.appendChild(elButton);
        elContent.appendChild(elParentDiv);
    },
    addCard() {
        console.log('test');
    },
    addProfileImage() {
        elProfilePicture.src = profilePicture;
    },
}


function createTaskWrapper() {
    const taskWrapper = document.createElement('div');
    taskWrapper.className = 'task-wrapper';

    elContent.appendChild(taskWrapper);
}

export default draw;
