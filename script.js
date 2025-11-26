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

  taskInput.value = '';
  taskInput.focus();
}

addButton.addEventListener('click', () => getTask());

taskInput.addEventListener('keypress', (e) => {
  if (e.key == 'Enter') addButton.click();
});
