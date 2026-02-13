// --- State Management ---
let tasks = [];
let taskHistory = [];
let currentView = 'my-day'; // 'my-day', 'important', 'tasks', 'history'

// --- Elements ---
const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const categorySelect = document.getElementById('categorySelect');
const importantToggle = document.getElementById('importantToggle');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const viewTitle = document.getElementById('viewTitle');
const searchInput = document.getElementById('searchInput');

// My Day Specifics
const myDayHeader = document.getElementById('myDayHeader');
const currentDateDisplay = document.getElementById('currentDateDisplay');
const progressBar = document.getElementById('progressBar');
const progressText = document.querySelector('.progress-text');
const startDayBtn = document.getElementById('startDayBtn');

// Sidebar
const sidebarLinks = document.querySelectorAll('.nav-links li');
const menuToggle = document.getElementById('menuToggle');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    setupEventListeners();
    updateView('my-day'); // Default view
    checkOverdueTasks();
    setInterval(checkOverdueTasks, 60000);
    renderDate();
});

function loadData() {
    const tasksJSON = localStorage.getItem('tasks');
    tasks = tasksJSON ? JSON.parse(tasksJSON) : [];

    // Migration: Ensure all tasks have new fields if they are old
    tasks = tasks.map(t => ({
        ...t,
        category: t.category || 'Personal',
        isImportant: t.isImportant || false,
        isMyDay: t.isMyDay || false
    }));

    const historyJSON = localStorage.getItem('history');
    taskHistory = historyJSON ? JSON.parse(historyJSON) : [];
}

function saveData() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('history', JSON.stringify(taskHistory));
    updateProgressBar();
}

function setupEventListeners() {
    // Add Task
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    // Important Toggle in Input
    importantToggle.addEventListener('click', () => {
        importantToggle.classList.toggle('active');
    });

    // Sidebar Navigation
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            const view = link.dataset.view;
            if (view) {
                updateView(view);
                // Mobile: close sidebar
                if (window.innerWidth <= 768) {
                    document.querySelector('.sidebar').classList.remove('open');
                }
            } else if (link.id === 'toggleHistoryBtn') {
                // Toggle History Panel (if we had a separate one, but now we might just switch view)
                // Let's make History a view for simplicity in this overhaul
                updateView('history');
            }
        });
    });

    // Mobile Menu
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('open');
        });
    }

    // Search Toggle
    const searchIconBtn = document.getElementById('searchIconBtn');
    if (searchIconBtn) {
        searchIconBtn.addEventListener('click', () => {
            document.querySelector('.search-container').classList.toggle('active');
            if (document.querySelector('.search-container').classList.contains('active')) {
                searchInput.focus();
            }
        });
    }

    // Search Input
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        if (currentView === 'history') {
            renderHistory(query);
        } else {
            renderTasks(query);
        }
    });

    // Start Day
    if (startDayBtn) {
        startDayBtn.addEventListener('click', () => {
            // Logic: Sort My Day tasks by priority/time and focus first
            const myTasks = tasks.filter(t => t.isMyDay && !t.completed);
            if (myTasks.length > 0) {
                alert(`Let's start with: "${myTasks[0].text}"`);
            } else {
                alert("All tasks for the day are complete! 🎉");
            }
        });
    }
}

// --- View Logic ---
function updateView(view) {
    currentView = view;

    // Update Sidebar Active State
    sidebarLinks.forEach(l => l.classList.remove('active'));
    const activeLink = Array.from(sidebarLinks).find(l => l.dataset.view === view)
        || (view === 'history' ? document.getElementById('toggleHistoryBtn') : null);
    if (activeLink) activeLink.classList.add('active');

    // Update Header & UI
    taskList.innerHTML = ''; // Clear current list
    myDayHeader.style.display = 'none';
    document.querySelector('.input-area').style.display = 'flex'; // Default show

    switch (view) {
        case 'my-day':
            viewTitle.textContent = 'My Day';
            myDayHeader.style.display = 'flex';
            renderTasks();
            break;
        case 'important':
            viewTitle.textContent = 'Important';
            renderTasks();
            break;
        case 'tasks':
            viewTitle.textContent = 'All Tasks';
            renderTasks();
            break;
        case 'personal':
            viewTitle.textContent = 'Personal';
            renderTasks();
            break;
        case 'work':
            viewTitle.textContent = 'Work';
            renderTasks();
            break;
        case 'history':
            viewTitle.textContent = 'History';
            document.querySelector('.input-area').style.display = 'none'; // Hide input in history
            renderHistory();
            break;
    }
}

// --- Task Core ---
function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    const task = {
        id: Date.now(),
        text: text,
        dueDate: dateInput.value,
        category: categorySelect.value,
        isImportant: importantToggle.classList.contains('active'),
        isMyDay: currentView === 'my-day', // Auto-add to My Day if in that view
        completed: false
    };

    tasks.push(task);
    saveData();
    logActivity('added', `Added task: "${text}"`, task);

    // Reset Input
    taskInput.value = '';
    dateInput.value = '';
    importantToggle.classList.remove('active');

    renderTasks();
}

function renderTasks(searchQuery = '') {
    // Safety check: specific logic for history view to avoid clearing list
    // Safety check: specific logic for history view to avoid clearing list
    if (currentView === 'history') {
        renderHistory(searchQuery);
        return;
    }

    taskList.innerHTML = '';

    let filteredTasks = tasks.filter(t => {
        // Search Filter
        if (searchQuery && !t.text.toLowerCase().includes(searchQuery.toLowerCase())) return false;

        // View Filter
        if (currentView === 'my-day') return t.isMyDay && !t.completed;
        if (currentView === 'important') return t.isImportant && !t.completed;
        if (currentView === 'personal') return t.category === 'Personal' && !t.completed;
        if (currentView === 'work') return t.category === 'Work' && !t.completed;
        if (currentView === 'tasks') return !t.completed; // Show all active
        return false;
    });

    // Sort: Important first, then date
    filteredTasks.sort((a, b) => {
        if (a.isImportant !== b.isImportant) return b.isImportant - a.isImportant;
        return new Date(a.dueDate || '9999-12-31') - new Date(b.dueDate || '9999-12-31');
    });

    filteredTasks.forEach(task => {
        const li = createTaskElement(task);
        taskList.appendChild(li);
    });

    updateProgressBar();
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.draggable = true; // Drag & Drop
    if (task.isImportant) li.classList.add('important-task');
    if (task.completed) li.classList.add('completed');
    if (isOverdue(task)) li.classList.add('overdue');

    // Drag Events
    li.addEventListener('dragstart', handleDragStart);
    li.addEventListener('dragover', handleDragOver);
    li.addEventListener('drop', handleDrop);

    li.innerHTML = `
        <div class="task-content">
            <div class="custom-checkbox" onclick="toggleComplete(${task.id})"></div>
            <div class="text-wrapper">
                <span class="task-text">${task.text} 
                    <span class="category-badge">${task.category}</span>
                </span>
                ${task.dueDate ? `<span class="task-date">Due: ${new Date(task.dueDate).toLocaleString()}</span>` : ''}
            </div>
        </div>
        <div class="actions">
            <button class="icon-btn star-btn ${task.isImportant ? 'active' : ''}" onclick="toggleImportant(${task.id})">
                ${task.isImportant ? '★' : '☆'}
            </button>
            <button class="icon-btn" onclick="rescheduleTask(${task.id})" title="Reschedule">📅</button>
            <button class="delete-btn" onclick="deleteTask(${task.id})">🗑️</button>
        </div>
    `;
    return li;
}

// --- Actions ---
window.toggleComplete = function (id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveData();
        logActivity(task.completed ? 'completed' : 'added', `${task.completed ? 'Completed' : 'Unchecked'} "${task.text}"`);
        renderTasks(); // Re-render to remove from list (since we only show pending usually)
    }
};

window.toggleImportant = function (id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.isImportant = !task.isImportant;
        saveData();
        renderTasks();
    }
};

window.rescheduleTask = function (id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    // hidden date input trick or prompt
    // Let's use a dynamic input for better UX
    const newDate = prompt("Enter new date (YYYY-MM-DDTHH:MM)", task.dueDate || '');
    if (newDate !== null) { // User didn't cancel
        task.dueDate = newDate;
        task.alerted = false; // Reset alarm
        saveData();
        logActivity('added', `Rescheduled "${task.text}" to ${new Date(newDate).toLocaleString()}`);
        renderTasks();
    }
};

window.deleteTask = function (id) {
    const task = tasks.find(t => t.id === id);
    tasks = tasks.filter(t => t.id !== id);
    saveData();
    if (task) logActivity('deleted', `Deleted "${task.text}"`, task);
    renderTasks();
};

// --- History & Logging ---
function logActivity(type, message, taskData = null) {
    taskHistory.unshift({
        type,
        message,
        timestamp: new Date().toLocaleString(),
        taskData
    });
    if (taskHistory.length > 50) taskHistory.pop();
    saveData();
}

function renderHistory(searchQuery = '') {
    taskList.innerHTML = ''; // Reuse main list for history

    let filteredHistory = taskHistory;
    if (searchQuery) {
        filteredHistory = taskHistory.filter(item =>
            item.message.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    filteredHistory.forEach(item => {
        const li = document.createElement('li');
        li.className = `history-item ${item.type}`;
        li.innerHTML = `
            <span>${item.message} <small>(${item.timestamp})</small></span>
            <div class="history-actions">
                ${item.type === 'deleted' ? `<button class="restore-btn" onclick="restoreTask(${item.taskData?.id})">↺ Restore</button>` : ''}
                <button class="delete-history-btn" onclick="permanentlyDeleteTask('${item.timestamp}')" title="Permanently Delete">🗑️</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

window.permanentlyDeleteTask = function (timestamp) {
    if (confirm("Are you sure you want to permanently delete this history item?")) {
        taskHistory = taskHistory.filter(h => h.timestamp !== timestamp);
        saveData();
        renderHistory();
    }
};

window.restoreTask = function (id) {
    // This is tricky if we don't store full task in history. 
    // In logActivity we passed taskData. 
    // Let's find it in history.
    const item = taskHistory.find(h => h.taskData && h.taskData.id === id);
    if (item && item.taskData) {
        item.taskData.completed = false; // Reset status on restore?
        tasks.push(item.taskData);
        saveData();
        renderHistory(); // Refresh
        alert("Task Restored!");
    }
};

// --- Utilities ---
// --- Audio Reminder System ---
let alarmSound = null;
let alarmTimeout = null;

function checkOverdueTasks() {
    const now = new Date();
    tasks.forEach(t => {
        if (!t.completed && t.dueDate) {
            const due = new Date(t.dueDate);
            // Check if due time is reached (within last minute to trigger once)
            // But we need a flag 'alerted' to avoid re-triggering or missed trigger.
            // Let's rely on 'alerted' flag.
            if (now >= due && !t.alerted) {
                triggerAlarm(t);
            }
        }
    });
}

function triggerAlarm(task) {
    task.alerted = true; // Mark as alerted
    saveData(); // Save state

    // Play Sound
    playAlarmSound();

    // Show Alert Modal/Overlay
    const modal = document.createElement('div');
    modal.className = 'alarm-modal';
    modal.innerHTML = `
        <div class="alarm-content">
            <h2>🔔 Task Reminder</h2>
            <p>"${task.text}" is due!</p>
            <button id="stopAlarmBtn">Dismiss</button>
        </div>
    `;
    document.body.appendChild(modal);

    // Stop logic
    const stopBtn = modal.querySelector('#stopAlarmBtn');
    stopBtn.addEventListener('click', () => {
        stopAlarmSound();
        modal.remove();
    });

    // Auto-stop after 1 minute
    setTimeout(() => {
        if (alarmSound) {
            stopAlarmSound();
            if (document.body.contains(modal)) modal.remove();
        }
    }, 60000);
}

function playAlarmSound() {
    // Simple Beep using Web Audio API
    if (!window.AudioContext) return;
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // A4
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // Pulse effect
    let now = audioCtx.currentTime;
    for (let i = 0; i < 60; i++) { // 30 beeps over 60s
        gainNode.gain.setValueAtTime(1, now + i * 2);
        gainNode.gain.setValueAtTime(0, now + i * 2 + 0.5);
    }

    oscillator.start();
    alarmSound = { ctx: audioCtx, osc: oscillator };
}

function stopAlarmSound() {
    if (alarmSound) {
        try {
            alarmSound.osc.stop();
            alarmSound.ctx.close();
        } catch (e) { console.log(e); }
        alarmSound = null;
    }
}

function isOverdue(task) {
    return task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
}

function updateProgressBar() {
    // Calculate for My Day
    const myTasks = tasks.filter(t => t.isMyDay);
    if (myTasks.length === 0) {
        progressBar.style.width = '0%';
        progressText.textContent = '';
        return;
    }
    const completed = myTasks.filter(t => t.completed).length;
    const percent = Math.round((completed / myTasks.length) * 100);
    progressBar.style.width = `${percent}%`;
    progressText.textContent = `${percent}% Completed`;
}

function renderDate() {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    currentDateDisplay.textContent = new Date().toLocaleDateString('en-US', options);
}

// --- Drag & Drop ---
let draggedItem = null;

function handleDragStart(e) {
    draggedItem = this;
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => this.style.opacity = '0.5', 0);
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDrop(e) {
    e.stopPropagation();
    if (draggedItem !== this) {
        draggedItem.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
        // Note: Real Reordering requires array manipulation, 
        // for now this is visual swapping.
        // For a robust app, we should swap indices in `tasks` array.
    }
    this.style.opacity = '1';
    return false;
}
