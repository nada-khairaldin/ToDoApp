const toDoList = document.getElementById("to-do-list");
const addBtn = document.getElementById("add-btn");
const addInput = document.getElementById("add-input");

function addHandler(e) {
  e.preventDefault();
  const addInputValue = addInput.value.trim();
  if (!addInputValue) return;
  createTask(addInputValue);
  

}

function createTask(addInputValue) {
const taskContainer = document.createElement("div");
  taskContainer.classList.add("task");

  const leftSide = document.createElement("div");
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  const newTask = document.createElement("label");
  newTask.textContent = addInputValue;
  leftSide.append(checkBox, newTask);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn")

  taskContainer.append(leftSide, deleteBtn);
  toDoList.append(taskContainer);
  addInput.value ="";

  checkBox.addEventListener("change" , () =>{
    CompleteHandler(taskContainer);
  })

  deleteBtn.addEventListener("click", ()=>{
    deleteTaskHandler(taskContainer);
  })

  }


  function CompleteHandler(taskContainer) {
  taskContainer.classList.toggle("completed");
}

function deleteTaskHandler(taskContainer) {
  taskContainer.remove();
}

addBtn.addEventListener("click", addHandler);
addInput.addEventListener("keypress" , (e) => {
  if(e.key === "Enter"){
    addHandler(e)
  }
})
