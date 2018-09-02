package com.maxtauro.todo;

import android.graphics.Paint;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.google.firebase.database.DatabaseReference;

public class TaskListViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener{

    public TextView txtTaskName;
    public ImageView imgCheckMark;

    private DatabaseReference taskRef;

    ItemClickListener itemClickListener;

    public TaskListViewHolder(View itemView) {
        super(itemView);
        txtTaskName = (TextView)itemView.findViewById(R.id.txt_task_name);
        imgCheckMark = (ImageView) itemView.findViewById(R.id.check);
        itemView.setOnClickListener(this);

    }

    public void setItemClickListener(ItemClickListener itemClickListener){
        this.itemClickListener = itemClickListener;
    }

    @Override
    public void onClick(View view){
        itemClickListener.onClick(view, getAdapterPosition());
    }

    public void checkTask(boolean check) {

        if (check) {
            txtTaskName.setPaintFlags(txtTaskName.getPaintFlags()
                    | Paint.STRIKE_THRU_TEXT_FLAG);

            imgCheckMark.setVisibility(View.VISIBLE);
        }

        else {
            txtTaskName.setPaintFlags(txtTaskName.getPaintFlags() & (~ Paint.STRIKE_THRU_TEXT_FLAG));
            imgCheckMark.setVisibility(View.INVISIBLE);
        }

    }

    public void setRef(DatabaseReference ref) {
        this.taskRef = ref;
    }

    public DatabaseReference getTaskRef() {
        return taskRef;
    }

    public void clearTask() {
        taskRef.removeValue(); //TODO put this in firebaseHelper
    }
}
