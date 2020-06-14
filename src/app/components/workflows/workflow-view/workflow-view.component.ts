import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { AuthService } from 'src/app/services/auth/auth/auth.service';
import { WorkflowDetailsComponent } from '../workflow-details/workflow-details.component';
import { TaskService } from 'src/app/services/task/task.service';
import { TaskViewComponent } from '../../tasks/task-view/task-view.component';
import { TaskDetailComponent } from '../../tasks/task-detail/task-detail.component';

@Component({
  selector: 'app-workflow-view',
  templateUrl: './workflow-view.component.html',
  styleUrls: ['./workflow-view.component.css']
})
export class WorkflowViewComponent implements OnInit {

  error: String;
  alert: String;



  workflowId: String;
  stages: any;
  workflow: any;

  myId: String;
  constructor(
    private activeRoutes: ActivatedRoute,
    private router: Router,
    private workflowServ: WorkflowService,
    private authServ: AuthService,
    private taskServ: TaskService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.stages = {}
    this.myId = this.authServ.getId();
    this.activeRoutes.params.subscribe(data => {
      this.workflowId = data.id;
    })
    this.getWorkflow();
  }

  getWorkflow() {
    this.workflowServ.getWorkflow(this.workflowId).subscribe(
      (data) => {
        if (data.length > 0) {
          this.workflow = data[0];
          for (let i = 0; i < data[0].stages.length; i++) {
            this.stages[data[0].stages[i]] = [];
          }
          for (let i = 0; i < data[0].taskData.length; i++) {
            this.stages[data[0].taskData[i].stage].push(data[0].taskData[i]);
          }
        }else{
          this.error = "Oooh, You are not allowed to see this Workflow";
          this.Navigate();
        }
      },
      err => {
        this.error = err.error;
      }
    )
  }

  addTask(){
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      width: '850px',
      height: '400px',
      data: {workflowId: this.workflowId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskServ.addTask(result).subscribe(
          (data) => {
            this.getWorkflow()
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
            this.getWorkflow()
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

  deleteTask(task) {
    this.taskServ.delete(task._id).subscribe(
      (data) => {
        this.alert = data.msg;
        this.getWorkflow();
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

  editWorkflow() {
    const dialogRef = this.dialog.open(WorkflowDetailsComponent, {
      width: '850px',
      height: '400px',
      data: this.workflow
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.workflowServ.update(result).subscribe(
          (data) => {
            this.alert = data.msg;
            this.getWorkflow();
          },
          err => {
            this.error = err.error;
          }
        )
      }
    });
  }

  addWorkflow() {
    const dialogRef = this.dialog.open(WorkflowDetailsComponent, {
      width: '850px',
      height: '400px',
      data: {}
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.workflowServ.addWorkflow(result).subscribe(
          (data) => {
            this.alert = data.msg;
            this.router.navigate(['/home/workflows'])
          },
          err => {
            this.error = err.error;
          }
        )
      }
    });
  }

  removeErr() {
    this.error = undefined;
  }
  removeAlert() {
    this.alert = undefined;
  }

  Navigate(){
    setTimeout(()=>{
      alert('I got this')
      this.router.navigate(['/home']);
    },5000)
  }
}
