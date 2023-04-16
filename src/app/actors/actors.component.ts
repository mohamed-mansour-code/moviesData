import { Component } from '@angular/core';
import { TrendingService } from '../trending.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent {

  DataPeople:any;
  currentPage!:number;
  sub:Subscription = new Subscription();

  constructor(private _TrendingService:TrendingService){}

  ngOnInit(){
    this.actor(1);
  }

  actor(page:number=1){
    this.sub.add(
      this._TrendingService.getActor(page).subscribe({
        next:(response)=>{
          this.DataPeople = response.results;
          this.currentPage = response.page;
        }
      })
    );
  }

  
  ngDestroy(){
    this.sub.unsubscribe();
  }

}
