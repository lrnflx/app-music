import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumDescriptionComponent } from './album-description/album-description.component';
import { LoginComponent } from './login/login.component';
import { AlbumsComponent } from './albums/albums.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuardService } from './guard.service';

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
    {
    path: 'dashboard', 
    canActivate: [GuardService],
    component: DashboardComponent
    }
];


@NgModule({
  imports: [RouterModule.forRoot(albumsRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
