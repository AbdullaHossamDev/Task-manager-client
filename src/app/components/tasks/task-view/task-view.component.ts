import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {
  
  workflowName: String;
  workflowArr: Array<any>;

  constructor(
    public dialogRef: MatDialogRef<TaskViewComponent>,
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
        }
      }
    )
  }

}
