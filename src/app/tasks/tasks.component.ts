import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Component, OnInit } from "@angular/core";
import { TaskManagementServiceService } from "../task-management-service.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { EditTaskComponent } from "../edit-task/edit-task.component";
@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"],
})
export class TasksComponent implements OnInit {
  constructor(
    private taskService: TaskManagementServiceService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}
  tasks: any = [];
  ngOnInit() {
    this.loadTask();
  }
  loadTask() {
    this.taskService.getTasks().subscribe(
      (data) => {
        console.log("task", data);
        if (data["data"]) {
          this.tasks = data["data"];
          let createdDate = this.tasks["created_on"];
          let modifiedDate = this.tasks["modified_on"];
          let statusCode = data["statusCode"];
          if (statusCode == "200") {
            this.router.navigate(["/tasks"]);
          } else {
            this._snackBar.open("Logged out", "dismiss", {
              duration: 2000,
              panelClass: ["dark-bg"],
            });
            this.router.navigate(["/login"]);
          }
        } else {
          this.router.navigate(["/login"]);
        }
      },
      (error) => {
        console.log("error", error);
        this.router.navigate(["/login"]);
      },
      () => {
        console.log("onComlete");
      }
    );
  }

  openDialog(task,action:String) {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: { task: task, action: action },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.loadTask();
    });
  }

  addTask() {
    let task = {
      taskName: "",
      task_id: "",
      status: "",
    };

    this.openDialog(task,"Add Task");
  }

  updateTask(task){
    this.openDialog(task,"Edit Task")
  }

  refresh(){
    this.loadTask()
  }

  displayCounter(count) {
    console.log('Message received...');
  }

  delete(taskId){
    this.taskService.deleteTask(taskId).subscribe(
      data => {
        if (data["data"]) {
          let statusCode = data["statusCode"];
          if (statusCode == "200") {
            this.loadTask()
          }else {
            this.router.navigate(["/login"]);
          }
        }else {
          this.router.navigate(["/login"]);
        }
      }
    )
  }
}
