package com.maxtauro.todo;

import android.util.Log;
import android.view.View;

import com.firebase.ui.database.FirebaseRecyclerAdapter;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.Query;

import java.util.HashMap;

public class FirebaseRecyclerAdapterTaskList extends FirebaseRecyclerAdapter<Task, TaskListViewHolder> {

    /**
     * @param modelClass      Firebase will marshall the data at a location into
     *                        an instance of a class that you provide
     * @param modelLayout     This is the layout used to represent a single item in the list.
     *                        You will be responsible for populating an instance of the corresponding
     *                        view with the data from an instance of modelClass.
     * @param viewHolderClass The class that hold references to all sub-views in an instance modelLayout.
     * @param ref             The Firebase location to watch for data changes. Can also be a slice of a location,
     *                        using some combination of {@code limit()}, {@code startAt()}, and {@code endAt()}.
     */
    public FirebaseRecyclerAdapterTaskList(Class<Task> modelClass, int modelLayout, Class<TaskListViewHolder> viewHolderClass, Query ref) {
        super(modelClass, modelLayout, viewHolderClass, ref);
    }

    @Override
    protected void populateViewHolder(final TaskListViewHolder viewHolder, Task model, int position) {
        viewHolder.txtTaskName.setText(model.getText());

        viewHolder.itemClickListener = new ItemClickListener() {
            @Override
            public void onClick(View view, int position) {
                Log.d("Clicked on task", String.valueOf(viewHolder.txtTaskName.getText()));

            }
        };
    }

    @Override
    protected Task parseSnapshot(DataSnapshot snapshot) {
        HashMap<String, String> taskInfo = (HashMap<String, String>) snapshot.getValue();
        Task task = new Task(
                (Boolean) snapshot.child("checked").getValue(),
                (Boolean) snapshot.child("cleared").getValue(),
                ((Long) snapshot.child("task_id").getValue()).intValue(),
                (String) snapshot.child("task_name").getValue()
        );
        return task;
    }

}
