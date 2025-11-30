let mainContainer = document.querySelector('.mainContainer');
let inputContainer = document.querySelector('.addCard');
let draggedTask = null;
let listInput = document.createElement('input');
listInput.placeholder = 'Enter list name...';
listInput.type = 'text';
let body = document.querySelector('body');
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

  mainContainer.appendChild(list);

  listTitle.textContent = listInput.value;
  list.appendChild(listTitle);
  list.appendChild(taskInput);
  list.appendChild(addTask);
  addTask.textContent = 'Add card';
  list.appendChild(taskList);

  taskList.addEventListener('dragover', (e) => {
    e.preventDefault();
    const draggable = document.querySelector('.dragging');
    if (!draggable) return;

    const afterElement = getDragAfterElement(taskList, e.clientY);
    if (afterElement == null) {
      taskList.appendChild(draggable);
    } else {
      taskList.insertBefore(draggable, afterElement);
    }
  });
  listInput.value = '';

  addTask.addEventListener('click', () => {
    let taskCard = document.createElement('div');
    taskCard.className = 'taskCardDraggable';

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

    taskCard.addEventListener('dragstart', () => {
      taskCard.classList.add('dragging');
    });

    taskCard.addEventListener('dragend', () => {
      taskCard.classList.remove('dragging');
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

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.taskCardDraggable:not(.dragging)')];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
