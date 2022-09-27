import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { DropdownDirective } from './directives/dropdown.directive';
import { PlusComponent } from './components/plus/plus.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';

@NgModule({
  declarations: [
    DropdownDirective,
    PlusComponent,
    ImageUploadComponent,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    DropdownDirective,
    PlusComponent,
    ImageUploadComponent,
  ]
})
export class SharedModule { }
