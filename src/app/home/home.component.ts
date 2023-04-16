import { Component } from '@angular/core';
import { TrendingService } from '../trending.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  trendingMovies:any;
  trendingTv:any;
  trendingPeople:any;
  sub:Subscription = new Subscription();


  constructor(private _TrendingService:TrendingService){}

  ngOnInit(){
    this.sub.add(
      this._TrendingService.homeTrending('movie').subscribe({
        next:(response)=>{
          this.trendingMovies = response.results; 
        },error:(err)=>{
          console.log(err);
          
        }
      })
    );

    this.sub.add(
      this._TrendingService.homeTrending('tv').subscribe({
        next:(response)=>{
          this.trendingTv = response.results; 
        }
      })
    );


    this.sub.add(
      this._TrendingService.homeTrending('person').subscribe({
        next:(response)=>{
          this.trendingPeople = response.results;
          
        }
      })
    );



  }


  ngDestroy(){
    this.sub.unsubscribe();
  }


}
