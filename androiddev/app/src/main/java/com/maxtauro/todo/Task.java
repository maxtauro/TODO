package com.maxtauro.todo;

public class Task {
    //TODO fix naming

    private boolean checked = false, cleared = false;
    private int taskId;
    private String taskName;

    Task(){
        taskId = -1;
        taskName = "";
        checked = false;
        cleared = false;
    }

    Task(boolean checked, boolean cleared, int taskId, String taskName) {
        this.checked = checked;
        this.cleared = cleared;
        this.taskId = taskId;
        this.taskName = taskName;
    }

    public int getId() {
        return taskId;
    }

    public void setId(int id) {
        this.taskId = id;
    }

    public String getText() {
        return taskName;
    }

    public void setText(String text) {
        this.taskName = text;
    }

    public boolean isChecked() {
        return checked;
    }

    public void check() {
        if (checked) checked = false;
        else checked = true;
    }

    public boolean isCleared() {
        return cleared;
    }

    public void setCleared() {
        if (cleared) cleared = false;
        else cleared = true;
    }
}
