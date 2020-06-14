import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error:String;
  constructor(
    private authServ: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  register(registerData){
    this.removeErr();
    this.authServ.register(registerData).subscribe(
      (data: any)=>{
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.id);
        localStorage.setItem('name', data.name);
        this.router.navigate(['/workflow'])
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
