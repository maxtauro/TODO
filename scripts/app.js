//TODO
// - fix naming
// - modularize the code properly
// - encapsulate firebase methods

(function () {

    'use strict';
    // check if user is logged in
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // loadTasks();
            //TODO add login logic (load user data)

        } else { // No user is signed in
            document.getElementById('loginFormModal').style.display='block'
        }
    });


    /*****************************************************************************
     *
     * Page Setup
     *
     ****************************************************************************/

    // Create a "close" button and append it to each list item
    var myNodelist = document.getElementsByTagName("LI");
    var i;
    for (i = 0; i < myNodelist.length; i++) {
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);
    }


    function signIn() {
        var username = document.getElementById("uname").value;
        var password = document.getElementById('psw').value;

        document.getElementById("uname").value = '';
        document.getElementById('psw').value = '';

        firebase.auth().signInWithEmailAndPassword(username, password)
            .catch(function(err) {
                alert(err); //TODO put meaningful error response
                return false;
            });
        return true;
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
            alert("Passwords do not match"); //TODO make this cleaner
        }

        return true;
    }

    // Create a new task, add task to List
    // TODO: add firebase, create a Task class w/ the necessary info
    function newTask() {
        var li = document.createElement("li");
        var inputValue = document.getElementById("addtask").value;
        var t = document.createTextNode(inputValue);
        li.appendChild(t);

        if (inputValue !== '') {
            document.getElementById("myUL").appendChild(li);
        }

        document.getElementById("addtask").value = "";

        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);

        for (i = 0; i < close.length; i++) {
            close[i].onclick = function () {
                var div = this.parentElement;
                div.style.display = "none";
            }
        }
    }

    /*****************************************************************************
     *
     * Event listeners for UI elements
     *
     ****************************************************************************/

    // EventListener for checking tasks
        // TODO: add firebase
    var list = document.querySelector('ul');
    list.addEventListener('click', function (ev) {
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
        }
    }, false);

    // EventListener for closing tasks
    // TODO: call a function the closes
    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; ++i) {
        close[i].addEventListener('click', function () {
            var div = this.parentElement;
            div.style.display = "none";
        }, false);
    }

    var addTaskInput = document.getElementById('addtask');
    addTaskInput.addEventListener("keypress", function (e) {
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13') {
            newTask();
            return false;
        }
    }, false);


    //Close the signin modal if user clicks outside
    var modal = document.getElementById('loginFormModal');
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }, false);

    //Trigger firebase sign-in
    var signInForm = document.getElementById('loginform');
    signInForm.addEventListener('submit', function (event) {
        event.preventDefault(); // don't refresh when form submits

        if (signIn()) {
            var modal = document.getElementById('loginFormModal');
            modal.style.display = "none";
        }
    }, false);

    //New user link event listener
    var newUserLink = document.getElementById('new-user');
    newUserLink.addEventListener('click', function (event) {
        var loginModal = document.getElementById('loginFormModal');
        loginModal.style.display = "none";

        var newUserModal  = document.getElementById('newUserModal');
        newUserModal.style.display='block';
        }, false);

    // Trigger create User Event
    var newUserForm = document.getElementById('newUserForm');
    newUserForm.addEventListener('submit', function (event) {
        event.preventDefault(); // don't refresh when form submits

        if (createUser()) {
            var newUserModal  = document.getElementById('newUserModal');
            newUserModal.style.display='none';
        }
    }, false);


})();
