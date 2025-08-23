const toDoList = document.getElementById("to-do-list");
const addBtn = document.getElementById("add-btn");
const addInput = document.getElementById("add-input");

function addHandler(e) {
  e.preventDefault();

  const savedTasksList = JSON.parse(localStorage.getItem("Tasks")) || [];
  let taskCounter =
    savedTasksList.length > 0
      ? savedTasksList[savedTasksList.length - 1].Id + 1
      : 1;

  const addInputValue = addInput.value.trim();
  if (!addInputValue) return;

  const task = {
    Id: taskCounter,
    taskName: addInputValue,
    isCompleted: false,
  };

  createTask(task);
  saveToLocalStorage(task);
}

function createTask({ Id, taskName }) {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task");
  taskContainer.id = Id;

  const leftSide = document.createElement("div");
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  const newTask = document.createElement("label");
  newTask.textContent = taskName;
  leftSide.append(checkBox, newTask);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");

  taskContainer.append(leftSide, deleteBtn);
  toDoList.append(taskContainer);

  addInput.value = "";
}

function saveToLocalStorage(task) {
  const savedTaskList = JSON.parse(localStorage.getItem("Tasks")) || [];
  savedTaskList.push(task);
  localStorage.setItem("Tasks", JSON.stringify(savedTaskList));
}

function CompletedTaskHandler(taskContainer) {
  taskContainer.classList.toggle("completed");
  const savedTaskList = JSON.parse(localStorage.getItem("Tasks"));
  const updatedSavedTaskList = savedTaskList.map((task) => {
    if (Number(taskContainer.id) === task.Id) {
      task.isCompleted = taskContainer.querySelector(
        'input[type="checkbox"]'
      ).checked;
    }
    return task;
  });
  localStorage.setItem("Tasks", JSON.stringify(updatedSavedTaskList));
}

function deleteTaskHandler(taskContainer) {
  taskContainer.remove();
  let savedTaskList = JSON.parse(localStorage.getItem("Tasks"));
  savedTaskList = savedTaskList.filter((task) => {
    return Number(taskContainer.id) !== task.Id;
  });
  localStorage.setItem("Tasks", JSON.stringify(savedTaskList));
}

function markAsCompleted(task) {
  const taskElement = document.getElementById(task.Id);
  taskElement.classList.add("completed");
  const checkbox = taskElement.querySelector('input[type="checkbox"]');
  checkbox.checked = true;
}

addBtn.addEventListener("click", addHandler);
addInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addHandler(e);
  }
});

toDoList.addEventListener("click", (e) => {
  const taskContainer = e.target.closest(".task");
  if (!taskContainer) return;

  if (e.target.classList.contains("delete-btn")) {
    deleteTaskHandler(taskContainer);
  } else if (e.target.type === "checkbox") {
    CompletedTaskHandler(taskContainer);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const savedTasksList = JSON.parse(localStorage.getItem("Tasks")) || [];
  savedTasksList.forEach((task) => {
    createTask(task);
    if (task.isCompleted === true) {
      markAsCompleted(task);
    }
  });
});
