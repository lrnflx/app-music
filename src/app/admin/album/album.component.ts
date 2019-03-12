import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/album.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from '../modal/dialog/dialog.component';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  
  albums;
  perPage: number = 2;
  message: string;
  count;
  showModal: boolean = false;
  albumId;

  constructor(private albumService: AlbumService,
              private router: Router, 
              private modal: NgbModal ) { }

  ngOnInit() {
    // on récupère les albums directement comme ci-dessous, dans le template on utilisera le pipe async
    // pour récupérer les albums :
    this.albums = this.albumService.paginate(0, this.perPage);
    this.count = this.albumService.count();
  }

  paginate($event)
  {
    this.albums = this.albumService.paginate($event.start, $event.end);
  }

  destroy(id: number) {
    // routerLink="/admin/delete/{{album.id}}/deleted"
    this.showModal = true;
    this.albumId = id;
  }

  choice($event) {
    this.showModal = $event.showModal;
  }


  yes() {
    this.showModal = false;
    this.router.navigate([
      '/admin/delete/' + this.albumId + '/deleted'
    ], { queryParams: { message: 'Success' } }
    );

  }

  no() {
    this.showModal = false;
  }

//MODAL
onClick() {
  this.modal.open(DialogComponent);
}
}

