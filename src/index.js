import './index.css';
import { createTask, createProject } from './js/data-db';
import { initialize } from './js/display-controller';

(() => {
    createProject('Personal', 'Things that I have to do.');
    createProject('Office', 'Ahh, more work at the office. Things that I have to finish at work.');
    createTask('Go outside', 'Go outside and touch some grass.', Date.now(), 1);
    createTask('Sleep', 'Jump onto your bed and take a nap.', 1643587200000, 4);

    initialize();
})();
