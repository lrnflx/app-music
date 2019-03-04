import { Component, OnInit, Input } from '@angular/core';

import { AlbumService } from '../album.service';
import { Album } from '../album';


@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {

  @Input() album: Album; // propriété [album] liée 

  showplayer: boolean = false;
  current: number = 1; //valeur par défaut du player
  totalSongs: number =1;
  ratio: number = 0;

  constructor(private albumService: AlbumService) { }

  ngOnInit() {
    this.albumService.albumSubject.subscribe(
      album => { 
        this.showplayer = true;
        this.current = 1;
        let duration = album.duration;
        this.totalSongs = Math.floor(duration / 120);
        this.ratio = Math.floor( 100 / this.totalSongs);
        let step = this.ratio;

        const timer = 120 * 1000; // toutes les 2 min passage à autre chanson
        
        const player = setInterval(() => {
          this.current++;
          this.ratio += step; // on ajoute le ratio
          console.log(this.ratio);
          if (this.ratio > 100) {
            clearInterval(player);
            this.showplayer = false;
            // mise à jour du status dans l'album
            this.albumService.switchOff(album); // mise à jour d'album
          }
        }, timer)
      }
      )
  }

}
