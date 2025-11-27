let container = document.querySelector('.container');

container.textContent = 'Task container';
container.style.border = '2px solid black';

let addButton = document.querySelector('.addBtn');
let taskInput = document.querySelector('.inputTask');
let body = document.querySelector('body');
let counter = document.createElement('span');
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
  let completeButton = document.createElement('button');

  taskText.textContent = taskInput.value;
  taskBox.appendChild(taskText);
  taskBox.appendChild(deleteButton);
  taskBox.appendChild(completeButton);
  container.appendChild(taskBox);
  deleteButton.textContent = 'Delete';
  completeButton.textContent = 'Complete';

  deleteButton.addEventListener('click', () => {
    if (taskBox.dataset.completed === 'true') {
      --completedCounter;
    } else {
      --activeCounter;
    }
    counter.textContent = updateCounterText();
    taskBox.remove();
  });

  completeButton.addEventListener('click', () => {
    // taskText.style.textDecoration = 'line-through';
    if (taskBox.dataset.completed === 'false') {
      taskBox.dataset.completed = 'true';
      taskBox.style.backgroundColor = 'green';
      completedCounter++;
      --activeCounter;
      counter.textContent = updateCounterText();
      
    }
  });

  taskInput.value = '';
  taskInput.focus();
}

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
