import { EventEmitter, Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private router: Router
  ) { }

  navigate(url: string, params?: NavigationExtras): void {
    this.router.navigate([url], { ...params });
  }

}
