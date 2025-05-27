document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');
  const toggleDark = document.getElementById('toggleDark');

  // Load saved tasks and theme
  loadTasks();
  loadTheme();

  addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
      alert('Please enter a task!');
      return;
    }
    addTask(taskText);
    taskInput.value = '';
    taskInput.focus();
  });

  taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTaskBtn.click();
  });

  toggleDark.addEventListener('change', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });

  function addTask(text, completed = false) {
    const li = document.createElement('li');
    li.className = 'task-item';
    if (completed) li.classList.add('completed');

    const span = document.createElement('span');
    span.textContent = text;

    const inputEdit = document.createElement('input');
    inputEdit.type = 'text';
    inputEdit.value = text;
    inputEdit.className = 'task-editing';
    inputEdit.style.display = 'none';

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'task-buttons';

    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete-btn';
    completeBtn.textContent = '✔';
    completeBtn.onclick = () => {
      li.classList.toggle('completed');
      saveTasks();
    };

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = '✎';
    editBtn.onclick = () => {
      if (inputEdit.style.display === 'none') {
        inputEdit.style.display = 'inline';
        span.style.display = 'none';
        inputEdit.focus();
      } else {
        span.textContent = inputEdit.value;
        inputEdit.style.display = 'none';
        span.style.display = 'inline';
        saveTasks();
      }
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '✖';
    deleteBtn.onclick = () => {
      taskList.removeChild(li);
      saveTasks();
    };

    buttonsDiv.appendChild(completeBtn);
    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(inputEdit);
    li.appendChild(buttonsDiv);
    taskList.appendChild(li);

    saveTasks();
  }

  function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(item => {
      const text = item.querySelector('span').textContent;
      const completed = item.classList.contains('completed');
      tasks.push({ text, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      JSON.parse(saved).forEach(task => addTask(task.text, task.completed));
    }
  }

  function loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.body.classList.add('dark');
      toggleDark.checked = true;
    }
  }
});
