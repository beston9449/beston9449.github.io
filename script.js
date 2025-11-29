let container = document.querySelector('.mainContainer');
let inputContainer = document.querySelector('.addCard');
let draggedTask = null;

let listInput = document.createElement('input');
listInput.placeholder = 'Enter list name...';
listInput.type = 'text';
let body = document.querySelector('body');
let counter = document.createElement('span');
let clearBtn = document.createElement('button');
let addList = document.createElement('button');
inputContainer.appendChild(addList);
inputContainer.appendChild(listInput);
addList.textContent = 'Add list';

function createList() {
  let list = document.createElement('div');
  list.className = 'list';
  let addTask = document.createElement('button');
  let taskInput = document.createElement('input');
  let listTitle = document.createElement('h2');
  let taskList = document.createElement('div');
  taskList.className = 'taskList';

  container.appendChild(list);
  listTitle.textContent = listInput.value;
  list.appendChild(listTitle);
  list.appendChild(taskInput);
  list.appendChild(addTask);
  addTask.textContent = 'Add card';
  list.appendChild(taskList);
  listInput.value = '';

  taskList.addEventListener('dragover', function (e) {
    e.preventDefault();
  });

  taskList.addEventListener('drop', function (e) {
    e.preventDefault();
    if (draggedTask) {
      e.currentTarget.appendChild(draggedTask);
      draggedTask = null;
    }
  });

  addTask.addEventListener('click', () => {
    let taskCard = document.createElement('div');
    taskCard.className = 'taskCard';
    let taskSpan = document.createElement('span');
    let taskDelete = document.createElement('button');
    let taskCheckComplete = document.createElement('input');
    taskDelete.textContent = 'Delete';
    taskCheckComplete.type = 'checkbox';
    taskSpan.textContent = taskInput.value;
    taskList.appendChild(taskCard);
    taskCard.appendChild(taskSpan);
    taskCard.appendChild(taskDelete);
    taskCard.append(taskCheckComplete);
    taskInput.focus();
    taskCard.draggable = 'true';

    taskCard.addEventListener('dragstart', function (e) {
      draggedTask = taskCard;
    });

    taskDelete.addEventListener('click', () => {
      taskCard.remove();
    });

    taskInput.value = '';

    taskCheckComplete.addEventListener('change', () => {
      if (taskCheckComplete.checked) {
        taskSpan.style.textDecorationLine = 'line-through';
      } else {
        taskSpan.style.textDecorationLine = '';
      }
    });
  });
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask.click();
  });
}

listInput.addEventListener('keypress', (e) => {
  if (e.key == 'Enter') addList.click();
});

addList.addEventListener('click', () => createList());

clearBtn.textContent = 'Clear all completed tasks';

let activeCounter = 0;
let completedCounter = 0;

function updateCounterText() {
  return `Active Tasks: ${activeCounter} Completed Tasks: ${completedCounter}`;
}

function clearAllTasks() {
  let taskListNode = document.querySelectorAll('.container div');
  taskListNode.forEach((task) => {
    if (task.dataset.completed === 'true') {
      task.remove();
      --completedCounter;
    }
  });
  counter.textContent = updateCounterText();
}

clearBtn.addEventListener('click', () => {
  let tasksArray = [...document.querySelectorAll('.container div')];
  if (tasksArray.some((task) => task.dataset.completed === 'true')) {
    clearAllTasks();
  } else {
    alert('No completed tasks available!');
  }
});

addTask.addEventListener('click', () => {
  if (taskInput.value === '') {
    alert('Empty task not allowed');
  } else {
    getTask();
    activeCounter++;
    counter.textContent = updateCounterText();
  }
});
