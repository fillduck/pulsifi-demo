import { Component, OnInit } from '@angular/core';
import { finalize, withLatestFrom } from 'rxjs/operators';
import { InitService } from '../../../../services/init.service';
import { JobService } from '../../../../services/job.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {

  userType: 'C' | 'R';
  loadingDetails: boolean;
  jobsList: any[];
  jobDetails: any;
  activeJob: string;
  createJob: boolean;

  constructor(
    private initService: InitService,
    private jobService: JobService
  ) { }

  ngOnInit(): void {
    this.userType = this.initService.getUserType();
    this.loadingDetails = false;
    this.refreshListing();
  }

  refreshListing(): void {
    this.jobsList = undefined;

    this.jobService.getJobsList().subscribe({
      next: response => this.jobsList = response,
      error: error => console.log(error)
    });
  }

  getTruncatedJobDesc(jobDesc: string): string {
    const maxlength: number = 200;
    return jobDesc.length > maxlength ? jobDesc.slice(0, maxlength) + "..." : jobDesc;
  }

  viewJobDetails(id: string): void {
    if (this.activeJob !== id) {
      this.loadingDetails = true;
      this.jobDetails = undefined;
      this.activeJob = id;
      this.createJob = false;

      this.jobService.getJobDetails(id)
        .pipe(finalize(() => this.loadingDetails = false))
        .subscribe({
          next: response => {
            this.jobDetails = response;
          },
          error: error => console.log(error)
        });
    }
  }

  closePanels(): void {
    this.jobDetails = undefined;
    this.activeJob = undefined;
    this.createJob = false;
  }

  createNewJob(): void {
    this.jobDetails = undefined;
    this.activeJob = undefined;
    this.createJob = true;
  }

  postNewJob(data: any): void {
    console.log(data);

    this.jobService.getJobsList()
      .pipe(
        withLatestFrom(this.jobService.postNewJob(data))
      ).subscribe({
        next: response => {
          this.jobsList = response[0];
          this.createJob = data.addAnother;
        },
        error: error => console.log(error)
      });
  }

}
