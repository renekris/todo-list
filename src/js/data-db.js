let projectList = [];
class Project {
    constructor(title, description) {
        this.id = crypto.randomUUID();

        this.title = title;
        this.description = description;
        this.tasks = [];
        this.completed = false;
    }

    setCompleted(value) {
        this.completed = value;
    }
    addTaskToProject(id) {
        this.tasks.push(id);
    }
    deleteTaskFromProject(id) {
        index = this.tasks.indexOf(id);
        if (index > -1) {
            this.tasks.splice(index, 1);
        }
    }
}

function createProject(title, description) {
    return projectList.push(new Project(title, description));
}

function getProjectList() {
    return projectList;
}

let taskList = [];
class Task {
    constructor(title, description, dueDate, priority, parentProject) {
        this.id = crypto.randomUUID();

        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;

        this.parentProject = parentProject || null;
    }

    setCompleted(value) {
        this.completed = value;
    }
    setParentProject(id) {
        this.parentProject = id;
        const index = projectList.findIndex(project => {
            return project.id === id;
        });
        projectList[index].tasks.push(id);
    }
}

function createTask(title, description, dueDate, priority) {
    return taskList.push(new Task(title, description, dueDate, priority));
}


function getTaskList() {
    return taskList;
}

export { getTaskList, getProjectList, createTask, createProject };
