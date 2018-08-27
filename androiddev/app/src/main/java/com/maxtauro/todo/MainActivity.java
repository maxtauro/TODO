package com.maxtauro.todo;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.Toast;

import com.firebase.ui.auth.AuthUI;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

public class MainActivity extends AppCompatActivity {

    private Context context;
    private Button btnEmailLogin;

    private final static int LOGIN_PERMISSION=1000;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        this.context = this;

        btnEmailLogin = (Button) findViewById(R.id.email_login_button);
        btnEmailLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivityForResult(
                        AuthUI.getInstance()
                        .createSignInIntentBuilder()
                        .setAllowNewEmailAccounts(true)
                        .build(),
                        LOGIN_PERMISSION
                );
            }
        });

        //If already signed in, start the list activity
        FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
        if (user != null) {
            login();
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if(requestCode == LOGIN_PERMISSION){
            startNewActivity(resultCode,data);
        }
    }

    private void startNewActivity(int resultCode, Intent data) {
        if (resultCode == RESULT_OK){
            login();
        }
        else{
            Toast.makeText(this, "Login failed !!!", Toast.LENGTH_SHORT).show();
        }
    }

    private void login(){
        Intent intent = new Intent(MainActivity.this, TaskListActivity.class);
        startActivity(intent);
        finish();
    }
}
