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
    addTaskToProject(title, description, dueDate, priority) {
        this.tasks.push(new Task(title, description, dueDate, priority, this.id));
    }
    deleteTaskFromProject(id) {
        index = this.tasks.indexOf(id);
        if (index > -1) {
            this.tasks.splice(index, 1);
        }
    }
}

function createProject(title, description, isDefault) {
    return projectList.push(new Project(title, description, isDefault));
}

function getProjectList() {
    return projectList;
}

// MAKE EVERYTHING COMPATIBLE WITHOUT taskList
let taskList = [];
class Task {
    constructor(title, description, dueDate, priority, parentProjectId) {
        this.id = crypto.randomUUID();

        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isCompleted = false;

        this.parentProjectId = parentProjectId || null;
    }

    setIsCompleted(value) {
        this.isCompleted = value;
    }
    setParentProjectId(projectId) {
        if (this.parentProjectId !== null) {
            this.removeTaskFromProject();
        }
        this.addTaskToProject(projectId);
        this.parentProjectId = projectId;
    }
    removeTaskFromProject() {
        const projectIndex = projectList.findIndex(project => {
            return project.id === this.parentProjectId;
        });

        const projectTaskIndex = projectList[projectIndex].tasks.findIndex(projectTask => {
            return projectTask.id === this.id;
        })

        if (projectTaskIndex > -1) {
            projectList[projectIndex].tasks.splice(projectTaskIndex, 1);
        }
    }
    addTaskToProject(projectId) {
        const projectIndex = projectList.findIndex(project => {
            return project.id === projectId;
        });
        projectList[projectIndex].tasks.push(this);
    }
}

function createTask(title, description, dueDate, priority) {
    // new cards get pushed to "default" project
    const projectIndex = projectList.findIndex(project => {
        return project.isDefault === true;
    });
    if (projectIndex > -1) {
        let task = new Task(title, description, dueDate, priority);
        const projectId = projectList[projectIndex].id;
        task.setParentProjectId(projectId);
        return taskList.push(task);
    }
}

function getTaskList() {
    return taskList;
}

export { getTaskList, getProjectList, createTask, createProject };
