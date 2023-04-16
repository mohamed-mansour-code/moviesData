import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TrendingService {

  constructor(private _HttpClient:HttpClient) { }

  homeTrending(data_type:any):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/trending/${data_type}/day?api_key=20765ae7b31345b32c5d2679fb836627`)
  }

  getDetails(id:any , data_type:any):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/${data_type}/${id}?api_key=20765ae7b31345b32c5d2679fb836627&language=en-US`)
  }

  getSimilar(id:any , data_type:any):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/${data_type}/${id}/similar?api_key=20765ae7b31345b32c5d2679fb836627&language=en-US`)
  }

  getMovies(page:number):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/discover/movie?language=ar&sort_by=popularity.desc&with_original_language=ar&api_key=20765ae7b31345b32c5d2679fb836627&region=EG&page=${page}`)
  }

  getTv(page:number):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/discover/tv?api_key=20765ae7b31345b32c5d2679fb836627&language=ar&sort_by=popularity.desc&timezone=EG&with_original_language=ar&page=${page}`)
  }

  getActor(page:number):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/person/popular?api_key=20765ae7b31345b32c5d2679fb836627&language=en-US&page=${page}`)
  }








}
