import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { WorkflowDetailsComponent } from './workflow-details/workflow-details.component';
import { AuthService } from 'src/app/services/auth/auth/auth.service';

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.css']
})
export class WorkflowsComponent implements OnInit {

  error: String;
  alert: String;
  workflows: Array<any>;
  myWorkflows: Array<any>;

  myId: String;

  constructor(
    private workflowServ: WorkflowService,
    private authServ: AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.workflows = [];
    this.myWorkflows = [];
    this.myId = this.authServ.getId();
    this.getWorkflows()
  }

  getWorkflows(){
    this.workflowServ.getAll().subscribe(
      (data)=>{
        this.workflows = [];
        this.myWorkflows = [];
        if (data.length > 0) {
          data.map(w => {
            if(w.createdBy == this.myId){
              this.myWorkflows.push(w);
              
              let user = w.usersData.find(u => u._id == w.createdBy);
              w.creator = user.name;

            }else{
              this.workflows.push(w)

              let user = w.usersData.find(u => u._id == w.createdBy);
              w.creator = user.name;
            }
          })
          
        } else {
          this.error = "You don't have any workflows yet"
          this.myWorkflows = [];
          this.workflows = []
        }
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

  addWorkflow(){
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
            this.getWorkflows();
          },
          err => {
            this.error = err.error;
          }
        )
      }
    });
  }

  editWorkflow(workflow){
    const dialogRef = this.dialog.open(WorkflowDetailsComponent, {
      width: '850px',
      height: '400px',
      data: workflow
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.workflowServ.update(result).subscribe(
          (data) => {
            this.alert = data.msg;
            this.getWorkflows();
          },
          err => {
            this.error = err.error;
          }
        )
      }
    });
  }

  delete(workflow){
    this.workflowServ.delete(workflow._id).subscribe(
      (data) => {
        this.alert = data.msg;
        this.getWorkflows()
      },
      err => {
        this.error = err.error;
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
