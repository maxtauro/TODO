package com.maxtauro.todo;

import android.util.Log;

import com.firebase.ui.database.FirebaseRecyclerAdapter;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;

public class FirebaseHelper {

    private class User {
        String userId;
        ArrayList<Task> taskList = new ArrayList<Task>();
        int lastTaskId;
    }

    User currUser;
    private DatabaseReference currUserRef;
    private DatabaseReference taskListRef;

    public FirebaseRecyclerAdapter<Task,TaskListViewHolder> adapter;

    public FirebaseHelper() {
        currUser = updateCurrUser();
        taskListRef = loadTaskList();
    }

    public DatabaseReference loadTaskList() {
        String userId = currUser.userId;
        currUserRef = FirebaseDatabase.getInstance().getReference().child("users").child(userId);
        final DatabaseReference taskRef = currUserRef.child("tasks");

        taskRef.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {

                if (!currUser.taskList.isEmpty()) {
                    currUser.taskList.clear();
                }

                for (DataSnapshot taskSnapshot: dataSnapshot.getChildren()) {
                    try {
                        Task task = new Task(
                                (Boolean) taskSnapshot.child("checked").getValue(),
                                ((Long) taskSnapshot.child("taskId").getValue()).intValue(),
                                (String) taskSnapshot.child("taskName").getValue()
                        );
                        currUser.taskList.add(task);
                    }

                    //TODO create an exception class for this
                    catch (NullPointerException e) {
                        Log.d("", "onDataChange: Task is missing fields in firebase" + taskSnapshot.getValue());
                    }
                }

                setLastTaskId();
            }

            @Override
            public void onCancelled(DatabaseError databaseError) { }
        });

        return taskRef;
    }

    public User updateCurrUser() {
        currUser = new User();
        currUser.userId = FirebaseAuth.getInstance().getCurrentUser().getUid();
        return currUser;
    }

    public void setAdapter(FirebaseRecyclerAdapter<Task,TaskListViewHolder> adapter){
        this.adapter = adapter;
    }

    public void addTask(String newTaskName) {
        Task newTask = new Task(++(currUser.lastTaskId), newTaskName);
        DatabaseReference newTaskRef = taskListRef.child(String.valueOf((currUser.lastTaskId)));

        newTaskRef.setValue(newTask);
    }

    public void checkTask(DatabaseReference taskRef, boolean check) {
        taskRef.child("checked").setValue(check);
    }

    private void setLastTaskId() {
        int lastTaskId = 0;

        for (Task task: currUser.taskList) {
            if (task.getTaskId() > lastTaskId) {
                lastTaskId = task.getTaskId();
            }
        }

        currUser.lastTaskId = lastTaskId;
    }

    public void clear() {
        for (Task task : currUser.taskList) {
            if (task.isChecked()){
                taskListRef.child(String.valueOf(task.getTaskId())).removeValue();
            }
        }
    }

    public void signOut() {
        FirebaseAuth.getInstance().signOut();
    }

}
