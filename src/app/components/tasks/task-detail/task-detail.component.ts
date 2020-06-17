import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  task: any;

  minDate: Date;
  maxDate: Date;

  workflowArr: Array<any>;
  stages: Array<any>;
  workflowName: String;

  constructor(
    public dialogRef: MatDialogRef<TaskDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private workflowServ: WorkflowService
  ) { }

  ngOnInit(): void {
    this.workflowServ.getAll().subscribe(
      (data) => {
        this.workflowArr = data;
        if(this.data.workflowId){
          let workflow = this.workflowArr.find(wf => wf._id == this.data.workflowId);
          
          this.workflowName = workflow.name;
          this.stages = workflow.stages;
          
        }
        if (this.data._id) {
          this.task = JSON.parse(JSON.stringify(this.data));
        }
        else {
          this.task = {
            name: '',
            description: '',
            startDate: new Date(),
            stage: String,
            workflowId: this.data.workflowId,
            done: false
          }
          if(this.data.workflowId){
            this.task.stage = this.stages[0]
          }
        }
    
        this.minDate = new Date(this.task.startDate - 2, 0, 1);
        this.maxDate = new Date(this.task.startDate + 10, 11, 31);
      }
    )
  }

  save(formData) {
    this.dialogRef.close(this.task) 
  }
  

  selectedWorkflow(event) {
    let ind = event.target.selectedIndex;
    if (ind > 0) {
      this.stages = this.workflowArr[ind - 1].stages;
      this.task.workflowId = this.workflowArr[ind - 1]._id;
      this.task.stage = this.stages[0];
    } else {
      this.stages = undefined;
    }
  }

  selectedStage(event){
    let ind = event.target.selectedIndex;
    this.task.stage = this.stages[ind]
  }

  selectedDone(event){
    let ind = event.target.selectedIndex;
    this.task.done = ind == 0 ? false : true;
    this.task.endDate = ind == 0? undefined: new Date();
  }
}
