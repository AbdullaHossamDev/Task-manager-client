import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskViewComponent } from './task-view/task-view.component';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  error: String;
  alert: String;
  tasks: Array<any>;

  constructor(
    private taskServ: TaskService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.tasks = [];
    this.getTasks();
  }

  getTasks(){
    this.removeErr();
    this.taskServ.getMyTasks().subscribe(
      (data: Array<any>) => {
        if (data.length > 0) {
          this.tasks = data;
        } else {
          this.error = "You don't have any tasks yet"
          this.tasks = []
        }
      },
      err => {
        if(err.status == 0){
          this.error = 'Please check your network';
        }else{
          this.error = err.error
        }
      })
  }

  addTask() {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      width: '850px',
      height: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskServ.addTask(result).subscribe(
          (data) => {
            this.getTasks();
            this.alert = "Task added successfully";
          },
          err => {
            if(err.status == 0){
              this.error = 'Please check your network';
            }else{
              this.error = err.error
            }
          }
        )
      }
    });
  }

  editTask(task) {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      width: '850px',
      height: '400px',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskServ.updateAll(result).subscribe(
          (data) => {
            this.getTasks();
            this.alert = data.msg;
          },
          err => {
            if(err.status == 0){
              this.error = 'Please check your network';
            }else{
              this.error = err.error
            }
          }
        )
      }
    });
  }

  viewTask(task) {
    const dialogRef = this.dialog.open(TaskViewComponent, {
      width: '850px',
      height: '400px',
      data: task
    });
  }

  delete(task) {
    this.taskServ.delete(task._id).subscribe(
      (data) => {
        this.alert = data.msg;
        this.getTasks();
      },
      err => {
        if(err.status == 0){
          this.error = 'Please check your network';
        }else{
          this.error = err.error
        }
      }
    )
  }

  removeErr() {
    this.error = undefined;
  }
  removeAlert() {
    this.alert = undefined;
  }

}
