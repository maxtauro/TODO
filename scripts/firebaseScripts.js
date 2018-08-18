//TODO properly encapsulate these functions in an object


'use strict';

// Get a reference to the database service
var database = firebase.database();


// check if user is logged in (returns bool)
function checkLogin() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) return true;
        else return false;
    });

}

function getCurrentUserId() {
    return firebase.auth().currentUser.uid;
}

function signIn() {

    if (app.loggedIn) signOut();

    var username = document.getElementById("uname").value;
    var password = document.getElementById('psw').value;

    document.getElementById("uname").value = '';
    document.getElementById('psw').value = '';

    firebase.auth().signInWithEmailAndPassword(username, password)
        .catch(function(err) {
            alert(err); //TODO put meaningful error response
            return false;
        });

    app.userId = getCurrentUserId();
    app.loggedIn = true;

    loadUserData();
    return true;
}

function signOut() {
    firebase.auth().signOut()
        .catch(function (err) {
            //TODO Handle errors
        });

    app.loggedIn = false;
}

function createUser() { //TODO refine user creation
    var username = document.getElementById("new-username").value;
    var password = document.getElementById('new-password').value;
    var confirmPassword = document.getElementById('confirm-password').value;

    //TODO should the username persist?
    document.getElementById("new-username").value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';

    if (password === confirmPassword) {
        // Register a new user // sick
        firebase.auth().createUserWithEmailAndPassword(username, password)
            .catch(function (err) {
                alert(err); //TODO put meaningful error response
                return false;
            });
    }
    else {
        return false;
    }

    app.userId = getCurrentUserId();
    return true;
}

function loadUserData() {

    function getMaxTaskId(tasks) {

        if (tasks.length < 1) return;

        var maxId = tasks[0].task_id;

        for(var i = 1; i < tasks.length; ++i) {
            if (tasks[i].task_id > maxId) maxId = tasks[i].task_id;
        }

        app.lastTaskId = ++maxId;
    }

    var tasksRef = firebase.database().ref('users/' + app.userId + '/tasks');
    tasksRef.once('value').then(function (snapshot) {
        getMaxTaskId(snapshot.val());
        displayTasks(snapshot.val());
    });

}

function addTaskToFireBase(task) {

    firebase.database().ref('users/' + app.userId + '/tasks/' + task.id).set({
        task_id: task.id,
        task_name: task.text,
        checked: task.checked,
        cleared: task.cleared
    });
}

function clearTaskOnFireBase(task) {
    firebase.database().ref('users/' + app.userId + '/tasks/' + task.id + '/cleared').set(true);
}

function checkTaskOnFireBase(taskName) {

    var taskId;

    for (var i = 0; app.tasks.length; ++i) {
        if (app.tasks[i].text === taskName) {
            taskId = app.tasks[i].id;
            break;
        }
    }

    firebase.database().ref('users/' + app.userId + '/tasks/' + taskId + '/checked').set(true);
}

function getTaskFromFireBase(taskId) {
    //TODO
}





