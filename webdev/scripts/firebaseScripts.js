//TODO properly encapsulate these functions in an object

'use strict';

// Create a callback which logs the current auth state
function createAuthCallback() {
    firebase.auth().onAuthStateChanged(function(authData) {
        if (authData) {
            app.userId = authData.uid;
            app.loggedIn = true;
            loadUserData();
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
        } else {
            app.userId = '';
            app.loggedIn = false;
            document.getElementById('loginFormModal').style.display='block';
            console.log("User is logged out");
        }
    });

}

function getCurrentUserId() {

    if (firebase.auth().currentUser === null) {
        console.log("Tried loading current user id, current user was null")
        return null;
    }
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
            console.log("Sign out error: " + err);
        });

    app.loggedIn = false;
    window.location.reload(true);
}

function createUser() {
    var username = document.getElementById("new-username").value;
    var password = document.getElementById('new-password').value;
    var confirmPassword = document.getElementById('confirm-password').value;

    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';

    if (password === confirmPassword) {
        // Register a new user
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

        if (tasks === null || tasks.length < 1) return;

        var maxId = tasks[0].task_id;

        for(var i = 1; i < tasks.length; ++i) {
            if (tasks[i].task_id > maxId) maxId = tasks[i].task_id;
        }

        app.lastTaskId = ++maxId;
    }

    var tasksRef = firebase.database().ref('users/' + getCurrentUserId() + '/tasks');
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
    });
}

function clearTaskOnFireBase(task) {
    firebase.database().ref('users/' + app.userId + '/tasks/').child(task.id).remove();
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






