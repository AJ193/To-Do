import './style.css';
import {
  addTask,
  editTask,
  removeAllCompleted,
} from './task.js';
import changeStatus from './storage.js';

const list = document.getElementById('list');
const refresh = document.getElementById('refresh');
const addIcon = document.getElementById('addIcon');
const text = document.getElementById('text');
const removeAll = document.getElementById('removeAll');
const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

refresh.addEventListener('click', () => {
  document.location.reload();
});

addIcon.addEventListener('click', () => {
  const desc = text.value;
  addTask(desc);
});

removeAll.addEventListener('click', () => {
  removeAllCompleted();
});

tasks.forEach((task) => {
  const listItem = document.createElement('li');
  listItem.classList.add('listItem');
  listItem.setAttribute('id', task.index);

  const check = document.createElement('input');
  check.setAttribute('type', 'checkbox');
  check.classList.add('check');
  check.addEventListener('change', () => {
    changeStatus(task.index);
  });

  const todo = document.createElement('p');
  todo.classList.add('todo');
  todo.innerText = task.desc;
  if (task.completed) {
    todo.style.textDecoration = 'line-through';
    todo.style.color = '#999';
    check.checked = true;
  }

  const listItemIcon = document.createElement('i');
  listItemIcon.classList.add('listItemIcon');
  listItemIcon.classList.add('fas');
  listItemIcon.classList.add('fa-ellipsis-v');
  listItemIcon.addEventListener('click', () => {
    editTask(task.index);
  });

  listItem.append(check, todo, listItemIcon);
  list.append(listItem);
});
