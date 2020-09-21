import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '../../environments/api-config';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(
    private baseService: BaseService
  ) { }

  getJobsList(): Observable<any> {
    return this.baseService.get(ApiConfig.JOBS);
  }

  getJobDetails(id: string): Observable<any> {
    return this.baseService.get(`${ApiConfig.JOBS}/${id}`);
  }

  postNewJob(job: any): Observable<any> {
    return this.baseService.post(ApiConfig.JOBS, job);
  }

}
