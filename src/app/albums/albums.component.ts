import { Component, OnInit } from '@angular/core';

// Importez la définition de la classe et les albums
import { Album } from'../album';
import { AlbumService } from '../album.service';
import { ALBUMS } from '../mock-albums';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  titlePage : string = "Page principale Albums Music";
  selectedAlbum : Album;
  albums: Album[] = ALBUMS;
  status : string = null;
  langue: string;

  constructor(private albumService : AlbumService) {
    //check de la méthode count()
    console.log(this.albumService.count())
  }

  ngOnInit() {
    // Pour qu'un album soit initialement chargé en albums details
    // if(this.albumService.getAlbums().length > 0)
    // {
    //   this.selectedAlbum = this.albumService.getAlbums()[0];
    // }

    this.albums = this.albumService.paginate(0,5);

  }


  onSelect(album: Album) {
    console.log(album);
    this.selectedAlbum = album;
  }

  playParent($event){
    this.status = $event.id; //unique id
    console.log($event);
    //Methode dans le service
    this.albumService.switchOn($event);
  }

  searchUp($event){
    console.log($event);
    this.albums = $event;
  }

  changeLangue($event){
    this.langue = $event;
  }

  // mise à jour de la pagination
  paginate($event) {
    this.albums = this.albumService.paginate($event.start, $event.end);
  }



}
