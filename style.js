document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    if (taskText === '') return;

    const task = {
        text: taskText,
        completed: false,
        addedDate: new Date().toLocaleString(),
        completedDate: null
    };

    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);

    input.value = '';
    renderTasks();
}

function toggleTaskCompletion(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        tasks[index].completedDate = new Date().toLocaleString();
    } else {
        tasks[index].completedDate = null;
    }
    saveTasks(tasks);
    renderTasks();
}

function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
}

function editTask(index) {
    const tasks = getTasks();
    const newText = prompt("Edit task:", tasks[index].text);
    
    if (newText !== null && newText.trim() !== '') {
        tasks[index].text = newText.trim();
        saveTasks(tasks);
        renderTasks();
    }
}

function renderTasks() {
    const tasks = getTasks();
    const pendingTasksList = document.getElementById('pendingTasks');
    const completedTasksList = document.getElementById('completedTasks');

    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.innerHTML = `
            <i class="fas ${task.completed ? 'fa-check-circle' : 'fa-circle'}"></i> ${task.text} <small>(${task.addedDate})</small>
            <div class="task-buttons">
                <button onclick="toggleTaskCompletion(${index})">
                    <i class="fas ${task.completed ? 'fa-undo' : 'fa-check'}"></i>
                </button>
                <button class="edit" onclick="editTask(${index})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete" onclick="deleteTask(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        if (task.completed) {
            taskElement.classList.add('completed');
            completedTasksList.appendChild(taskElement);
        } else {
            pendingTasksList.appendChild(taskElement);
        }
    });
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    renderTasks();
}