//TODO properly encapsulate these functions in an object

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
        if (tasks[i].cleared === false) {

            //TODO make copy ctor
            var task = new Task();
            task.constructor(tasks[i].task_id, tasks[i].task_name);
            task.cleared = tasks[i].cleared;
            task.checked = tasks[i].checked;

            app.tasks.push(task);

            displayTask(task);
        }
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

    // Event listener for closing tasks
    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
        close[i].addEventListener('click', function () {
            clearTask(this.parentElement, task); //TODO test that this call passes the correct task
        }, false);
    }

    /*var list = document.querySelector('ul');
    list.addEventListener('click', function (ev) {
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
        }
    }, false); */

    li.addEventListener('click', function (ev) {

        var taskName = ev.target.textContent;
        ev.target.classList.toggle('checked');

        if (app.loggedIn) {
            checkTaskOnFireBase(taskName);
        }
    }, false);



    // //Event listener for checking tasks
    // var list = document.getElementsByClassName('li');
    //     list.addEventListener('click', function () {
    //         checkTask(this.parentElement, task); //TODO test that this call passes the correct task
    //     }, false);


}

function checkTask(){}

function clearTask(div, task) {
    div.style.display = "none";

    for (var i = 0; i < app.tasks.length; ++i) {
        if (app.tasks[i].id === task.id) {
            app.tasks[i].clear();
            break;
        }
    }

    if (app.loggedIn) {
        clearTaskOnFireBase(task);
    }
}

