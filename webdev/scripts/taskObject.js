function Task(text_) {
    this.id = -1;
    this.text = text_;
    this.checked = false;

    this.check = function () {
        if (this.checked) {
            this.checked = false;
        }
        else {
            this.checked = true;
        }
    }


    this.constructor = function (id, text) {
        this.id = id;
        this.text = text;
    }

}