import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { DropdownDirective } from './directives/dropdown.directive';
import { PlusComponent } from './components/plus/plus.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { LoaderComponent } from './components/loader/loader.component';



@NgModule({
  declarations: [
    DropdownDirective,
    PlusComponent,
    ImageUploadComponent,
    // LoaderComponent,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    PlusComponent,
    ImageUploadComponent,
    // LoaderComponent,
    DropdownDirective
  ]
})
export class SharedModule { }
