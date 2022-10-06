import './index.css';
import { getTaskList, createTask } from './js/createTask';
import { initialize } from './js/displayController';

(() => {
    console.log(createTask('test', 'cringe', 'test2', 'cringe2', 'list item 2', 2, 1));
    createTask('test', 'cringe', 'test2', 'cringe2', 'list item 2', 2, 1);
    console.log(getTaskList());
    initialize();
    // draw.initialize();
    // draw.addProject('test');
    // draw.addButton();
    // draw.addProfileImage();
})();
