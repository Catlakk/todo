//Select DOM
const todoInput = document.querySelector(".todo-input");
const todoDate = document.querySelector(".todo-date")
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);

//Functions

function addTodo(e) {
  
  e.preventDefault();
 
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value +"\n"+ todoDate.value;
 
 
  saveLocalTodos(todoInput.value +"\n"+  todoDate.value);
 
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  todoInput.value = "";
  todoDate.value = "";


const editBtn = document.createElement("button");
editBtn.innerHTML = `<a>Edit</a>`
editBtn.classList.add("edit-btn");
todoDiv.appendChild(editBtn);

  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<a>Complited</a>`
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<a>Delete</a>`
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
 
  todoList.appendChild(todoDiv);
}

function deleteTodo(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    
    const todo = item.parentElement;
    todo.classList.add("fall");
    
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", e => {
      todo.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    console.log(todo);
  }
}
  

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    todoDate.value ="";
    
  const editBtn = document.createElement("button");
  editBtn.innerHTML = `<a>Edit</a>`;
  editBtn.classList.add("edit-btn");
  todoDiv.appendChild(editBtn);
  editBtn.addEventListener('click', () => this.todoInput(input));

    
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<a>Complited</a>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    

    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<a>Delete</a>`
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
 

    todoList.appendChild(todoDiv);
  });
}
