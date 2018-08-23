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

    // Create a callback which logs the current auth state
    firebase.auth().onAuthStateChanged(function(authData) {
        if (authData) {
            app.userId = authData.uid;
            app.loggedIn = true;
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
        } else {
            app.userId = '';
            app.loggedIn = false
            console.log("User is logged out");
        }
    });

    // check if user is logged in
    if (checkLogin()) {
        app.loggedIn = true;
        app.userId = getCurrentUserId();
        loadUserData();
    }

    if (!app.loggedIn) {
        document.getElementById('loginFormModal').style.display='block';
    }

    /*****************************************************************************
     *
     * Event listeners for UI elements
     *
     ****************************************************************************/

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

        // TODO signin on enter
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

    var addTaskInput = document.getElementById('addtask');
    addTaskInput.addEventListener("keypress", function (e) {
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13') {
            addTask();
            return false;
        }
    }, false);

    // Signout even listener
    var signoutBtn = document.getElementById('signout-button');
    signoutBtn.addEventListener('click', function (ev) {
        // TODO tidy this up
        signOut();
        document.getElementById('signout-modal').style.display='none'
        document.getElementById('loginFormModal').style.display='none'
        },
        false);


    var userIcon = document.getElementById('user-icon');
    userIcon.addEventListener('click', function (event) {

        console.log("clicking icon");

        if (app.loggedIn) {
            document.getElementById('signout-modal').style.display='block';
        }

        else {
            document.getElementById('loginFormModal').style.display='block';
        }

    }, false);


    if (app.isLoading) {
        app.spinner.setAttribute('hidden', true);
        app.container.removeAttribute('hidden');
        app.isLoading = false;
    }

})();
