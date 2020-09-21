import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [FormsModule, NavigationComponent]
})
export class SharedModule { }
