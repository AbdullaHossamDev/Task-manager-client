import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthService } from './services/auth/auth/auth.service';
import { AuthGuardGuard } from './services/auth/guard/auth-guard.guard';
import { TopbarComponent } from './components/topbar/topbar.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskService } from './services/task/task.service';
import { TokenInterceptorService } from './services/auth/token-interceptor/token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { TaskDetailComponent } from './components/tasks/task-detail/task-detail.component';
import { TaskViewComponent } from './components/tasks/task-view/task-view.component';
import { WorkflowsComponent } from './components/workflows/workflows.component';
import { WorkflowDetailsComponent } from './components/workflows/workflow-details/workflow-details.component';
import { WorkflowViewComponent } from './components/workflows/workflow-view/workflow-view.component';
import { ProfileComponent } from './components/auth/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TopbarComponent,
    TasksComponent,
    TaskDetailComponent,
    TaskViewComponent,
    WorkflowsComponent,
    WorkflowDetailsComponent,
    WorkflowViewComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuardGuard, TaskService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
