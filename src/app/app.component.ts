import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map, take} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'app-music';
  time;

  ngOnInit(){
    const counter = interval(1000);

    const counterConvert = counter.pipe(
      map(timer => {
        let min = Math.floor(timer % 3600 / 60);
        let h = Math.floor(timer / 3600);
        let s = Math.floor(timer % 3600 % 60);

         return ('0' + h).slice(-2) + ":" + ('0' + min).slice(-2) + ":" + ('0' + s).slice(-2);
      }
         ),
         take(12*60*60) //Arrête le compteur au bout de 12h
     )
     counterConvert.subscribe(
      (value) => 
        this.time = value
      );
      console.error();
      

   
  }


}
