package com.maxtauro.todo;

import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.TextView;

public class TaskListViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener{

    public TextView txtTaskName;

    ItemClickListener itemClickListener;

    public TaskListViewHolder(View itemView) {
        super(itemView);
        txtTaskName = (TextView)itemView.findViewById(R.id.txt_task_name);
        itemView.setOnClickListener(this);
    }

    public void setItemClickListener(ItemClickListener itemClickListener){
        this.itemClickListener = itemClickListener;
    }

    @Override
    public void onClick(View view){
        itemClickListener.onClick(view, getAdapterPosition());
    }
}
