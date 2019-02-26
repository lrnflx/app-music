import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumDescriptionComponent } from './album-description/album-description.component';
import { LoginComponent } from './login/login.component';
import { AlbumsComponent } from './albums/albums.component';

// définission de la constante pour les routes
const albumsRoutes: Routes = [
  {
    path: 'albums',
    component: AlbumsComponent
    },
    {
    path: '',
    redirectTo: '/albums',
    pathMatch: 'full'
    },
    {
    path: 'login',
    component: LoginComponent
    },
    {
    path: 'album/:id',
    component: AlbumDescriptionComponent
    },
];


@NgModule({
  imports: [RouterModule.forRoot(albumsRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
