import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) {
    this.getGreninja();
  }

  getGreninja() {
    let greninja = this._http.get('https://pokeapi.co/api/v2/pokemon/658');

    greninja.subscribe(data => {
      console.log("Greninja: ", data);
      console.log("****"+data['name']+"****");
      if(data['types'].length > 1)
        console.log("Types: "+data['types'][0].type.name+", "+data['types'][1].type.name);
      else
        console.log("Type: "+data['types'][0]);
      console.log("--- Stats ---");
      for(var i = 5; i >= 0; i--){
        console.log(data['stats'][i]['stat'].name+": "+data['stats'][i]['base_stat']);
      }
      this.withAbilities(data)});
  }

  withAbilities(data){
    for(var i = 0; i < data.abilities.length; i++){
      let ability = this._http.get(data.abilities[i].ability.url);
      ability.subscribe(data => {
        console.log("Pokemon with "+data['name']);
        for(var j = 0; j < data['pokemon'].length; j++) {
          console.log("\t"+(j+1)+". "+data['pokemon'][j].pokemon.name);
        }
      });
    }
  }
}
