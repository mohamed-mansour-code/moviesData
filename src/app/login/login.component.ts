import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    ErrorMessage!:string;
  isLoading:boolean = false;
  sub:Subscription = new Subscription();

  constructor(private _AuthService:AuthService , private _Router:Router) {}
  

  //=========== form ==========
  LoginForm:FormGroup = new FormGroup({
    email: new FormControl(null , [Validators.required ,Validators.email]),
    password: new FormControl(null , [Validators.required ,Validators.pattern(/^[A-Z]\w{2,}\d{2,}$/)]),
  });



  //=========== submit ==========
  submit(LoginForm:FormGroup){
    this.isLoading = true;
    this.sub.add(
      this._AuthService.login(LoginForm.value).subscribe({
        next:(response)=>{
          localStorage.setItem('MoviesToken',response.token);
          this._AuthService.getToken();
          this._Router.navigate(['/home']);
          this.isLoading = false;
        },
        error:(err)=>{
          
          this.ErrorMessage = err.error.message;
          this.isLoading = false;
        }
      })
    );
  }

  ngDestroy(){
    this.sub.unsubscribe();
  }

  
}
