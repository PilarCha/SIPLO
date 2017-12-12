import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from './api.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  show:false;
  newPlace:object
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
    }
  }
  ngOnInit() {
    this.getLocation()
  }
  whenSubmit(){
    this._apiService.searchLocation(this.newPlace)
    .then((data)=>{
      console.log('we got ',data)
      this.places=data
    })
    .catch((errors)=>{
    console.log('catch we got some errors with yelp',errors)
    })
  }
  getLocation(){
    navigator.geolocation.getCurrentPosition((position)=> {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.zoom = 14;
      console.log("latitude: " + this.lat);
      console.log("longitude: " + this.lng);
      this._apiService.searchGeoLocation({lat:this.lat,long:this.lng})
      .then((data)=>{
        console.log('we got ',data)
        this.places=data
      })
      .catch((errors)=>{
      console.log('catch problems with geoloaction',errors)
      })
    })
  }


}
