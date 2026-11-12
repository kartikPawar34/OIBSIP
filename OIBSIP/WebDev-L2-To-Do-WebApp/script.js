let tasks = JSON.parse(localStorage.getItem('my_tasks')) || [];
let editingId = null;

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const pendingList = document.getElementById('pendingList');
const completedList = document.getElementById('completedList');
const pendingCount = document.getElementById('pendingCount');
const completedCount = document.getElementById('completedCount');

function getTimeString() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function saveAndDisplay() {
  localStorage.setItem('my_tasks', JSON.stringify(tasks));
  displayTasks();
}

addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (!text) return;

  const newTask = {
    id: Date.now(),
    text: text,
    isCompleted: false,
    timeAdded: getTimeString(),
    timeCompleted: null
  };

  tasks.unshift(newTask); 
  taskInput.value = '';
  saveAndDisplay();
});

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addBtn.click();
  }
});

function toggleTask(id) {
  tasks = tasks.map(t => {
    if (t.id === id) {
      const nextStatus = !t.isCompleted;
      return {
        ...t,
        isCompleted: nextStatus,
        timeCompleted: nextStatus ? getTimeString() : null
      };
    }
    return t;
  });
  saveAndDisplay();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  if (editingId === id) editingId = null;
  saveAndDisplay();
}

function editTask(id) {
  editingId = id;
  displayTasks();
}

function saveEdit(id, newText) {
  if (newText.trim() !== '') {
    tasks = tasks.map(t => t.id === id ? { ...t, text: newText.trim() } : t);
  }
  editingId = null;
  saveAndDisplay();
}

function displayTasks() {
  pendingList.innerHTML = '';
  completedList.innerHTML = '';

  const pending = tasks.filter(t => !t.isCompleted);
  const completed = tasks.filter(t => t.isCompleted);

  pendingCount.textContent = pending.length;
  completedCount.textContent = completed.length;

  if (pending.length === 0) {
    pendingList.innerHTML = '<li class="empty">No tasks to do right now. Enjoy your day!</li>';
  } else {
    pending.forEach(t => {
      const li = document.createElement('li');
      
      if (t.id === editingId) {
        li.innerHTML = `
          <input type="text" class="edit-input" value="${t.text}" id="input-${t.id}">
          <div class="btn-group">
            <button class="btn-done" onclick="saveEdit(${t.id}, document.getElementById('input-${t.id}').value)">Save</button>
          </div>
        `;
      } else {
        li.innerHTML = `
          <div class="task-info">
            <span class="task-text">${t.text}</span>
            <span class="time">Added at ${t.timeAdded}</span>
          </div>
          <div class="btn-group">
            <button class="btn-done" onclick="toggleTask(${t.id})">Done</button>
            <button class="btn-edit" onclick="editTask(${t.id})">Edit</button>
            <button class="btn-delete" onclick="deleteTask(${t.id})">Del</button>
          </div>
        `;
      }
      pendingList.appendChild(li);
    });
  }

  if (completed.length === 0) {
    completedList.innerHTML = '<li class="empty">No completed tasks yet.</li>';
  } else {
    completed.forEach(t => {
      const li = document.createElement('li');
      li.className = 'completed';
      li.innerHTML = `
        <div class="task-info">
          <span class="task-text">${t.text}</span>
          <span class="time">Done at ${t.timeCompleted || t.timeAdded}</span>
        </div>
        <div class="btn-group">
          <button class="btn-done" onclick="toggleTask(${t.id})">Undo</button>
          <button class="btn-delete" onclick="deleteTask(${t.id})">Del</button>
        </div>
      `;
      completedList.appendChild(li);
    });
  }
}

displayTasks();