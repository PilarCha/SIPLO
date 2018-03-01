import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from './api.service'
import { trigger, state, style, animate, transition, stagger, query } from '@angular/animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('* => *', [

      state('small', style({
        transform: 'scale(1)',
      })),

      state('large', style({
        transform: 'scale(1.1)',
      })),

      transition('small <=> large', animate('300ms ease-in')),
    ]),
  ]
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

  //animation
  state: string = 'small'

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

  //hover over bars will increase the size
  mouseOverAnimation() {
    this.state = (this.state === 'small' ? 'large' : 'small')
  }
  //Picks a random sentence from an array
  getword(){
    var words=["Lips that touch liquor touch other lips quicker…","I drink to make other people more interesting.", "Everybody has to believe in something. I believe I’ll have another drink.", "You picked the wrong time to quit drinking", "It's always happy hour somewhere in the world", "This one is on the house"]
    this.words=words[Math.floor(Math.random()*(words.length))]
  }
  //onClick opens a new window to the clicked location
  onClick(object){
    var address=object.location[0]+object.location[1]+object.name
    window.open(`https://maps.google.com/?q=+${address}`)
  }
  //when the search bar is clicked starts up the reanimation
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
          this.words=''
          this.error="Please enter a correct location"
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
  //scrolls to top of the window after searching or rellocating
  scrollToTop (x,y) {
    window.scrollTo(x, y);
  }
  //gets users geolocation using Googles API
  getLocation(){
    this.showBars = false;
    this.showSearch = false
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
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
