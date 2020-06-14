import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  error: String;
  alert: String;
  constructor(
    private authServ: AuthService
  ) { }

  ngOnInit(): void {
    this.authServ.getMe().subscribe(
      (data)=>{
        this.user = data;
      }
    )
  }

  save(formData){
    formData.password.length == 0 ? delete formData.password: '';
    this.authServ.update(formData).subscribe(
      (data) => {
        this.alert = data.msg
      },
      err => {
        this.error = err.error;
      }
    )
  }

  removeErr() {
    this.error = undefined;
  }
  removeAlert() {
    this.alert = undefined;
  }

}
