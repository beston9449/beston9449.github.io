import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';

import {
  getFirestore,
  setDoc,
  getDoc,
  addDoc,
  collection,
  doc,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyBBZ3gx_HAxVCs6pss758agLBSADU1IW4I',
  authDomain: 'task-tracker-b078c.firebaseapp.com',
  projectId: 'task-tracker-b078c',
  storageBucket: 'task-tracker-b078c.firebasestorage.app',
  messagingSenderId: '883482628004',
  appId: '1:883482628004:web:a9032c998db853d151fb31',
  measurementId: 'G-LTG8ZRJ7NF',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let boardContainer = document.querySelector('.mainContainer');
let newListContainer = document.querySelector('.addList');

let newListInput = document.createElement('input');
newListInput.placeholder = 'Enter list name...';
newListInput.type = 'text';

let addListButton = document.createElement('button');
addListButton.textContent = 'Add list';

newListContainer.appendChild(newListInput);
newListContainer.appendChild(addListButton);

function createListOnly(listName) {
  let listElement = document.createElement('div');
  listElement.className = 'list';

  let listTitle = document.createElement('h2');
  listTitle.textContent = listName;

  // make it editable
  attachEditable(listElement, listTitle);

  let taskInput = document.createElement('input');
  let addTaskButton = document.createElement('button');
  addTaskButton.textContent = 'Add card';

  let taskListContainer = document.createElement('div');
  taskListContainer.className = 'taskList';

  appendElements(listElement, listTitle, taskInput, addTaskButton, taskListContainer);

  newListInput.value = '';

  return { listElement, taskInput, addTaskButton, taskListContainer };
}

addListButton.addEventListener('click', () => {
  const { listElement, taskInput, addTaskButton, taskListContainer } = createListOnly(
    newListInput.value
  );

  boardContainer.appendChild(listElement);

  addTaskButton.addEventListener('click', () => {
    const taskCard = createTaskCardNew(taskInput.value);
    taskListContainer.appendChild(taskCard);
    taskInput.value = '';
    taskInput.focus();
  });

  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTaskButton.click();
  });

  taskListContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    const draggable = document.querySelector('.dragging');
    if (!draggable) return;

    const afterElement = getDragAfterElement(taskListContainer, e.clientY);
    if (afterElement == null) {
      taskListContainer.appendChild(draggable);
    } else {
      taskListContainer.insertBefore(draggable, afterElement);
    }
  });
});

function appendElements(container, ...elements) {
  for (const element of elements) {
    container.appendChild(element);
  }
  return container;
}

newListInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addListButton.click();
});

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.taskCardDraggable:not(.dragging)')];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

///creating a new createtaskcard function

function createTaskCardNew(taskText) {
  let taskCard = document.createElement('div');
  taskCard.className = 'taskCardDraggable';
  taskCard.draggable = 'true';

  let taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;

  // make task editable
  attachEditable(taskCard, taskSpan);

  let deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  let completeCheckbox = document.createElement('input');
  completeCheckbox.type = 'checkbox';

  attachDelete(taskCard, deleteButton);
  attachCompleteToggle(taskSpan, completeCheckbox);

  appendElements(taskCard, taskSpan, deleteButton, completeCheckbox);
  taskCard.addEventListener('dragstart', () => taskCard.classList.add('dragging'));
  taskCard.addEventListener('dragend', () => taskCard.classList.remove('dragging'));

  return taskCard;
}

function editElement(element, elTitle) {
  const input = document.createElement('input');
  input.value = elTitle.textContent;
  element.replaceChild(input, elTitle);
  input.focus();
  input.select();

  let replaced = false;

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !replaced) {
      replaced = true;
      elTitle.textContent = input.value;
      element.replaceChild(elTitle, input);
    }
  });

  input.addEventListener('blur', () => {
    if (!replaced) {
      replaced = true;
      elTitle.textContent = input.value;
      element.replaceChild(elTitle, input);
    }
  });
}

function attachEditable(container, titleElement) {
  titleElement.addEventListener('click', () => editElement(container, titleElement));
}
function attachDelete(element, deleteButton) {
  deleteButton.addEventListener('click', () => element.remove());
}

function attachCompleteToggle(element, checkbox) {
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      element.style.textDecorationLine = 'line-through';
    } else {
      element.style.textDecorationLine = '';
    }
  });
}
