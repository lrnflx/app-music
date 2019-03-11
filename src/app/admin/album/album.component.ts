import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  
  albums;
  perPage: number = 5;
  message: string;
  count;

  constructor(private albumService: AlbumService) { }

  ngOnInit() {
    // on récupère les albums directement comme ci-dessous, dans le template on utilisera le pipe async
    // pour récupérer les albums :
    this.albums = this.albumService.paginate(0, 5);
    this.count = this.albumService.count();
  }

  paginate($event)
  {
    this.albums = this.albumService.paginate($event.start, $event.end);
  }
}
