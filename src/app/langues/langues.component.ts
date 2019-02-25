import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlbumService } from '../album.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-langues',
  templateUrl: './langues.component.html',
  styleUrls: ['./langues.component.scss']
})
export class LanguesComponent implements OnInit {

  @Output() selectedLangue: EventEmitter<string> = new EventEmitter();

  constructor(private albumService: AlbumService) { }

  ngOnInit() {
  }

  onSelectLangue(form: NgForm): void{
    const langue = this.albumService.langue(form.value['word']);

      this.selectedLangue.emit(langue);
  
      console.log(langue);
  }

}
