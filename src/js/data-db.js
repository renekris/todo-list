let projectList = [];
class Project {
    constructor(title, description, isDefault) {
        this.id = crypto.randomUUID();

        this.title = title;
        this.description = description;
        this.tasks = [];
        this.isCompleted = false;

        this.isDefault = isDefault || false;
    }

    setIsCompleted(value) {
        this.isCompleted = value;
    }

    createProjectTask(title, description, dueDate, priority) {
        this.tasks.push(new Task(title, description, dueDate, priority, this.id));
    }

    deleteTaskFromProject(taskId) {
        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        if (index > -1) {
            this.tasks.splice(taskIndex, 1);
        }
    }

    getUncompletedTasks() {
        return this.tasks.filter(task => task.isCompleted === false);
    }
}

class Task {
    constructor(title, description, dueDate, priority, parentProjectId) {
        this.id = crypto.randomUUID();

        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isCompleted = false;

        this.parentProjectId = parentProjectId;
    }

    setIsCompleted(value) {
        this.isCompleted = value;
        saveToStorage();
    }

    setParentProjectId(projectId) {
        this.removeTaskFromProject();
        this.addTaskToProject(projectId);
        this.parentProjectId = projectId;
        saveToStorage();
    }

    removeTaskFromProject() {
        const project = projectList.find(project => project.id === this.parentProjectId);
        const projectTaskIndex = project.tasks.findIndex(projectTask => projectTask.id === this.id);
        if (projectTaskIndex > -1) {
            project.tasks.splice(projectTaskIndex, 1);
        }
    }

    addTaskToProject(projectId) {
        const project = projectList.find(project => project.id === projectId);
        project.tasks.push(this);
    }
}

function createTask(title, description, dueDate, priority, projectId = null) {
    // new cards get pushed to "default" project unless specified otherwise
    if (projectId !== null) {
        getProjectById(projectId).createProjectTask(title, description, dueDate, priority);
    } else {
        try {
            const project = projectList.find(project => project.isDefault === true);
            project.createProjectTask(title, description, dueDate, priority);
        } catch (err) {
            console.error('Missing default with no specified ID');
        }
    }
    saveToStorage();
}

function createProject(title, description, isDefault) {
    const index = projectList.push(new Project(title, description, isDefault));
    saveToStorage();
    return index;
}

function deleteProject(id) {
    const projectIndex = getProjectIndexById(id);
    projectList.splice(projectIndex, 1);
}

function getProjectList() {
    saveToStorage();
    return projectList;
}

function getProjectById(id) {
    return projectList.find(project => project.id === id);
}

function getProjectIndexById(id) {
    return projectList.findIndex(project => project.id === id);
}

function getTaskList() {
    let taskList = [];
    projectList.forEach(project => {
        const tasks = project.tasks;
        tasks.forEach(task => taskList.push(task));
    });
    return taskList;
}

function getAllUncompletedTasks() {
    return getTaskList().filter(task => task.isCompleted === false);
}

function saveToStorage() {
    window.localStorage.setItem('projectList', JSON.stringify(projectList));
    console.log('%cSave to storage', 'color: red;');
}

function fetchFromStorage() {
    const rawProjectList = JSON.parse(window.localStorage.getItem('projectList'));
    let newList = [];
    for (let i = 0; i < rawProjectList?.length; i++) {
        let rawProject = rawProjectList[i];

        let project = Object.setPrototypeOf(rawProject, Project.prototype);
        project.tasks.forEach(task => {
            task = Object.setPrototypeOf(task, Task.prototype);
        });

        newList.push(project);
    }
    projectList = newList;
    console.log('%cLoaded from storage', 'color: green;');
}

function doesStorageHaveContent() {
    const projectListData = JSON.parse(window.localStorage.getItem('projectList'));
    if (projectListData?.length > 0) {
        return true;
    } else {
        return false;
    }
}

export {
    getTaskList,
    getProjectList,
    createTask,
    createProject,
    getProjectById,
    getProjectIndexById,
    getAllUncompletedTasks,
    deleteProject,
    saveToStorage,
    fetchFromStorage,
    doesStorageHaveContent,
};
