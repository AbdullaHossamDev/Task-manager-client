import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuardGuard } from './services/auth/guard/auth-guard.guard';
import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { WorkflowsComponent } from './components/workflows/workflows.component';
import { WorkflowViewComponent } from './components/workflows/workflow-view/workflow-view.component';
import { ProfileComponent } from './components/auth/profile/profile.component';


const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth', children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ],
    canActivateChild: [AuthGuardGuard]
  },
  {
    path: 'home', children: [
      { path: '', redirectTo: 'tasks', pathMatch: 'full' },
      { path: 'tasks', component: TasksComponent },
      { path: 'workflows', component: WorkflowsComponent },
      { path: 'workflow/:id', component: WorkflowViewComponent },
      { path: 'profile', component: ProfileComponent },
    ],
    canActivate: [AuthGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
