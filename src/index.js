import './index.css';
import { getTaskList, createTask } from './js/createTask';
import { initialize } from './js/displayController';

(() => {
    createTask('Go outside', 'Go outside and touch some grass', Date.now(), 5, ['no notes'], ['no checklist']);
    createTask('Sleep', 'Jump onto your bed and take a nap', new Date('12.24.2022'), 5, ['no notes'], ['no checklist']);
    console.log(getTaskList());
    initialize();
    // draw.initialize();
    // draw.addProject('test');
    // draw.addButton();
    // draw.addProfileImage();
})();
