import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { CreateJobComponent } from './create-job/create-job.component';

@NgModule({
  declarations: [JobsListComponent, JobDetailsComponent, CreateJobComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list' },
      { path: 'list', component: JobsListComponent },
      { path: 'details', component: JobDetailsComponent },
      { path: 'new', component: CreateJobComponent },
    ]),
    SharedModule
  ]
})
export class JobsModule { }
