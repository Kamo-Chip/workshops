// Replace with your Supabase project credentials
const SUPABASE_URL = "https://orybgkghdsoqfpitkdli.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yeWJna2doZHNvcWZwaXRrZGxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3OTIyNjEsImV4cCI6MjA3MjM2ODI2MX0.9M3QOKCCIUMNH9-Rc1c_zW15HERPkFraVx7_90ghNlg";

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById("crud-form");
const todoInput = document.getElementById("item-name");
const todoIdInput = document.getElementById("item-id");
const todosList = document.getElementById("items-list");
const saveBtn = document.getElementById("save-btn");
const cancelBtn = document.getElementById("cancel-btn");

const TABLE_NAME = "todos"; // Make sure this table exists in your Supabase DB

async function fetchTodos() {
  const { data, error } = await sb.from(TABLE_NAME).select().order('id', { ascending: false });
  if (error) {
    todosList.innerHTML = `<li class="error">${error.message}</li>`;
    return;
  }
  todosList.innerHTML = "";
  data.forEach((todo) => {
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
    li.querySelector(".complete-btn").onclick = () => toggleComplete(todo);
    li.querySelector(".edit-btn").onclick = () => startEdit(todo);
    li.querySelector(".delete-btn").onclick = () => deleteTodo(todo.id);
    todosList.appendChild(li);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = todoInput.value.trim();
  const id = todoIdInput.value;
  if (!name) return;
  if (id) {
    await sb.from(TABLE_NAME).update({ name }).eq("id", id);
  } else {
    await sb.from(TABLE_NAME).insert({ name, completed: false });
  }
  resetForm();
  fetchTodos();
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

async function deleteTodo(id) {
  await sb.from(TABLE_NAME).delete().eq("id", id);
  fetchTodos();
}

async function toggleComplete(todo) {
  await sb.from(TABLE_NAME).update({ completed: !todo.completed }).eq("id", todo.id);
  fetchTodos();
}

fetchTodos();
