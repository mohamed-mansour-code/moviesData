import { Component } from '@angular/core';
import { TrendingService } from '../trending.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {

  DataMovies:any;
  currentPage!:number;
  sub:Subscription = new Subscription();

  constructor(private _TrendingService:TrendingService){}

  ngOnInit(){
    this.movies(1);
  }

  movies(page:number=1){
    this.sub.add(
      this._TrendingService.getMovies(page).subscribe({
        next:(response)=>{
          this.DataMovies = response?.results?.filter((x:any)=>{return x.poster_path != null})   
          this.currentPage = response?.page;   
  
        }
      })
    );
  }

  
  ngDestroy(){
    this.sub.unsubscribe();
  }


}
