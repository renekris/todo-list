import { getProjectList, createTask } from "./data-db";
import { displayCurrentProject, currentProjectIndex } from "./display-controller";

function eventDisplayModal(e) {
    displayModal('task'); //TEMP
}

function eventSubmit(e) {
    e.preventDefault();
    console.dir(e.target);
    if (e.target.offsetParent.className === 'task') {
        const taskData = serializeTaskData(e.target);
        createTask(...taskData);
    }

    removeModal();
    displayCurrentProject();
}

function serializeTaskData(targetElement) {
    return [
        targetElement.title.value,
        targetElement.description.value,
        targetElement.dueDate.value === ''
            ? Date.now()
            : Date.parse(targetElement.dueDate.value),
        targetElement.priority.value,
        targetElement.project.value,
    ]
}

function displayModal(type) {
    const elModal = document.body.appendChild(document.createElement('div'));
    elModal.id = 'modal';
    elModal.addEventListener('pointerdown', (e) => {
        if (e.target.id === 'modal') {
            removeModal();
        }
    })

    const elModalContent = elModal.appendChild(document.createElement('div'));
    elModalContent.classList.add('modal-content');

    switch (type) {
        case 'task':
            elModal.classList.add(type); //adding caller type identifier to recognize submit type
            elModalContent.appendChild(displayCreateTaskModal());
            break;
        case 'project':
            break;
        default:
            break;
    }
}

function removeModal() {
    const elModal = document.getElementById('modal');
    elModal.remove();
}

function displayCreateTaskModal() {
    const elFieldset = document.createElement('fieldset');
    const elForm = elFieldset.appendChild(document.createElement('form'));
    elForm.id = 'form';

    elForm.addEventListener('submit', eventSubmit);

    // TITLE
    const elTitleLabel = elForm.appendChild(document.createElement('label'));
    elTitleLabel.textContent = 'Title: ';
    elTitleLabel.htmlFor = 'title';
    const elTitle = elTitleLabel.appendChild(document.createElement('input'));
    elTitle.name = 'title';
    elTitle.type = 'text';
    elTitle.id = 'title';

    // DESCRIPTION
    const elDescriptionLabel = elForm.appendChild(document.createElement('label'));
    // elDescriptionLabel.insertAdjacentText('afterbegin', 'Description: ');
    elDescriptionLabel.textContent = 'Description: ';
    elDescriptionLabel.htmlFor = 'description';
    const elDescription = elDescriptionLabel.appendChild(document.createElement('textarea'));
    elDescription.name = 'description';
    elDescription.id = 'description';
    elDescription.cols = '30';
    elDescription.rows = '10';

    // DATE
    const elDateLabel = elForm.appendChild(document.createElement('label'));
    elDateLabel.textContent = 'Due Date: ';
    elDateLabel.htmlFor = 'due-date';
    const elDate = elDateLabel.appendChild(document.createElement('input'));
    elDate.name = 'dueDate';
    elDate.type = 'date';
    elDate.id = 'due-date';
    elDate.value = new Date(Date.now()).toISOString().split('T')[0];

    // PRIORITY
    const elPriorityLabel = elForm.appendChild(document.createElement('label'));
    elPriorityLabel.textContent = 'Priority: ';
    elPriorityLabel.htmlFor = 'priority';
    const elPriority = elPriorityLabel.appendChild(document.createElement('select'));
    elPriority.name = 'priority';
    elPriority.id = 'priority';

    const elPriorityValue1 = elPriority.appendChild(document.createElement('option'));
    elPriorityValue1.text = 'Priority 1';
    elPriorityValue1.value = '1';
    const elPriorityValue2 = elPriority.appendChild(document.createElement('option'));
    elPriorityValue2.text = 'Priority 2';
    elPriorityValue2.value = '2';
    const elPriorityValue3 = elPriority.appendChild(document.createElement('option'));
    elPriorityValue3.text = 'Priority 3';
    elPriorityValue3.value = '3';
    const elPriorityValue4 = elPriority.appendChild(document.createElement('option'));
    elPriorityValue4.text = 'Priority 4';
    elPriorityValue4.value = '4';

    // PROJECT
    const elProjectLabel = elForm.appendChild(document.createElement('label'));
    elProjectLabel.textContent = 'Project: ';
    elProjectLabel.htmlFor = 'project';
    const elProject = elProjectLabel.appendChild(document.createElement('select'))
    elProject.name = 'project';
    elProject.id = 'project';

    const projects = getProjectList();
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        const elOption = elProject.appendChild(document.createElement('option'));
        elOption.text = project.title;
        elOption.value = project.id;
        if (i == currentProjectIndex) {
            elOption.selected = true;
        }
    }

    // BUTTONS
    const elButtons = elForm.appendChild(document.createElement('div'));
    elButtons.classList.add('modal-buttons');

    const elCancel = elButtons.appendChild(document.createElement('button'));
    elCancel.textContent = 'Cancel';
    elCancel.type = 'button';
    elCancel.addEventListener('pointerdown', () => removeModal());

    const elSubmit = elButtons.appendChild(document.createElement('button'));
    elSubmit.textContent = 'Save';
    elSubmit.type = 'submit';

    //////// TESTING PURPOSES
    elTitle.value = 'Title test'
    elDescription.value = 'Description test'
    //////// TESTING PURPOSES


    return elFieldset;
}

export { eventDisplayModal };
