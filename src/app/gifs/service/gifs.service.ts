import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'KUnKnGEj3KcRp4BR88FGv320LTXIQOrh';
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  get historial(){
    
    return [...this._historial];
  }

  constructor(private http: HttpClient){

  }

  buscarGifs( query: string = '' ){

    

    // utilizando una función nueva de ECMAScript6 vamos a controlar que los elementos sean únicos
    if( !this._historial.includes( query ) ){

      // trim() nos ahorra los espacios adelante y atrás
      query = query.trim().toLowerCase();

      this._historial.unshift( query ); // insertamos valor en el arreglo
      this._historial = this._historial.splice(0,10); // corta el arreglo de 0 a 9
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=KUnKnGEj3KcRp4BR88FGv320LTXIQOrh&q=${ query }&limit=10`)
    .subscribe( (resp) =>{
      console.log(resp.data);
      this.resultados = resp.data;
      
    });

    
  }

  
}
