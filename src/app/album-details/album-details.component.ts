import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album , List } from'../album';
import { AlbumService } from '../album.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
  } from '@angular/animations';


@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss'],
  animations: [
    trigger('myAnimation', [
      state('open', style({
        opacity: 1,
        backgroundColor: 'green'
        })),
        // définir l'état close de l'élément HTML
        state('opening', style({
        opacity: 0.25,
        backgroundColor: 'yellow'
        })),
        transition('opening => open', [
        animate('2s')
          ]),
    ]),
  ]})
export class AlbumDetailsComponent implements OnInit {
  
  @Input() album: Album; // propriété [album] liée 
  // AlbumDetailsComponent
  @Output() onPlay: EventEmitter<Album> = new EventEmitter();

  // albumLists: List[] = ALBUM_LISTS; // récupération de la liste des chasons
  songs: List;
  isActive: boolean = false;

  constructor(private albumService : AlbumService) { }

  ngOnInit() {}

  // dès que quelque chose "rentre" dans le component enfant via une propriété Input
  // ou à l'initialisation du component (une fois) cette méthode est appelée
  ngOnChanges() {
    // on vérifie que l'on a bien cliqué sur un album avant de rechercher dans la liste
    // des chansons.
    if(this.album){
      // récupération de la liste des chansons
      this.songs = this.albumService.getAlbumList(this.album.id);
      this.isActive = false;

      const animate = setInterval(() => {
        this.isActive = !this.isActive;
        clearInterval(animate)
      },90)

    }

   
  }
  // AlbumDetailsComponent
  play(album: Album) {
    this.onPlay.emit(album); // émettre un album vers le parent

  }

}
