import { Injectable } from '@angular/core';
import { URL_RM } from '../config/url.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickMoryService {

  constructor(private http: HttpClient) {}

  //METODOS NUEVOS
  getEpisodes(page: number = 1): Observable<any> {
    return this.http.get(`https://rickandmortyapi.com/api/episode?page=${page}`);
  }

  getCharacter(id: number): Observable<any> {
    return this.http.get(`https://rickandmortyapi.com/api/character/${id}`);
  }

  getCharactersA(ids: number[]): Observable<any> {
    const url = `https://rickandmortyapi.com/api/character/${ids.join(',')}`;
    return this.http.get(url);
  }

  getCharacters(characterUrls: string[]): Observable<any[]> {
    const requests = characterUrls.map((url) => this.http.get<any>(url));
    return forkJoin(requests); // Ejecuta todas las peticiones en paralelo
  }

  ///METODOS CLASIC DE MANERA IGUAL QUE LOS DEMÁS 
  getPersonajes():any{

    let url = `${URL_RM}/character`;

    return this.http.get(url, {}).pipe(
      map((res: any) => {
        //console.log('PERSONAJES_RK',res);
        return res;
      })
    );
  }

  getEpisodios():any{
    let url = `${URL_RM}/episode`;

    return this.http.get(url, {}).pipe(
      map((res: any) => {
        console.log('Episodios',res);
        return res;
      })
    );
  }
  
}
