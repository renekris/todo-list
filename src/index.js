import './index.css';
import { getTaskList, createTask } from './js/createTask';
import draw from './js/displayController';

(() => {
    console.log(createTask('test', 'cringe', 'test2', 'cringe2', 'list item 2', 2, 1));
    createTask('test', 'cringe', 'test2', 'cringe2', 'list item 2', 2, 1);
    console.log(getTaskList());
    draw.initialize();
    draw.addProject('test');
    draw.addButton();
    draw.addProfileImage();
})();
