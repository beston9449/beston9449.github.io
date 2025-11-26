let container = document.querySelector('.container');

container.textContent = 'Task container';
container.style.border = '2px solid black';

let addButton = document.querySelector('.addBtn');
let taskInput = document.querySelector('.inputTask');

function getTask() {
  let taskBox = document.createElement('div');
  let taskText = document.createElement('span');
  let deleteButton = document.createElement('button');

  taskText.textContent = taskInput.value;
  taskBox.appendChild(taskText);
  taskBox.appendChild(deleteButton);
  container.appendChild(taskBox);
  deleteButton.textContent = 'Delete';

  deleteButton.addEventListener('click', () => {
    taskBox.remove();
  });

  taskBox.addEventListener('click', () => {
    taskBox.style.backgroundColor = 'green';
    taskText.style.textDecoration = 'line-through';
  });

  taskInput.value = '';
  taskInput.focus();
}

addButton.addEventListener('click', () => {
  if (taskInput.value === '') {
    alert('Empty task not allowed');
  } else {
    getTask();
  }
});

taskInput.addEventListener('keypress', (e) => {
  if (e.key == 'Enter') addButton.click();
});
