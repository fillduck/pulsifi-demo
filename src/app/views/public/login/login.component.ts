import { Component, OnInit } from '@angular/core';
import { InitService } from '../../../services/init.service';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private initService: InitService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
  }

  setUserType(userType: 'C' | 'R'): void {
    this.initService.setUserType(userType);
    this.sharedService.navigate('/secure', { skipLocationChange: true });
  }

}
