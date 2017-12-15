import { Component, OnInit } from '@angular/core';
import {ApiService} from './../api.service'


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  lat:number
  lng:number
  zoom: number;
  map:string;
  radius:number = 2000;
  color:string = 'rgb(116, 156, 189)';
  constructor(private _apiService:ApiService) { }

  ngOnInit() {

  }

}
