import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { TasksComponent } from './tasks/tasks.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule} from './material/material.module'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpRequestInterceptor } from './HttpInterceptor';
import { EditTaskComponent } from './edit-task/edit-task.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TasksComponent,
    RegisterComponent,
    EditTaskComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [[
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
],],
entryComponents: [EditTaskComponent],
bootstrap: [AppComponent]
})
export class AppModule { }
