package com.maxtauro.todo;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.DialogFragment;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.support.v7.widget.helper.ItemTouchHelper;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;

import com.firebase.ui.auth.ui.User;
import com.firebase.ui.database.FirebaseRecyclerAdapter;
import com.google.firebase.database.FirebaseDatabase;

public class TaskListActivity extends AppCompatActivity {

    //View
    RecyclerView listTasksRecyclerView;
    RecyclerView.LayoutManager layoutManager;

    private DialogFragment dialog_AddTask = new DialogFragmentAddTask();
    private FirebaseHelper firebaseHelper = new FirebaseHelper();

    FirebaseRecyclerAdapterTaskList adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_task_list);

        //TODO declare these w/ proper scope as member vars
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        toolbar.setTitle(R.string.app_name);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.add_task_button);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                dialog_AddTask.show(getSupportFragmentManager(), "add task dialog");
            }
        });

        //recycler view init
        listTasksRecyclerView = (RecyclerView) findViewById(R.id.taskList);
        listTasksRecyclerView.setHasFixedSize(true);
        layoutManager = new LinearLayoutManager(this);
        listTasksRecyclerView.setLayoutManager(layoutManager);

        SwipeController swipeController = new SwipeController();
        ItemTouchHelper itemTouchhelper = new ItemTouchHelper(swipeController);
        itemTouchhelper.attachToRecyclerView(listTasksRecyclerView);

        firebaseHelper.setupSystem();
        updateList();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    public void addTask(String newTaskName) {
        firebaseHelper.addTask(newTaskName);
        adapter.notifyDataSetChanged();
    }

    private void updateList() {
        adapter = new FirebaseRecyclerAdapterTaskList(
                Task.class,
                R.layout.task_layout,
                TaskListViewHolder.class,
                firebaseHelper.loadTaskList()
                );

        adapter.notifyDataSetChanged();
        listTasksRecyclerView.setAdapter(adapter);
        firebaseHelper.setAdapter(adapter);

    }

}
