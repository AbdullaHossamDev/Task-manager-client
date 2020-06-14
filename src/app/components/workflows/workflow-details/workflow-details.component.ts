import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth/auth.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';

@Component({
  selector: 'app-workflow-details',
  templateUrl: './workflow-details.component.html',
  styleUrls: ['./workflow-details.component.css']
})
export class WorkflowDetailsComponent implements OnInit {

  workflow: any;
  users: Array<any>;
  newStages: Array<String>;

  newStage: String;

  constructor(
    public dialogRef: MatDialogRef<WorkflowDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authServ: AuthService,
    private workflowServ: WorkflowService
  ) { }

  ngOnInit(): void {
    this.newStages = []
    this.newStage = ''
    if (this.data.createdBy) {
      this.workflow = JSON.parse(JSON.stringify(this.data));
    } else {
      this.workflow = {
        name: '',
        stages: [],
        status: 'public',
        createdBy: undefined,
        users: [],
        usersData: []
      }
    }
    this.authServ.getAll().subscribe(
      data => {
        this.users = data;
        
        if (this.workflow.createdBy) {
          let usersInd = this.workflow.users.findIndex(u => u == this.workflow.createdBy);
          this.workflow.users.splice(usersInd, 1);
          
          let usersDataInd = this.workflow.usersData.findIndex(u => u._id == this.workflow.createdBy);
          this.workflow.usersData.splice(usersDataInd, 1);
          

          let normalUsersind = this.users.findIndex(u => u._id == this.workflow.createdBy);
          normalUsersind != -1 ? this.users.splice(normalUsersind, 1): '';

          this.workflow.users.map(userId => {
            let ind2 = this.users.findIndex(u => u._id == userId);
            ind2 != -1 ? this.users.splice(ind2, 1): '';
          })
        }
      }
    )
  }

  save(formData) {
    this.workflow.stages.push(...this.newStages);
    this.dialogRef.close(this.workflow) 

  }

  selectedStatus(event) {
    let ind = event.target.selectedIndex;
    this.workflow.status = ind == 0 ? 'private' : 'public';
  }

  addToNewStages() {
    let re = /\ /gi;
    let newStr = this.newStage.replace(re, "");

    if (newStr != '') {
      this.newStages.push(this.newStage);
      this.newStage = '';
    }
  }

  deleteStage(ind) {
    this.newStages.splice(ind, 1);
  }


  removefromUsersData(movedUser){
  
    this.users.push(JSON.parse(JSON.stringify(movedUser)));

    let usersInd = this.workflow.users.findIndex(uid => uid == movedUser._id);
    this.workflow.users.splice(usersInd, 1);

    let usersDataInd = this.workflow.usersData.findIndex(u => u._id == movedUser._id);
    this.workflow.usersData.splice(usersDataInd, 1);
  }

  addToUsersData(movedUser){
    this.workflow.usersData.push(JSON.parse(JSON.stringify(movedUser)));
    this.workflow.users.push(movedUser._id);

    let usersDataInd = this.users.findIndex(u => u._id == movedUser._id);
    this.users.splice(usersDataInd, 1);
  }

}
