import { Injectable } from '@angular/core';
import { Album, List } from'./album';
import { ALBUMS, ALBUM_LISTS } from'./mock-albums';
import { AlbumsComponent } from './albums/albums.component';
import { sortBy } from 'sort-by-typescript';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  albums:  Album[] = ALBUMS;
  albumLists : List[] = ALBUM_LISTS;

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

}
