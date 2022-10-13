let projectList = [];
class Project {
    constructor(title, description, dueDate) {
        this.id = crypto.randomUUID();

        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
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

function createProject(title, description, dueDate, tasks) {
    return projectList.push(new Project(title, description, dueDate, tasks));
}

function getTaskList() {
    return taskList;
}

function getProjectList() {
    return projectList;
}

export { getTaskList, getProjectList, createTask, createProject };
