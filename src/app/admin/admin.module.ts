import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album/album.component';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../share/share.module';

const adminRoutes = [
  {
    path: 'admin',
    component: AlbumComponent
  }
]
@NgModule({
  declarations: [AlbumComponent],
  exports : [AlbumComponent, RouterModule],
        
  imports: [
    CommonModule,
    RouterModule.forRoot(adminRoutes),
    ShareModule

  ]

})
export class AdminModule {
 
}
