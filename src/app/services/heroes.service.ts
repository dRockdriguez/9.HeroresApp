import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Heroe } from '../interfaces/heroe.interface';
import 'rxjs/Rx';

@Injectable()
export class HeroesService {
  private url:string;

  constructor(
    private _http: Http
  ) {
    this.url = "https://heroesapp-85f6a.firebaseio.com/";
  }

  nuevoHeroe(heroe:Heroe){
    let body = JSON.stringify(heroe);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });


    return this._http.post(this.url+"heroes.json", body, {headers})
    .map( res => {
      console.log(res.json());
      return res.json();
    });
  }

  actualizarHeroe(heroe:Heroe, key$:string){
    let body = JSON.stringify(heroe);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });


    return this._http.put(`${this.url}heroes/${key$}.json`, body, {headers})
    .map( res => {
      return res.json();
    });
  }

  getHeroe(key$:string){
    return this._http.get(`${this.url}heroes/${key$}.json`)
    .map( res => {
      return res.json();
    });
  }

  getHeroes(){
    return this._http.get(`${this.url}heroes.json`)
    .map( res => {
      return res.json();
    });
  }

  deleteHeroe(key$){
    return this._http.delete(`${this.url}heroes/${key$}.json`)
    .map( res => {
      return res.json();
    });
  }
}
