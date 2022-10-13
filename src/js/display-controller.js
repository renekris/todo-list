import profilePicture from "../img/temp/profile-picture.png";

import { createBase as createTaskBase, eventAddModal } from './display-controller-tasks';

function initialize() {
    addHeaderData();
    addSidebarData();
    createTaskBase();
}

function addSidebarData() {

}

function addHeaderData() {
    const headerAddButton = Array.from(document.getElementsByClassName('manage-add'))[0];
    headerAddButton.addEventListener('pointerdown', eventAddModal);

    const elProfilePicture = Array.from(document.getElementsByClassName('profile-picture'))[0];
    elProfilePicture.src = profilePicture;
}

export { initialize };
