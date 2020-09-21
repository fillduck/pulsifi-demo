import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SecureComponent } from './secure.component';

@NgModule({
  declarations: [SecureComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: SecureComponent, children: [
          { path: '', redirectTo: 'jobs' },
          { path: 'jobs', loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule) }
        ]
      }
    ]),
    SharedModule
  ]
})
export class SecureModule { }
