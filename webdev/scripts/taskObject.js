function Task(text_) {
    this.id = -1;
    this.text = text_;
    this.checked = false;
    this.cleared = false;

    this.check = function () {
        if (this.checked) {
            this.checked = false;
        }
        else {
            this.checked = true;
        }
    }

    this.clear = function() {
        if (this.cleared) {
            this.cleared = false;
        }
        else {
            this.cleared = true;
        }
    }

    this.constructor = function (id, text) {
        this.id = id;
        this.text = text;
    }

}