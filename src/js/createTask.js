let projectList = [];
class Project {
    constructor(title, description, dueDate, priority, notes, checklist, tasks) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
        this.tasks = tasks;
    }


}

let taskList = [];
class Task {
    constructor(title, description, dueDate, priority, notes, checklist) {
        this.id = crypto.randomUUID();

        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
        this.completed = false;
    }

    setCompleted(value) {
        this.completed = value;
    }

    getCompleted() {
        return this.completed;
    }
}

function createTask(title, description, dueDate, priority, notes, checklist) {
    return taskList.push(new Task(title, description, dueDate, priority, notes, checklist));
}

function createProject(title, description, dueDate, priority, notes, checklist, tasks) {
    return projectList.push(new Project(title, description, dueDate, priority, notes, checklist, tasks));
}

function getTaskList() {
    return taskList;
}

export { getTaskList, createTask, createProject };
