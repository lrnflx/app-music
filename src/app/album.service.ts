import { Injectable } from '@angular/core';
import { Album, List } from'./album';

import { environment } from '../environments/environment';
import { Subject, Observable } from 'rxjs';
// Service et classe utile
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Opérateurs de RxJS
import { map } from 'rxjs/operators';
// libraire utile pour le traitement de données
import * as _ from 'lodash';
import * as firebase from 'firebase';

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


  albumSubject = new Subject<Album>();
  sendCurrentNumberPage = new Subject<number>();

 
  constructor(private http: HttpClient) { }

  getAlbums(): Observable<Album[]> {
    
      return this.http.get<Album[]>(this.albumsUrl + '/.json', httpOptions).pipe(
        // Préparation des données avec _.values pour avoir un format exploitable dans l'application => Array de values JSON
        map(albums => { 
          return _.values(albums) 
        }),
        // Ordonnez les albums par ordre de durées décroissantes
        map(albums => {
          return albums.sort(
            (a, b) => { return b.duration - a.duration }
          );
        }),
      )
    }

  getAlbum(id: string): Observable<Album> {
    // URL/ID/.json pour récupérer un album
      return this.http.get<Album>(this.albumsUrl + `/${id}/.json`).pipe(
        map(album => album) // JSON
      );
  }

  getAlbumList(id: string): Observable<List>{
    return this.http.get<List>(this.albumListsUrl + `/${id}/.json`);
  }

  count(): Observable<number> {
    
    return this.http.get<Album[]>(this.albumsUrl +  '/.json', httpOptions).pipe(
      map(albumNbr => _.values(albumNbr)),
      map(album => album.length
    ))
    ;
  }

  paginate(start: number, end: number): Observable<Album[]> {
    
    return this.http.get<Album[]>(this.albumsUrl + '/.json', httpOptions).pipe(map(
      albums => {
        console.log(albums);
        let Albums: Album[] = [];
        _.forEach(albums, (v,k) =>
          { 
            if(v){
              v.id = k;
              Albums.push(v);
            }

          }
          
        ); 
        return Albums
      }),
      map( albums => 
        {
          return albums.sort(
            (a, b) => { return b.duration - a.duration }
            ).slice(start, end);
          
        })

      )    
  }

  search(word : string): Observable<Album[]>
  {
    return this.http.get<Album[]>(this.albumsUrl + '/.json', httpOptions).pipe(
        map(albumList => {
          //Préparation tableau vide dans lequel on va pusher ensuite les matchq
          let search: Album[] = [];
          //Préparation du word récupéré de l'input // trim retire les espaces en début et fin de chaine
          let response = new RegExp('^' + word.trim())
          //
          _.forEach(albumList, (v,k) => {
            // v.id = 
            v.id = k;
            if(v.title.match(response) != null) search.push(v);
          })
          return search;
        })
      )
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

  currentPage(page: number){
    return this.sendCurrentNumberPage.next(page);
  }

  // ***********************************************
  switchOn(album: Album){
    album.status = 'on';
    this.http.put(this.albumsUrl + '/'+album.id+'.json', album).subscribe(
      e => e,
      error => console.warn(error),
      () => {
        this.albumSubject.next(album);
      }
    )
  }

  switchOff(album: Album){
    album.status = 'off';
    this.http.put(this.albumsUrl + '/'+album.id+'.json', album).subscribe(
      e => e,
      error => console.warn(error),
      () => {
        this.albumSubject.next(album);
      }
    )
  }

  // ***********************************************
  addAlbum(album: Album): Observable<any> {
    return this.http.post<void>(this.albumsUrl + '/.json', album);
  }

  updateAlbum(ref: string, album: Album): Observable<void> {
    console.log(ref);
    return this.http.put<void>(this.albumsUrl + `/${ref}/.json`, album);
  }

  deleteAlbum(id: string): Observable<void> {
    return this.http.delete<void>(this.albumsUrl + `/${id}/.json`);
  }

  uploadFile(file: File) {

    const randomId = Math.random().toString(36).substring(2);
    const ref = firebase.app().storage("gs://music-60f33.appspot.com").ref();
    const imagesRef = ref.child('images');

    return imagesRef.child(randomId + '.png').put(file);
    
  }


  

}
