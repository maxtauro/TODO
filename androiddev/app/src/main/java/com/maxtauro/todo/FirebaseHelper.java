package com.maxtauro.todo;

import com.firebase.ui.database.FirebaseRecyclerAdapter;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.HashMap;

public class FirebaseHelper {



    private class User {
        String userId;
        Task[] tasks = {};
        int lastTaskId;
    }

    User currUser;
    private DatabaseReference currUserRef;
    private DatabaseReference taskList;

    public FirebaseRecyclerAdapter<Task,TaskListViewHolder> adapter;

    public FirebaseHelper() {
        currUser = updateCurrUser();
        taskList = loadTaskList();
    }

    public DatabaseReference loadTaskList() {
        String userId = currUser.userId;
        currUserRef = FirebaseDatabase.getInstance().getReference().child("users").child(userId);
        DatabaseReference taskRef = currUserRef.child("tasks");

        taskRef.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {

                try {
                    ArrayList<Integer> taskIdList = new ArrayList<Integer>();
                    for (HashMap o: (ArrayList<HashMap>) dataSnapshot.getValue()) {

                        if (o != null) {
                            int id = ((Long) o.get("task_id")).intValue();
                            taskIdList.add(id);
                        }

                    }
                    setLastTaskId(taskIdList);
                }

                catch (ClassCastException e) {
                    //TODO implement better exception safety
                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) { }
        });

        return taskRef;
    }

    //TODO tidy this up
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
        DatabaseReference newTaskRef = taskList.child(String.valueOf((currUser.lastTaskId)));

        //TODO figure out how to add these children in one call, currently onDataChange is called
        // each time a child is added, this is inefficient and error prone
        newTaskRef.child("task_id").setValue(newTask.getTaskId());
        newTaskRef.child("checked").setValue(newTask.isChecked());
        newTaskRef.child("task_name").setValue(newTask.getTaskName());

    }

    public void checkTask(DatabaseReference taskRef, boolean check) {
        taskRef.child("checked").setValue(check);
    }

    public void setupSystem() {

    }

    private void setLastTaskId(ArrayList<Integer> taskIdList) {
        int lastTaskId = 0;
        for (int i: taskIdList) {
            if (i > lastTaskId) {
                lastTaskId = i;
            }
        }
        currUser.lastTaskId = lastTaskId;
    }

}
