import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '../../environments/api-config';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  userType: 'C' | 'R';

  constructor(
    private baseService: BaseService
  ) { }

  init(): Observable<any> {
    return this.baseService.get(ApiConfig.INIT);
  }

  setUserType(userType: 'C' | 'R'): void {
    this.userType = userType;
  }

  getUserType(): 'C' | 'R' {
    return this.userType;
  }

  addUser(): Observable<any> {
    const id: string = Math.random().toString(36).substr(2, 5);

    return this.baseService.post(ApiConfig.INIT, {
      realm: 'demo',
      username: id,
      email: `${id}@domain.com`,
      password: 'testing123'
    });
  }

  deleteUser(id: string): Observable<any> {
    return this.baseService.delete(`${ApiConfig.INIT}/${id}`);
  }

}
