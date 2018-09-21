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

    createAuthCallback();

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
    var loginButton = document.getElementById('loginbutton');
    loginButton.addEventListener('click', function (event) {
        if (signIn()) {
                    var modal = document.getElementById('loginFormModal');
                    modal.style.display = "none";
                }
    }, false);

    var signInForm = document.getElementById('loginform');
    signInForm.addEventListener("keypress", function (e) {
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13') {

            if (signIn()) {
                var modal = document.getElementById('loginFormModal');
                modal.style.display = "none";
            }

            return false;
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
    var createUserButton = document.getElementById('new-user-button');
    createUserButton.addEventListener('click', function (event) {
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
        signOut();
        document.getElementById('signout-modal').style.display='none'
        document.getElementById('loginFormModal').style.display='none'
        },
        false);

    var userIcon = document.getElementById('user-icon');
    userIcon.addEventListener('click', function (event) {

        console.log("clicking icon");

        if (getCurrentUserId() !== null) {
            document.getElementById('signout-modal').style.display='block';
        }

        else {
            document.getElementById('loginFormModal').style.display='block';
        }

    }, false);

    if (app.isLoading) {
        app.spinner.setAttribute('hidden', true);
        app.isLoading = false;
    }

})();
