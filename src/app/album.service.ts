import { Injectable } from '@angular/core';
import { Album, List } from'./album';
import { ALBUMS, ALBUM_LISTS } from'./mock-albums';
import { V4MAPPED } from 'dns';
import { AlbumsComponent } from './albums/albums.component';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  albums:  Album[] = ALBUMS;
  albumLists : List[] = ALBUM_LISTS;

  constructor() { }

  getAlbums() : Album[]
  { 
    this.albums.sort((a, b) => {
    
    return  b.duration - a.duration
    })
    
    return this.albums;
  }

  getAlbum(id:string) : Album{
    return this.albums.find(elem => elem.id === id);
  }

  getAlbumList(id:string) : List{
    return this.albumLists.find(elem => elem.id === id);
  }
}
