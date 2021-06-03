import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'KUnKnGEj3KcRp4BR88FGv320LTXIQOrh';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  
  private _historial: string[] = [];
  
  public resultados: Gif[] = [];

  get historial(){
    
    return [...this._historial];
  }

  constructor(private http: HttpClient){

    // forma 1
    this.resultados = JSON.parse( localStorage.getItem('resultados')! ) || [];

    // forma 2
    if ( localStorage.getItem('historial') ){
      this._historial = JSON.parse( localStorage.getItem('historial')! );
    }

  }

  buscarGifs( query: string = '' ){

    

    // utilizando una función nueva de ECMAScript6 vamos a controlar que los elementos sean únicos
    if( !this._historial.includes( query ) ){

      // trim() nos ahorra los espacios adelante y atrás
      query = query.trim().toLowerCase();

      this._historial.unshift( query ); // insertamos valor en el arreglo
      this._historial = this._historial.splice(0,10); // corta el arreglo de 0 a 9

      localStorage.setItem('historial', JSON.stringify( this._historial ) );
    }


    // configurando HttpParams
    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', query );

    

    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params })
    .subscribe( (resp) =>{
      //console.log(resp.data);

      this.resultados = resp.data;

      localStorage.setItem('resultados', JSON.stringify( this.resultados ));
      
    });

    
  }

  
}
