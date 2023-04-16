import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  ErrorMessage!:string;
  isLoading:boolean = false;
  sub:Subscription = new Subscription();

  constructor(private _AuthService:AuthService , private _Router:Router) {}
  

//=========== form ==========
  registerForm:FormGroup = new FormGroup({
    name: new FormControl(null , [Validators.required ,Validators.minLength(3),Validators.maxLength(20)]),
    email: new FormControl(null , [Validators.required ,Validators.email]),
    password: new FormControl(null , [Validators.required ,Validators.pattern(/^[A-Z]\w{2,}\d{2,}$/)]),
    rePassword: new FormControl(null , [Validators.required]),
    phone: new FormControl(null , [Validators.required ,Validators.pattern(/^01[0125]\w{8}$/)])
  } , {validators:this.customValidator});

  //=========== custom Valid ==========
  customValidator(registerForm:any)
  {
    let password = registerForm.get('password');
    let rePassword = registerForm.get('rePassword');
    if(password?.value !== rePassword?.value){
      rePassword?.setErrors({match:'not match'});
      return {match:'not match'};
    }else{
      return null;
    }
  }


  //=========== submit ==========
  submit(registerForm:FormGroup){
    this.isLoading = true;
    this.sub.add(
      this._AuthService.register(registerForm.value).subscribe({
        next:(response)=>{
          this._Router.navigate(['/login']);
          this.isLoading = false;
        },
        error:(err)=>{
          this.ErrorMessage = err.error.message;
          this.isLoading = false;
        }
      })
    )

  }

  //=========== on destroy ==========
  ngDestroy(){
    this.sub.unsubscribe();
  }


}
