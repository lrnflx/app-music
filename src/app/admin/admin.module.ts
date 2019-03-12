import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album/album.component';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../share/share.module';
import { GuardService } from '../guard.service';
import { AddAlbumComponent } from './add-album/add-album.component';
import { UpdateAlbumComponent } from './update-album/update-album.component';
import { DeleteAlbumComponent } from './delete-album/delete-album.component';
import { DialogComponent } from './modal/dialog/dialog.component';

const adminRoutes = [
  {
    path: 'admin',
    component: AlbumComponent
  }, 
  {
    path: 'admin/add', canActivate: [GuardService], component: AddAlbumComponent
  }, 
  {
    path: 'admin/update/:id' ,canActivate: [GuardService], component: UpdateAlbumComponent
  },
  {
    path: 'admin/delete/:id/:action' ,canActivate: [GuardService], component: DeleteAlbumComponent
  }
]
@NgModule({
  declarations: [AlbumComponent, AddAlbumComponent, UpdateAlbumComponent, DeleteAlbumComponent, DialogComponent ],
  exports : [AlbumComponent, RouterModule],
        
  imports: [
    CommonModule,
    RouterModule.forRoot(adminRoutes),
    ShareModule
  ]

})
export class AdminModule {
 
}
