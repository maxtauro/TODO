package com.maxtauro.todo;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.DialogFragment;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.support.v7.widget.helper.ItemTouchHelper;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;

public class TaskListActivity extends AppCompatActivity {

    //View
    RecyclerView listTasksRecyclerView;
    RecyclerView.LayoutManager layoutManager;

    private DialogFragment dialog_AddTask = new DialogFragmentAddTask();
    private FirebaseHelper firebaseHelper = new FirebaseHelper();

    FirebaseRecyclerAdapterTaskList adapter;


    // UI elements
    private Toolbar toolbar;
    private Button clearBtn;
    private FloatingActionButton addTaskButton;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_task_list);

        toolbar = (Toolbar) findViewById(R.id.toolbar);
        toolbar.setTitle(R.string.app_name);
        toolbar.setTitleTextColor(0xFF474444);
        setSupportActionBar(toolbar);

        addTaskButton = (FloatingActionButton) findViewById(R.id.add_task_button);
        addTaskButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                dialog_AddTask.show(getSupportFragmentManager(), "add task dialog");
            }
        });

        clearBtn = (Button) findViewById(R.id.clear_button);
        clearBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                firebaseHelper.clear();
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
