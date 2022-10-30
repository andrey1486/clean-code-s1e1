// New task section
let newTask = document.querySelector('.todo_add');
let newTaskInput = newTask.querySelector('.input');
let addButton = newTask.querySelector('.button-edit');

// Active task section
let activeTasksList = document.querySelector('.todo_active');

// Completed task section
let completedTasksList = document.querySelector('.todo_completed');

// Change DOM
let createNewTaskElement = function (taskString) {
  let task = document.createElement('div');
  task.className = 'task';

  let checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.className = 'checkbox task__checkbox';

  let taskName = document.createElement('label');
  taskName.className = 'name';
  taskName.innerText = taskString;

  // input to change task name
  let input = document.createElement('input');
  input.className = 'input';
  input.type = 'text';

  let editButton = document.createElement('button');
  editButton.className = 'button-edit';
  editButton.innerText = 'Edit';

  let deleteButton = document.createElement('button');
  deleteButton.className = 'button-delete';

  let deleteButtonImg = document.createElement('img');
  deleteButtonImg.className = 'button-delete__icon';
  deleteButtonImg.src = './remove.svg';

  //Each elements, needs appending
  deleteButton.appendChild(deleteButtonImg);
  task.appendChild(checkBox);
  task.appendChild(taskName);
  task.appendChild(input);
  task.appendChild(editButton);
  task.appendChild(deleteButton);
  return task;
};

// add new task to list of active tasks
function addNewTask() {
  console.log('Add Task...');
  if (!newTaskInput.value) return; //empty task name

  let task = createNewTaskElement(newTaskInput.value);

  activeTasksList.appendChild(task);
  bindTaskEvents(task, moveTaskToCompleted);

  newTaskInput.value = '';
  sendAjaxRequest();
}

//Edit an existing task.
function editTask() {
  console.log('Edit Task...');
  console.log("Change 'edit' to 'save'");

  let task = this.parentNode;
  let input = task.querySelector('.input');
  let name = task.querySelector('.name');
  let editButton = task.querySelector('.button-edit');
  let isEditMode = task.classList.contains('edit_mode');

  if (isEditMode) {
    name.innerText = input.value;
    editButton.innerText = 'Edit';
  } else {
    input.value = name.innerText;
    editButton.innerText = 'Save';
  }

  task.classList.toggle('edit_mode');
}

//Delete task.
function deleteTask() {
  console.log('Delete Task...');

  let task = this.parentNode;
  let tasksSection = task.parentNode;

  tasksSection.removeChild(task);
}

//Mark task completed
function moveTaskToCompleted() {
  console.log('Complete Task...');

  //Append the task list item to the #completed-tasks
  let task = this.parentNode;
  completedTasksList.appendChild(task);
  bindTaskEvents(task, moveTaskToActive);
}

function moveTaskToActive() {
  console.log('Incomplete Task...');

  let task = this.parentNode;
  activeTasksList.appendChild(task);
  bindTaskEvents(task, moveTaskToCompleted);
}

function sendAjaxRequest() {
  console.log('AJAX Request');
}

// Set TODO section behavior.
//Set the click handler to the addTask function.
addButton.addEventListener('click', addNewTask);

let bindTaskEvents = function (task, checkBoxEventHandler) {
  console.log('bind list item events');

  task.querySelector('.checkbox').onchange = checkBoxEventHandler;
  task.querySelector('.button-edit').onclick = editTask;
  task.querySelector('.button-delete').onclick = deleteTask;
};

//set behavior for existed(loaded) tasks
// i = 0 -> title node element each TODO section
// active tasks
for (let i = 1; i < activeTasksList.children.length; i++) {
  bindTaskEvents(activeTasksList.children[i], moveTaskToCompleted);
}
// complete tasks
for (let i = 1; i < completedTasksList.children.length; i++) {
  bindTaskEvents(completedTasksList.children[i], moveTaskToActive);
}