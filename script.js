let tasks = [];
let filter = "all";

// Load from localStorage
function loadTasks() {
  const data = localStorage.getItem("tasks");
  if (data) {
    tasks = JSON.parse(data);
  }
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add Task
document.getElementById("addBtn").addEventListener("click", addTask);
document.getElementById("taskInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text === "") return;

  const task = {
    id: Date.now(),
    text: text,
    completed: false
  };

  tasks.push(task);
  input.value = "";

  saveTasks();
  renderTasks();
}

// Toggle Complete
function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );

  saveTasks();
  renderTasks();
}

// Delete Task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);

  saveTasks();
  renderTasks();
}

// Set Filter
function setFilter(type) {
  filter = type;
  renderTasks();
}

// Render Tasks
function renderTasks() {
  const list = document.getElementById("taskList");
  const emptyMsg = document.getElementById("emptyMsg");

  list.innerHTML = "";

  let filteredTasks = tasks;

  if (filter === "active") {
    filteredTasks = tasks.filter(task => !task.completed);
  } else if (filter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  }

  if (filteredTasks.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }

  filteredTasks.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="${task.completed ? 'completed' : ''}" 
            onclick="toggleTask(${task.id})">
        ${task.text}
      </span>
      <button class="delete-btn" onclick="deleteTask(${task.id})">❌</button>
    `;

    list.appendChild(li);
  });
}

// Initialize
loadTasks();
renderTasks();