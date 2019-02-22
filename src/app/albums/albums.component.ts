import { Component, OnInit } from '@angular/core';

// Importez la définition de la classe et les albums
import { Album } from'../album';
import { ALBUMS } from'../mock-albums';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  titlePage : string = "Page principale Albums Music";
  albums:  Album[] = ALBUMS;
  selectedAlbum : Album;
  status : string = null;

  constructor() { }

  ngOnInit() {
    if(this.albums)
    {
      this.selectedAlbum = this.albums[0];
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
