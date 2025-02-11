let tasks = [];

const tasksDiv = document.getElementById("tasks");
const input = document.getElementById("taskInput");
const storageKey = "tasks";

function renderTasks() 
{
    tasksDiv.innerHTML = null;

    for (const [idx, task] of Object.entries(tasks)) {
        const container = document.createElement("div");
        container.style.marginBottom = "10px";

        const text = document.createElement("p");
        text.style.display ="inline";
        text.style.marginRight = "10px";
        text.textContent = task;

        const button = document.createElement("button");
        button.textContent = "Delete";
        button.onclick = () => removeTask(idx);

        container.appendChild(text);
        container.appendChild(button);

        tasksDiv.appendChild(container);
    }
} 

function loadTasks() 
{
    const oldTasks = localStorage.getItem(storageKey);
    if (oldTasks) tasks = JSON.parse(oldTasks);
    renderTasks();
}

function saveTasks() 
{
    const stringTasks = JSON.stringify(tasks);
    localStorage.setItem(storageKey, stringTasks);
}

function addTask() 
{
    const value = input.value;
    if (!value) {
        alert("You cannot enter an empty item");
        return
    }
    tasks.push(value);
    renderTasks();
    input.value = "";
    saveTasks();
 }

function removeTask(idx) 
{
    tasks.splice(idx, 1);
    renderTasks();
    saveTasks();
}

document.addEventListener("DOMContentLoaded", loadTasks);