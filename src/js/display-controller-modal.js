import { getProjectList, createTask, createProject } from "./data-db";
import { displayCurrentProject, currentProjectIndex, setProjectsToSidebar } from "./display-controller";

function eventDisplayModal(e) {
    if (e.target.className === 'add-project-button') {
        displayModal('project');

    } else if (e.target.className === 'add-task-button') {
        displayModal('task'); //TEMP
    }
}

function eventSubmit(e) {
    e.preventDefault();

    if (e.target.offsetParent.className === 'task') {
        const taskData = serializeTaskData(e.target);
        createTask(...taskData);
    } else if (e.target.offsetParent.className === 'project') {
        const projectData = serializeProjectData(e.target);
        createProject(...projectData);
        setProjectsToSidebar();
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

function serializeProjectData(targetElement) {
    return [
        targetElement.title.value,
        targetElement.description.value,
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
            elModalContent.appendChild(createTaskModal());
            document.getElementById('title').focus();
            break;
        case 'project':
            elModal.classList.add(type);
            elModalContent.appendChild(createProjectModal());
            document.getElementById('title').focus();
            break;
        default:
            break;
    }
}

function removeModal() {
    const elModal = document.getElementById('modal');
    elModal.remove();
}

function createProjectModal() {
    const elFieldset = document.createElement('fieldset');
    const elForm = elFieldset.appendChild(document.createElement('form'));
    elForm.id = 'form';

    elForm.addEventListener('submit', eventSubmit);

    // TITLE
    elForm.appendChild(createModalElement().inputTitle());

    // DESCRIPTION
    elForm.appendChild(createModalElement().textareaDescription());

    // BUTTONS
    elForm.appendChild(createModalElement().buttonsCancelSubmit());

    return elFieldset;
}

function createTaskModal() {
    const elFieldset = document.createElement('fieldset');
    const elForm = elFieldset.appendChild(document.createElement('form'));
    elForm.id = 'form';

    elForm.addEventListener('submit', eventSubmit);

    // TITLE
    elForm.appendChild(createModalElement().inputTitle());

    // DESCRIPTION
    elForm.appendChild(createModalElement().textareaDescription());

    // DATE
    elForm.appendChild(createModalElement().inputDate());

    // PRIORITY
    elForm.appendChild(createModalElement().selectPriority());

    // PROJECT
    elForm.appendChild(createModalElement().selectProject());

    // BUTTONS
    elForm.appendChild(createModalElement().buttonsCancelSubmit());

    return elFieldset;
}

function createModalElement() {
    function inputTitle() {
        const elTitleLabel = document.createElement('label');
        elTitleLabel.textContent = 'Title: ';
        elTitleLabel.htmlFor = 'title';
        const elTitle = elTitleLabel.appendChild(document.createElement('input'));
        elTitle.name = 'title';
        elTitle.type = 'text';
        elTitle.id = 'title';

        //////// TESTING PURPOSES
        elTitle.value = 'Title test';
        //////// TESTING PURPOSES

        return elTitleLabel;
    }

    function textareaDescription() {
        const elDescriptionLabel = document.createElement('label');
        elDescriptionLabel.textContent = 'Description: ';
        elDescriptionLabel.htmlFor = 'description';
        const elDescription = elDescriptionLabel.appendChild(document.createElement('textarea'));
        elDescription.name = 'description';
        elDescription.id = 'description';
        elDescription.cols = '30';
        elDescription.rows = '10';

        //////// TESTING PURPOSES
        elDescription.value = 'Description test'
        //////// TESTING PURPOSES

        return elDescriptionLabel;
    }

    function inputDate() {
        const elDateLabel = document.createElement('label');
        elDateLabel.textContent = 'Due Date: ';
        elDateLabel.htmlFor = 'due-date';
        const elDate = elDateLabel.appendChild(document.createElement('input'));
        elDate.name = 'dueDate';
        elDate.type = 'date';
        elDate.id = 'due-date';
        elDate.value = new Date(Date.now()).toISOString().split('T')[0];

        return elDateLabel;
    }

    function selectPriority() {
        const elPriorityLabel = document.createElement('label');
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

        return elPriorityLabel;
    }

    function selectProject() {
        const elProjectLabel = document.createElement('label');
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
        return elProjectLabel;
    }

    function buttonsCancelSubmit() {
        const elButtons = document.createElement('div');
        elButtons.classList.add('modal-buttons');

        const elCancel = elButtons.appendChild(document.createElement('button'));
        elCancel.textContent = 'Cancel';
        elCancel.type = 'button';
        elCancel.addEventListener('pointerdown', () => removeModal());

        const elSubmit = elButtons.appendChild(document.createElement('button'));
        elSubmit.textContent = 'Save';
        elSubmit.type = 'submit';

        return elButtons;
    }

    return {
        inputTitle,
        textareaDescription,
        inputDate,
        selectPriority,
        selectProject,
        buttonsCancelSubmit,
    };
}

export { eventDisplayModal };
