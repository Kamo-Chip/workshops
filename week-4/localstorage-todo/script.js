const form = document.getElementById("crud-form");
const todoInput = document.getElementById("item-name");
const todoIdInput = document.getElementById("item-id");
const todosList = document.getElementById("items-list");
const saveBtn = document.getElementById("save-btn");
const cancelBtn = document.getElementById("cancel-btn");

function getTodos() {
  return JSON.parse(localStorage.getItem("todos") || "[]");
}
function setTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  const todos = getTodos();
  todosList.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = todo.completed ? "completed" : "";
    li.innerHTML = `
      <span>${todo.name}</span>
      <div>
        <button class="complete-btn">${todo.completed ? "Undo" : "Done"}</button>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;
    li.querySelector(".complete-btn").onclick = () => toggleComplete(todo.id);
    li.querySelector(".edit-btn").onclick = () => startEdit(todo);
    li.querySelector(".delete-btn").onclick = () => deleteTodo(todo.id);
    todosList.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = todoInput.value.trim();
  const id = todoIdInput.value;
  if (!name) return;
  let todos = getTodos();
  if (id) {
    todos = todos.map((todo) => todo.id === id ? { ...todo, name } : todo);
  } else {
    todos.unshift({ id: Date.now().toString(), name, completed: false });
  }
  setTodos(todos);
  resetForm();
  renderTodos();
});

function startEdit(todo) {
  todoIdInput.value = todo.id;
  todoInput.value = todo.name;
  saveBtn.textContent = "Update";
  cancelBtn.style.display = "inline-block";
}

cancelBtn.addEventListener("click", resetForm);

function resetForm() {
  todoIdInput.value = "";
  todoInput.value = "";
  saveBtn.textContent = "Add";
  cancelBtn.style.display = "none";
}

function deleteTodo(id) {
  let todos = getTodos().filter((todo) => todo.id !== id);
  setTodos(todos);
  renderTodos();
}

function toggleComplete(id) {
  let todos = getTodos().map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  setTodos(todos);
  renderTodos();
}

renderTodos();
