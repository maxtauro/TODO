package com.maxtauro.todo;

import com.firebase.ui.database.FirebaseRecyclerAdapter;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;

public class FirebaseHelper {

    private class User {
        String userId;
        Task[] tasks = {};
        int lastTaskId;
    }

    User currUser;
    private DatabaseReference taskList;

    public FirebaseRecyclerAdapter<Task,TaskListViewHolder> adapter;

    public FirebaseHelper() {
        currUser = updateCurrUser();
        taskList = loadTaskList();
    }

    public DatabaseReference loadTaskList() {
        String userId = currUser.userId;
        return FirebaseDatabase.getInstance().getReference().child("users").child(userId).child("tasks");
    }

    //TODO tidy this up
    public User updateCurrUser() {
        currUser = new User();
        currUser.userId = FirebaseAuth.getInstance().getCurrentUser().getUid();
        currUser.lastTaskId = getLastTaskId();
        return currUser;
    }

    public void setAdapter(FirebaseRecyclerAdapter<Task,TaskListViewHolder> adapter){
        this.adapter = adapter;
    }


    //TODO: implement this
    public int getLastTaskId() {
        return 0;
    }

    public void addTask(String newTaskName) {
      //  taskList.child(String.valueOf(++(currUser.lastTaskId))).setValue()
    }

    public void checkTask(DatabaseReference taskRef, boolean check) {
        taskRef.child("checked").setValue(check);
    }

    public void setupSystem() {

    }

}
