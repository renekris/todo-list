import "./index.css";
import { initialize } from "./js/display-controller";
import { saveToStorage, fetchFromStorage, doesStorageHaveContent, createProject, createTask } from "./js/data-db";

(() => {
    if (doesStorageHaveContent()) {
        fetchFromStorage();
    } else {
        // IMMUTABLE DEFAULT PROJECT
        createProject('Inbox', 'Active tasks', true);

        // TEMP PROJECTS ON NEW BROWSER
        createProject('Office', 'Ahh, more work at the office. Things that I have to finish at work.');
        createTask('Go outside', 'Go outside and touch some grass.', Date.now(), 1);
        createTask('Sleep', 'Jump onto your bed and take a nap.', 1643587200000, 4);
    }
    initialize();
})();
