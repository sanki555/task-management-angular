import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { AppSettings } from "./app.settings";

@Injectable({
  providedIn: "root",
})
export class TaskManagementServiceService {
  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get(AppSettings.appUrl + "/tasks");
  }

  login(data) {
    return this.http.post(AppSettings.appUrl + "/login", data);
  }

  update(data) {
    return this.http.post(AppSettings.appUrl + "/updateTask", data);
  }

  addTask(data) {
    return this.http.post(AppSettings.appUrl + "/addTask", data);
  }

  deleteTask(taskId:string){
    return this.http.get(AppSettings.appUrl +"/deleteTask/"+taskId)
  }
}
