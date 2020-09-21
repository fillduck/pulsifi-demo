import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  @Input() jobDetails: any;
  @Output() closePanels: EventEmitter<boolean> = new EventEmitter<boolean>();

  fileUrl: SafeUrl;

  constructor(
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.fileUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.jobDetails.extraJd);
  }

  goBack(): void {
    this.closePanels.emit(true);
  }

}
