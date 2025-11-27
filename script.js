let container = document.querySelector('.container');

container.style.border = '2px solid black';

let addButton = document.querySelector('.addBtn');
let taskInput = document.querySelector('.inputTask');
let body = document.querySelector('body');
let counter = document.createElement('span');
let clearBtn = document.createElement('button');
clearBtn.textContent = 'Clear all completed tasks';
body.insertBefore(clearBtn, container);

body.appendChild(counter);

let activeCounter = 0;
let completedCounter = 0;

function updateCounterText() {
  return `Active Tasks: ${activeCounter} Completed Tasks: ${completedCounter}`;
}
function getTask() {
  let taskBox = document.createElement('div');
  taskBox.dataset.completed = 'false';
  let taskText = document.createElement('span');
  let deleteButton = document.createElement('button');
  let checkBox = document.createElement('input');
  checkBox.type = 'checkbox';

  taskText.textContent = taskInput.value;
  taskBox.appendChild(taskText);
  taskBox.appendChild(deleteButton);
  taskBox.appendChild(checkBox);
  container.appendChild(taskBox);
  deleteButton.textContent = 'Delete';

  deleteButton.addEventListener('click', () => {
    if (taskBox.dataset.completed === 'true') {
      --completedCounter;
    } else {
      --activeCounter;
    }
    counter.textContent = updateCounterText();
    taskBox.remove();
  });

  checkBox.addEventListener('change', () => {
    if (checkBox.checked) {
      taskBox.dataset.completed = 'true';
      taskBox.style.backgroundColor = 'green';
      completedCounter++;
      --activeCounter;
      counter.textContent = updateCounterText();
      container.appendChild(taskBox);
    } else {
      taskBox.dataset.completed = 'false';
      taskBox.style.backgroundColor = '';
      completedCounter--;
      ++activeCounter;
      counter.textContent = updateCounterText();
      container.prepend(taskBox);
    }
  });

  taskInput.value = '';
  taskInput.focus();
}

function clearAllTasks() {
  let taskListNode = document.querySelectorAll('.container div');
  taskListNode.forEach((task) => {
    if (task.dataset.completed === 'true') {
      task.remove();
    }
  });
}

clearBtn.addEventListener('click', () => clearAllTasks());

addButton.addEventListener('click', () => {
  if (taskInput.value === '') {
    alert('Empty task not allowed');
  } else {
    getTask();
    activeCounter++;
    counter.textContent = updateCounterText();
  }
});

taskInput.addEventListener('keypress', (e) => {
  if (e.key == 'Enter') addButton.click();
});
