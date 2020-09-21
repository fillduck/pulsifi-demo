import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {

  @Output() postNewJob: EventEmitter<any> = new EventEmitter<any>();
  @Output() closePanels: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('form', { static: false }) form: NgForm;

  newJob: any;
  extraJd: string;
  extraJdFileName: string;

  constructor() { }

  ngOnInit(): void {
    this.newJob = {};
  }

  isFormItemValid(form, item): boolean {
    return (form.submitted && item.invalid) || (item.invalid && (item.dirty || item.touched));
  }

  chooseFile(): void {
    const input: HTMLElement = document.getElementById('extra-jd-upload');
    input.click();
  }

  readFile(e: any): void {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.newJob.extraJd = event.target.result;
      this.extraJdFileName = e.target.files[0].name;
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  submitForm(): void {
    if (this.form.valid) {
      this.postNewJob.emit(this.newJob);

      if (this.newJob.addAnother) {
        this.newJob = {};
        this.form.resetForm();
      }
    }
  }

  goBack(): void {
    this.closePanels.emit(true);
  }

}
