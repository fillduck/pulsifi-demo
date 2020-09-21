import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.sharedService.navigate('/');
  }

}
