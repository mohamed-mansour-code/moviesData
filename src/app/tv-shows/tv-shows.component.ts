import { Component } from '@angular/core';
import { TrendingService } from '../trending.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css']
})
export class TvShowsComponent {

    DataTv:any;
    currentPage!:number;
    sub:Subscription = new Subscription();

  constructor(private _TrendingService:TrendingService){}

  ngOnInit(){
    this.tv(1);
  }

  tv(page:number=1){
    this.sub.add(
      this._TrendingService.getTv(page).subscribe({
        next:(response)=>{
          this.DataTv = response.results.filter((x:any)=>{return x.poster_path != null});
          this.currentPage = response.page;        
        }
      })
    );
  }


  ngDestroy(){
    this.sub.unsubscribe();
  }

}
