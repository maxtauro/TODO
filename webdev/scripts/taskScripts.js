'use strict';

// Create a new task, add task to List
function addTask() {

    var inputValue = document.getElementById('addtask').value;

    if (inputValue !== '') {

        var task = new Task();
        task.constructor(app.lastTaskId++, inputValue);

        displayTask(task);

        if (app.loggedIn) {
            addTaskToFireBase(task);
        }

        app.tasks.push(task);
        document.getElementById("addtask").value = "";
    }
}

// Tasks is an array of task nodes from firebase,
function displayTasks(tasks) {

    for(var i = 0; i < tasks.length; ++i) {

            var task = new Task();
            task.constructor(tasks[i].task_id, tasks[i].task_name);
            task.checked = tasks[i].checked;

            app.tasks.push(task);

            displayTask(task);
        }
}

function displayTask(task) {

    var li = document.createElement("li");
    var inputValue = task.text;

    var t = document.createTextNode(inputValue);
    li.appendChild(t);

    document.getElementById("task-list").appendChild(li);

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    if (task.checked) {
        li.classList.toggle('checked');
    }

    // Event listener for closing tasks
    span.addEventListener('click', function () {
        clearTask(this.parentElement, task); //TODO test that this call passes the correct task
    }, false);

    li.addEventListener('click', function (ev) {

        var taskName = ev.target.textContent;

        if (app.loggedIn) {
            taskName = taskName.substring(0, taskName.length - 1); // remove the closing X from the text content
            checkTaskOnFireBase(taskName);
        }

        ev.target.classList.toggle('checked');
    }, false);

}

function clearTask(div, task) {
    div.style.display = "none";

    if (app.loggedIn) {
        clearTaskOnFireBase(task);
    }
}

