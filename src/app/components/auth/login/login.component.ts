import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error:String;
  constructor(
    private authServ: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(LoginData){
    this.removeErr();
    this.authServ.login(LoginData).subscribe(
      (data: any)=>{
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.id);
        localStorage.setItem('name', data.name);
        this.router.navigate(['/home'])
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

  
  removeErr(){
    this.error = undefined;
  }
}
