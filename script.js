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

async function createList() {
  let listElement = document.createElement('div');
  listElement.className = 'list';

  let listTitle = document.createElement('h2');
  listTitle.textContent = newListInput.value;

  const value = newListInput.value;

  const docRef = await addDoc(collection(db, 'Lists'), {
    title: value,
  });

  listElement.dataset.listId = docRef.id;

  //Edit list title
  listTitle.addEventListener('click', () => {
    const input = document.createElement('input');
    input.value = listTitle.textContent;
    listElement.replaceChild(input, listTitle);
    input.focus();
    input.select();

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        listTitle.textContent = input.value;
        listElement.replaceChild(listTitle, input);
      }
    });

    input.addEventListener('blur', () => {
      listTitle.textContent = input.value;
      listElement.replaceChild(listTitle, input);
    });
  });

  let taskInput = document.createElement('input');
  let addTaskButton = document.createElement('button');
  addTaskButton.textContent = 'Add card';

  let taskListContainer = document.createElement('div');
  taskListContainer.className = 'taskList';

  listElement.append(listTitle, taskInput, addTaskButton, taskListContainer);
  boardContainer.appendChild(listElement);

  newListInput.value = '';

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

  addTaskButton.addEventListener('click', async () => {
    let taskCard = await createTaskCard(taskInput.value, listElement.dataset.listId);
    taskListContainer.appendChild(taskCard);

    taskInput.value = '';
    taskInput.focus();
  });

  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTaskButton.click();
  });
}

newListInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addListButton.click();
});

addListButton.addEventListener('click', createList);

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

async function createTaskCard(taskText, listId) {
  let taskCard = document.createElement('div');
  taskCard.className = 'taskCardDraggable';
  taskCard.draggable = 'true';

  let taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;

  await addDoc(collection(db, 'Lists', listId, 'tasks'), {
    title: taskText,
  });

  //Editing tasks
  taskSpan.addEventListener('click', () => {
    console.log('Test');
    const input = document.createElement('input');
    input.value = taskSpan.textContent;
    taskCard.replaceChild(input, taskSpan);
    input.focus();
    input.select();

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        taskSpan.textContent = input.value;
        taskCard.replaceChild(taskSpan, input);
      }
    });

    input.addEventListener('blur', () => {
      taskSpan.textContent = input.value;
      taskCard.replaceChild(taskSpan, input);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        taskSpan.textContent = input.value;
        taskCard.replaceChild(taskSpan, input);
      }
    });
  });

  let deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  let completeCheckbox = document.createElement('input');
  completeCheckbox.type = 'checkbox';

  taskCard.append(taskSpan, deleteButton, completeCheckbox);
  taskCard.addEventListener('dragstart', () => taskCard.classList.add('dragging'));
  taskCard.addEventListener('dragend', () => taskCard.classList.remove('dragging'));

  deleteButton.addEventListener('click', () => taskCard.remove());

  completeCheckbox.addEventListener('change', () => {
    if (completeCheckbox.checked) {
      taskSpan.style.textDecorationLine = 'line-through';
    } else {
      taskSpan.style.textDecorationLine = '';
    }
  });

  return taskCard;
}
