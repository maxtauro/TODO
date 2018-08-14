(function () {

    'use strict';

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            alert("logged in");
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
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }

    var addTaskInput = document.getElementById('addtask')
    addTaskInput.onkeypress = function (e) {
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13') {
            newTask();
            return false;
        }
    }

    //Close the signin modal if user clicks outside
    var modal = document.getElementById('loginFormModal');
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    a.onclick = function (event) {
        alert("new user");
    }

})();
