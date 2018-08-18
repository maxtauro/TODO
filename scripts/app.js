//TODO
// - fix naming
// - modularize the code properly
// - encapsulate firebase methods

//TODO is this global var bad form??
var app = {
    userId: '',
    isLoading: true,
    loggedIn: false,
    tasks: [],
    spinner: document.querySelector('.loader'),
    lastTaskId: 0,
};

(function () {

    'use strict';

    /*****************************************************************************
     *
     * Page Setup
     *
     ****************************************************************************/

    //TODO tidy up the sign in set up
    // check if user is logged in
    if (checkLogin()) {
        app.loggedIn = true;
        app.userId = getCurrentUserId();
        loadUserData();
        //TODO load tasks logic
        // user is signed in
    }

    if (!app.loggedIn) {
        document.getElementById('signout-button').style.display='none';
        document.getElementById('loginFormModal').style.display='block';
    }

    /*****************************************************************************
     *
     * Event listeners for UI elements
     *
     ****************************************************************************/

    // Signout eventlistener
    var signoutBtn = document.getElementById('signout-button'); //TODO hide button if signed out
    signoutBtn.addEventListener('click', signOut);

    // EventListener for checking tasks
        // TODO: add firebase
    var list = document.querySelector('ul');
    list.addEventListener('click', function (ev) {
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
        }
    }, false);

    var addTaskInput = document.getElementById('addtask');
    addTaskInput.addEventListener("keypress", function (e) {
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13') {
            addTask();
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


    if (app.isLoading) {
        app.spinner.setAttribute('hidden', true);
        app.container.removeAttribute('hidden');
        app.isLoading = false;
    }

})();
