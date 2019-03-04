import { Injectable } from '@angular/core';
import { Album, List } from'./album';
import { ALBUMS, ALBUM_LISTS } from'./mock-albums';
import { AlbumsComponent } from './albums/albums.component';
import { sortBy } from 'sort-by-typescript';
import { environment } from '../environments/environment';
import { Subject, Observable } from 'rxjs';
// Service et classe utile
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Opérateurs de RxJS
import { map } from 'rxjs/operators';
// libraire utile pour le traitement de données
import * as _ from 'lodash';

// définition des headers
const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type': 'application/json',
  })
  };

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  // convention dans l'API ajoutez votre identifant de base de données
  private albumsUrl = 'https://app-music-3wa.firebaseio.com/albums';
  private albumListsUrl = 'https://app-music-3wa.firebaseio.com/albumLists';

  albums:  Album[] = ALBUMS;
  albumLists : List[] = ALBUM_LISTS;
  albumSubject = new Subject<Album>();

 
  constructor(private http: HttpClient) { }

  getAlbums(): Observable<Album[]> {
    
      return this.http.get<Album[]>(this.albumsUrl + '/.json', httpOptions).pipe(
        // Préparation des données avec _.values pour avoir un format exploitable dans l'application => Array de values JSON
        map(albums => _.values(albums)),
        // Ordonnez les albums par ordre de durées décroissantes
        map(albums => {
          return albums.sort(
            (a, b) => { return b.duration - a.duration }
          );
        })
      )
    }

  getAlbum(id: string): Observable<Album> {
    // URL/ID/.json pour récupérer un album
      return this.http.get<Album>(this.albumsUrl + `/${id}/.json`).pipe(
        map(album => album) // JSON
      );
  }

  getAlbumList(id: string): List{
    return this.albumLists.find(elem => elem.id === id);
  }

  count(): number {
    
    return this.albums.length;
  }

  paginate(start: number, end: number): Observable<Album[]> {
    
    return this.http.get<Album[]>(this.albumsUrl + '/.json', httpOptions).pipe(map(
      albums => {
        let Albums: Album[] = [];
        _.forEach(albums, (v,k) =>
          {
            v.id = k;
            Albums.push(v);
          }
          
        ); return Albums
      }),
      map( albums => 
        {
          return albums.sort(
            (a, b) => { return b.duration - a.duration }
            ).slice(start, end);
          
        })

      )    
  }

  search(word : string): Album[]
  {
    if(word.length > 2)
    {
      let response = [];
      this.albums.forEach(album => {
        if(album.title.includes(word))
        {
          response.push(album);
        }
      });
      return response;
    }
  }

  langue(word : string): string
  {
    let langue = ' '; 
    if(word.includes('fr'))
    { 
      langue = 'français';
    }else if(word.includes('en')){
      langue = 'english';
    }

    return langue;
  }

  paginateNumberPage():number{
    if ( typeof environment.numberPage == 'undefined' )
      throw "Attention la pagination n'est pas définie" ;
   
    return environment.numberPage ;
  }

  switchOn(album: Album){
    this.albums.forEach(a=>{
      if(a.id === album.id) album.status = 'on';
      else 
        a.status = 'off';
    }
    )
    this.albumSubject.next(album);
  }

  switchOff(album: Album){
    this.albums.forEach(a=>
      a.status = 'off'
    )
  }

  
}
