document.addEventListener('DOMContentLoaded', function() {
    const bodyId = document.body.id;
    
    if (bodyId === 'home') {
        loadTasks();
    } else if (bodyId === 'add') {
        setupForm();
    } else if (bodyId === 'about') {
        showStats();
    }
});

// LocalStorage Functions
function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Home Page Functions
function loadTasks() {
    const tasks = getTasks();
    const taskList = document.getElementById('task-list');
    
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description || 'No description'}</p>
            <p><strong>Due:</strong> ${task.dueDate}</p>
            <p><strong>Priority:</strong> <span class="priority-${task.priority}">${task.priority}</span></p>
        `;
        taskList.appendChild(taskElement);
    });
}

// Add Task Page Functions
function setupForm() {
    const form = document.getElementById('task-form');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const dueDate = document.getElementById('due-date').value;
        const priority = document.getElementById('priority').value;

        // Validation
        if (!title) {
            showError('Title is required!');
            return;
        }

        if (!dueDate) {
            showError('Due date is required!');
            return;
        }

        // Create task object
        const newTask = {
            title,
            description,
            dueDate,
            priority,
            id: Date.now()
        };

        // Save to localStorage
        const tasks = getTasks();
        tasks.push(newTask);
        saveTasks(tasks);

        // Redirect to home page
        window.location.href = 'index.html';
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }
}

// About Page Functions
function showStats() {
    const tasks = getTasks();
    document.getElementById('task-count').textContent = tasks.length;
    
    const highPriorityCount = tasks.filter(task => task.priority === 'high').length;
    document.getElementById('high-priority-count').textContent = highPriorityCount;
}