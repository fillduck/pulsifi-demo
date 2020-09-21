import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PublicComponent } from '../public/public.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PublicComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: PublicComponent, children: [
          { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }
        ]
      }
    ]),
    SharedModule
  ]
})
export class PublicModule { }
