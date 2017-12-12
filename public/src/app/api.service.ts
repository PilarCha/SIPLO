import { Injectable } from '@angular/core';
import {AppComponent} from './app.component'
import {Http} from '@angular/http'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class ApiService {

  constructor(private _http:Http) { }
  searchLocation(object){
    return this._http.post('/api/search',object).map(Response=>Response.json()).toPromise()
  }
  searchGeoLocation(object){
    return this._http.post('/api/geo',object).map(Response=>Response.json()).toPromise()
  }

}
