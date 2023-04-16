import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isLogin:boolean = false;

  constructor(private _AuthService:AuthService , private _Router:Router){}

  ngOnInit(){

    this._AuthService.tokenFound.subscribe((x)=>{
      console.log(x);

      if(x != null){
        this.isLogin = true;
        
      }else{
        this.isLogin = false;
        
      }

      console.log(this.isLogin);
      
    });


  }



  logout(){
    localStorage.removeItem('MoviesToken');
    this._AuthService.tokenFound.next(null);
    this._Router.navigate(['/login']);
  }



}
