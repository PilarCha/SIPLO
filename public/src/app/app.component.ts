import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from './api.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showBars:boolean=false;
  showSearch: boolean=false;
  showError: boolean=false;
  error:string;
  words:string;
  newPlace:object;
  places:any[];
  lat:number;
  lng:number;
  zoom: number;
  map:string;
  radius:number = 2000;
  color:string = 'rgb(116, 156, 189)';

  constructor(private _router:Router, private _apiService:ApiService){
    this.newPlace={
      location:''
    },
    this.words=" ",
    this.showBars=false,
    this.showSearch=false,
    this.showError=false
  }
  ngOnInit() {
    this.getword()
    this.getLocation()
  }
  getword(){
    var words=["Lips that touch liquor touch other lips quicker…","I drink to make other people more interesting.", "Everybody has to believe in something. I believe I’ll have another drink.", "You picked the wrong time to quit drinking", "It's always happy hour somewhere in the world", "This one is on the house"]
    this.words=words[Math.floor(Math.random()*(words.length))]
  }
  onClick(object){
    var address=object.location[0]+object.location[1]+object.name
    window.open(`https://maps.google.com/?q=+${address}`)
  }
  whenSubmit(){
    this.words=''
    this.showBars=false
    this.showSearch=false
    this.error=''
    this._apiService.searchLocation(this.newPlace)
    .then((data)=>{
      if(data.response){
        if(data.response.statusCode){
          this.showError=true
          this.error="Please enter a correct location"
          this.words=''
          this.showSearch=true
          return
        }
      }
      else{
        this.places=data
        this.showError=false
        this.words=''
        this.error=""
      }
          this.showBars=true
          this.words=''
          this.showSearch=true
          this.showError=false
          this.places=data
    })
    .catch((errors)=>{
    })
  }
  scrollToTop (x,y) {
    window.scrollTo(x, y);
  }
  getLocation(){
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.zoom = 14;
      this._apiService.searchGeoLocation({lat:this.lat,long:this.lng})
      .then((data)=>{
        this.showBars=true
        this.showSearch=true
        this.places=data
        this.error=""
      })
      .catch((errors)=>{
      })
    })
  }


}
