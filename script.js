let boardContainer = document.querySelector('.mainContainer');
let newListContainer = document.querySelector('.addCard');
let bodyElement = document.querySelector('body');

let newListInput = document.createElement('input');
newListInput.placeholder = 'Enter list name...';
newListInput.type = 'text';

let addListButton = document.createElement('button');
addListButton.textContent = 'Add list';

newListContainer.appendChild(addListButton);
newListContainer.appendChild(newListInput);

let draggedTask = null;

function createList() {
  let listElement = document.createElement('div');
  listElement.className = 'list';

  let listTitle = document.createElement('h2');
  listTitle.textContent = newListInput.value;

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

  addTaskButton.addEventListener('click', () => {
    let taskCard = document.createElement('div');
    taskCard.className = 'taskCardDraggable';
    taskCard.draggable = true;

    let taskText = document.createElement('span');
    taskText.textContent = taskInput.value;

    let deleteTaskButton = document.createElement('button');
    deleteTaskButton.textContent = 'Delete';

    let completeCheckbox = document.createElement('input');
    completeCheckbox.type = 'checkbox';

    taskCard.append(taskText, deleteTaskButton, completeCheckbox);
    taskListContainer.appendChild(taskCard);

    taskInput.value = '';
    taskInput.focus();

    taskCard.addEventListener('dragstart', () => taskCard.classList.add('dragging'));
    taskCard.addEventListener('dragend', () => taskCard.classList.remove('dragging'));

    deleteTaskButton.addEventListener('click', () => taskCard.remove());

    completeCheckbox.addEventListener('change', () => {
      taskText.style.textDecorationLine = completeCheckbox.checked ? 'line-through' : '';
    });
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
