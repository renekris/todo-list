import './index.css';
import { getTaskList, createTask } from './js/createTask';
import { initialize } from './js/displayController';

(() => {
    createTask('Go outside', 'Go outside and touch some grass', Date.now(), 1);
    createTask('Sleep', 'Jump onto your bed and take a nap', 1643587200000, 4);
    console.log(getTaskList());
    initialize();
    // draw.initialize();
    // draw.addProject('test');
    // draw.addButton();
    // draw.addProfileImage();
})();