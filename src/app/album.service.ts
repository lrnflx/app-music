import { Injectable } from '@angular/core';
import { Album, List } from'./album';
import { ALBUMS, ALBUM_LISTS } from'./mock-albums';
import { AlbumsComponent } from './albums/albums.component';
import { sortBy } from 'sort-by-typescript';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  albums:  Album[] = ALBUMS;
  albumLists : List[] = ALBUM_LISTS;
  albumSubject = new Subject<Album>();

 
  constructor() { }



  getAlbums() : Album[]
  { 
    //méthode 1 
    // this.albums.sort((a, b) => {
    //   return  b.duration - a.duration
    // });

    //méthode 2
    return this.albums.sort(sortBy('- duration'));
  }


  getAlbum(id: string): Album {
    return this.albums.find(elem => elem.id === id);
  }

  getAlbumList(id: string): List{
    return this.albumLists.find(elem => elem.id === id);
  }

  count(): number {
    
    return this.albums.length;
  }

  paginate(start: number, end: number):Album[] {
    // utilisez la méthode slice pour la pagination
  
    return this.albums.sort(
      (a, b) => { return b.duration - a.duration }
    ).slice(start, end);
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
