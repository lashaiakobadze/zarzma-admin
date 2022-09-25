import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


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
    PlusComponent,
    ImageUploadComponent,
    DropdownDirective
  ]
})
export class SharedModule { }
