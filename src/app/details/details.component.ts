import { Component } from '@angular/core';
import { TrendingService } from '../trending.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  detailsData:any;
  similarData:any;
  media_type:string = '';
  sub:Subscription = new Subscription();


  constructor(private _TrendingService:TrendingService , private _ActivatedRoute:ActivatedRoute){}



  ngOnInit(){

    let {id , mediaType} = this._ActivatedRoute.snapshot.params;
    this.media_type = mediaType;

    this.sub.add(
      this._TrendingService.getDetails(id , mediaType).subscribe((response)=>{
        this.detailsData = response;      
      })
    );

    this.sub.add(
      this._TrendingService.getSimilar(id , this.media_type).subscribe((response)=>{
        this.similarData = response.results.filter((x:any)=>{return x.poster_path != null}).slice(0,6);      
      })
    );

  }

  antherDetails(id:string , media_type:string){


    this.sub.add(
      this._TrendingService.getDetails(id , media_type).subscribe((response)=>{
        this.detailsData = response;      
      })
    );

    this.sub.add(
      this._TrendingService.getSimilar(id , this.media_type).subscribe((response)=>{
        this.similarData = response.results.filter((x:any)=>{return x.poster_path != null}).slice(0,6);      
      })
    );

  }


  ngestroy(){
    this.sub.unsubscribe();
  }

}
