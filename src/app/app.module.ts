import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { SearchComponent } from './search/search.component';
import { LanguesComponent } from './langues/langues.component';
import { AlbumDescriptionComponent } from './album-description/album-description.component';
import { LoginComponent } from './login/login.component';
import { PaginateComponent } from './paginate/paginate.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';

import * as firebase from 'firebase';
import { DashboardComponent } from './dashboard/dashboard.component';

// complétez avec vos propres identifiants
const firebaseConfig = {
  apiKey: "AIzaSyBU6KGXYzzgBi_O_UY0nYlv9gUhshJRuqQ",
  authDomain: "app-music-3wa.firebaseapp.com",
  databaseURL: "https://app-music-3wa.firebaseio.com",
  projectId: "app-music-3wa",
  storageBucket: "app-music-3wa.appspot.com",
  messagingSenderId: "77616959383"

  };

// initialisez Firebase
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    AlbumDetailsComponent,
    SearchComponent,
    LanguesComponent,
    AlbumDescriptionComponent,
    LoginComponent,
    PaginateComponent,
    AudioPlayerComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule, 
    BrowserAnimationsModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
