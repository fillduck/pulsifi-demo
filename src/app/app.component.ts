import { Component } from '@angular/core';
import { finalize, withLatestFrom } from 'rxjs/operators';
import { InitService } from './services/init.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'pulsifi-demo';

  init: boolean;
  users: any[];

  constructor(
    private initService: InitService
  ) { }

  ngOnInit(): void {
    this.init = false;
    this.users = [];

    this.initService.init().subscribe({
      next: response => {
        this.init = true;
        this.users = response;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  displayUsers(): string {
    return JSON.stringify(this.users);
  }

  addUser(): void {
    this.initService.init()
      .pipe(
        withLatestFrom(this.initService.addUser())
      ).subscribe({
        next: response => this.users = response[0],
        error: error => console.log(error)
      });
  }

  deleteUsers(): void {
    this.initService.init()
      .pipe(
        withLatestFrom(this.initService.deleteUser(this.users[0].id)),
        finalize(() => {
          if (this.users.length > 0) {
            this.deleteUsers();
          }
        })
      ).subscribe({
        next: response => this.users = response[0],
        error: error => console.log(error)
      });
  }

}
