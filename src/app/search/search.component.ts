import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlbumService } from '../album.service';
import { Album } from '../album';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() searchAlbums: EventEmitter<Album[]> = new EventEmitter();
  constructor(private albumService : AlbumService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm): void {
    

   this.albumService.search(form.value['word']).subscribe(
      albums => {
        if(albums.length > 0 ){
          this.searchAlbums.emit(albums);
        }
  
      }
     
    );
    
    console.log(form);
  }

}
