package com.maxtauro.todo;

public class Task {

    private boolean checked = false;
    private int taskId;
    private String taskName;

    Task(){ // default constructor is needed for firebase
        taskId = -1;
        taskName = "";
        checked = false;
    }

    Task(int taskId, String taskName) {
        this.checked = false;
        this.taskId = taskId;
        this.taskName = taskName;
    }

    Task(boolean checked, int taskId, String taskName) {
        this.checked = checked;
        this.taskId = taskId;
        this.taskName = taskName;
    }

    public int getTaskId() {
        return taskId;
    }

    public void setId(int id) {
        this.taskId = id;
    }

    public String getTaskName() {
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

}
