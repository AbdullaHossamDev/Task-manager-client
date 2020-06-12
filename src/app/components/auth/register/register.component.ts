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
        console.log('data', data)
        localStorage.setItem('token', data.token);
        this.router.navigate(['/workflow'])
      },
      err => {
        console.log('err: ',err)
        this.error = err.error;
      }
    )
  }


  removeErr(){
    this.error = undefined;
  }

}
