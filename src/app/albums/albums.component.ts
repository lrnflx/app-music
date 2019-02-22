import { Component, OnInit } from '@angular/core';

// Importez la définition de la classe et les albums
import { Album } from'../album';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  titlePage : string = "Page principale Albums Music";
  selectedAlbum : Album;
  status : string = null;

  constructor(private albumService : AlbumService) {
  }

  ngOnInit() {
    if(this.albumService.getAlbums().length > 0)
    {
      this.selectedAlbum = this.albumService.getAlbums()[0];
    }
  }


  onSelect(album: Album) {
    console.log(album);
    this.selectedAlbum = album;
  }

  playParent($event){
    this.status = $event.id;
    console.log($event);
  }

}
