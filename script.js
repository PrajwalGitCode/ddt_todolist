// Function to retrieve tasks from localStorage
function retrieveTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(task => {
            const taskList = document.getElementById("taskList");
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span>${task}</span>
                <button class="complete-button" onclick="toggleComplete(this)">Complete</button>
                <button class="delete-button" onclick="deleteTask(this)">Delete</button>
            `;
            taskList.appendChild(listItem);
        });
    }
}

// Function to save tasks to localStorage
function saveTasks() {
    const taskItems = Array.from(document.querySelectorAll("#taskList li span"));
    const tasks = taskItems.map(task => task.textContent);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add a new task to the list
function addTask() {
    const taskInput = document.getElementById("task");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const taskList = document.getElementById("taskList");
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <span>${taskText}</span>
        <button class="complete-button" onclick="toggleComplete(this)">Complete</button>
        <button class="delete-button" onclick="deleteTask(this)">Delete</button>
    `;

    taskList.appendChild(listItem);
    taskInput.value = "";

    saveTasks(); // Save tasks to localStorage after adding a new task
}

// Function to toggle the "done" status of a task
function toggleComplete(button) {
    const listItem = button.parentElement;
    const taskText = listItem.querySelector("span");

    taskText.classList.toggle("done");
    saveTasks(); // Save tasks to localStorage after toggling completion status
}

// Function to delete a task
function deleteTask(button) {
    const listItem = button.parentElement;
    const taskList = document.getElementById("taskList");
    taskList.removeChild(listItem);

    saveTasks(); // Save tasks to localStorage after deleting a task
}

// Press Enter to add a task
document.getElementById("task").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Retrieve tasks from localStorage when the page loads
window.addEventListener("load", retrieveTasks);
