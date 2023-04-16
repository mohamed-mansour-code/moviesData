import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  tokenFound = new BehaviorSubject(null);

  constructor(private _HttpClient:HttpClient) { 
    this.getToken();
  }

  register(userData:object):Observable<any>
  {
    return this._HttpClient.post(environment.authBaseUrl + 'signup', userData)

  }
  login(userData:object):Observable<any>
  {
    return this._HttpClient.post(environment.authBaseUrl + 'signin', userData)

  }

  getToken(){
    
    let token:any = localStorage.getItem('MoviesToken');
    if(token != null)
    {
      this.tokenFound.next(token)
    }else{
      this.tokenFound.next(null)
    }
    
  }
  
}
