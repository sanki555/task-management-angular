import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TaskManagementServiceService } from '../task-management-service.service';

@Component({
  selector: "app-edit-task",
  templateUrl: "./edit-task.component.html",
  styleUrls: ["./edit-task.component.scss"],
})
export class EditTaskComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskManagementServiceService,
  ) {
   this.taskName= data.task.task_name
   this.status = data.task.status
    this.action = data.action
  }

  updateTaskForm: FormGroup;
  dropdown = ["INITIATED", "PROCESSING", "COMPLETED"];
  taskName;
  status
  action;
  ngOnInit() {
   console.log("action",this.action);
  }

  Proceed(){
    if(this.action == 'Edit Task'){
      this.updateTask()
    }else if(this.action == 'Add Task'){
      this.AddTask()
    }
  }

  updateTask(){
   let data = {
      "taskName":this.taskName,
      "status":this.status,
      "task_id":this.data.task.task_id
    }
    console.log("data",data);
    this.taskService.update(data).subscribe(
      data => {
        console.log("update Response",data)
      },
      error => {
        console.log("error",error)
      }
    )
  }


  AddTask(){
    let data = {
      "taskName":this.taskName
     
    }
    console.log("data",data);
    this.taskService.addTask(data).subscribe(
      data => {
        console.log("addTask Response",data)
      },
      error => {
        console.log("error",error)
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
