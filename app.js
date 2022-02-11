// Define UI Vars

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // DOM Load Event
    document.addEventListener('DOMContentLoaded' , getTasks);
    //add task event
    form.addEventListener("submit", addTask);
    //remove task event
    taskList.addEventListener("click", removeTask);
    // remove All tasks
    clearBtn.addEventListener("click", clearTask);
    // Filter tasks event
    filter.addEventListener("keyup", filterTasks);
}

// Get Tasks From Local Storage
function getTasks() {         
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // Create li element
        const li = document.createElement("li");
        // add className
        li.className = "collection-item";
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new Link Element
        const link = document.createElement('a');
        // add className
        link.className = "delete-item secondary-content"; // obs: Para o icone aparecer do lado direito do conteudo é preciso incluir a classe "secondary-content"
        // add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // append the link to li
        li.appendChild(link);
        // append li to ul
        taskList.appendChild(li);
    })
}

// add Task
function addTask(e) {
    if (taskInput.value === "") {
        alert("add a task");
    }

    // Create li element
    const li = document.createElement("li");
    // add className
    li.className = "collection-item";  
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new Link Element
    const link = document.createElement('a');
    // add className
    link.className = "delete-item secondary-content"; 
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append the link to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);
    // Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);  
    // Clear input
    taskInput.value = '';


    e.preventDefault(); 
}

// Store Task
function storeTaskInLocalStorage(task){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));  
}

// Remove Task

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        console.log(e.target);  
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            // Remove From Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task , index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1)
        }
    });

        localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Remove All Tasks
function clearTask() {
// taskList.innerHTML = '';   Uma maneira de eliminar as tarefas

    while (taskList.firstChild) {     // Esse é um jeito mais rápido de eliminar as tarefas
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from LS

    clearTasksFromLocalStorage();
}

// Button Clear Tasks from LocalStorage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}


// Filter tasks
function filterTasks(e) {

    const text = e.target.value.toLowerCase();
    // console.log(text); // mostra em tempo real no console o que esta sendo digitado

    // OBS querySelectorAll tem o padrão de NodeList apensar de não ser array é possivel obter seus itens com comando .forEach
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

