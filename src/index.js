import "./index.css";
import { initialize } from "./js/display-controller";
import { fetchFromStorage, doesStorageHaveContent, createProject, createTask, getProjectList } from "./js/data-db";

(() => {
    if (doesStorageHaveContent()) {
        fetchFromStorage();
    } else {
        // IMMUTABLE DEFAULT PROJECT
        createProject('Inbox', 'Active tasks', true);

        // TEMP DEFAULT PROJECT DATA
        createTask('Go outside', 'Go outside and touch some grass.', Date.now(), 1);
        createTask('Sleep', 'Jump onto your bed and take a nap.', 1643587200000, 4);

        // TEMP PROJECTS AND THEIR TASKS
        const projectOfficeIndex = createProject('Office', 'Ahh, more work at the office. Things that I have to finish at work.');
        getProjectList()[projectOfficeIndex - 1].createProjectTask(
            'Clean desk',
            'Use the green cloth to clean the office table of filth',
            1670138060000,
            3,
        );
        getProjectList()[projectOfficeIndex - 1].createProjectTask(
            'Report to the higher-ups',
            'Finish the project and report to the higher-ups',
            1676186068000,
            2,
        );

        const projectHomeRenovationIndex = createProject('Home Renovation Preparation', 'Things I should do before the home renovation');
        getProjectList()[projectHomeRenovationIndex - 1].createProjectTask(
            'Get the paint',
            'Colors #505022 and #82a4f1',
            1674717268000,
            1,
        );
        getProjectList()[projectHomeRenovationIndex - 1].createProjectTask(
            'Rent a truck',
            'Get a cheap truck just in case it\'s needed for deliveries',
            1674616268000,
            4,
        );
    }
    initialize();
})();
