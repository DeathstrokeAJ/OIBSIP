let userInput = document.querySelector('.container .add-task-box input');
let addBtn = document.querySelector('.container .add-task-box .add-btn');
let pendingTasks = document.querySelector('.pending-tasks .all-tasks');
let completedTasks = document.querySelector('.completed-tasks .all-tasks');
let no_of_tasks_txt = document.querySelector('.container .others .no-of-tasks');
let clearAllBtn = document.querySelector('.container .clear-all-btn');
let othersBox = document.querySelector('.container .others');
let todos = JSON.parse(localStorage.getItem("all-todos") || "[]");

addBtn.addEventListener('click', () => {
    if (userInput.value !== '') {
        createTodo(userInput.value);
    }
});

let createTodo = (userTask) => {
    let taskInfo = { task: userTask, status: "pending" };
    todos.push(taskInfo);
    localStorage.setItem("all-todos", JSON.stringify(todos));
    userInput.value = '';
    showTasks();
    count_no_of_tasks();
};

let showTasks = () => {
    let pendingList = '';
    let completedList = '';

    todos.forEach((todo, id) => {
        let taskElement = `<div class="task task-${id}">
            <input type="checkbox" name="" id="${id}" ${todo.status === 'completed' ? 'checked' : ''} onclick="taskComplete(this)">
            <span class="userTask ${todo.status === 'completed' ? 'checked' : ''}">${todo.task}</span>
            <div class="btns">
                <button class="dlt-btn" onclick="deleteTask(${id})"><i class="fa-regular fa-trash-can"></i></button>
            </div>
        </div>`;

        if (todo.status === 'completed') {
            completedList += taskElement;
        } else {
            pendingList += taskElement;
        }
    });

    pendingTasks.innerHTML = pendingList || '<p class="no-task-message">No pending tasks</p>';
    completedTasks.innerHTML = completedList || '<p class="no-task-message">No completed tasks</p>';

    count_no_of_tasks();
    if (todos.length === 0) {
        othersBox.style.display = 'none';
    } else {
        othersBox.style.display = 'block';
    }
};

let taskComplete = (elem) => {
    if (elem.checked) {
        elem.nextElementSibling.classList.add('checked');
        todos[elem.id].status = 'completed';
    } else {
        elem.nextElementSibling.classList.remove('checked');
        todos[elem.id].status = 'pending';
    }
    localStorage.setItem("all-todos", JSON.stringify(todos));
    showTasks();
};

let deleteTask = (deleteId) => {
    todos.splice(deleteId, 1);
    localStorage.setItem("all-todos", JSON.stringify(todos));
    showTasks();
};

let count_no_of_tasks = () => {
    let no_of_tasks = todos.length;
    no_of_tasks_txt.innerHTML = `You have <strong>${no_of_tasks}</strong> Tasks`;
};

clearAllBtn.addEventListener('click', () => {
    todos = [];
    localStorage.setItem("all-todos", JSON.stringify(todos));
    showTasks();
});

showTasks();
