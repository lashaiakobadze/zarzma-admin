import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { DropdownDirective } from './directives/dropdown.directive';
import { PlusComponent } from './components/plus/plus.component';
import { ErrorComponent } from './components/error/error.component';
import { DragDirective } from './directives/dragDrop.directive';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';

@NgModule({
  declarations: [
    DropdownDirective,
    DragDirective,
    PlusComponent,
    ErrorComponent,
    ImageUploaderComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownDirective,
    DragDirective,
    PlusComponent,
    ErrorComponent,
    ImageUploaderComponent
  ]
})
export class SharedModule { }
