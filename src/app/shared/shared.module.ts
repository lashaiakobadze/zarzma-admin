import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { DropdownDirective } from './directives/dropdown.directive';
import { DeferLoadDirective } from './directives/defer-load.directive';
import { LazyLoadDirective } from './directives/lazy-src.directive';
import { DragDirective } from './directives/dragDrop.directive';

import { PlusComponent } from './components/plus/plus.component';
import { ErrorComponent } from './components/error/error.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';

@NgModule({
  declarations: [
    DropdownDirective,
    DragDirective,
    DeferLoadDirective,
    LazyLoadDirective,
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
    LazyLoadDirective,
    DeferLoadDirective,
    PlusComponent,
    ErrorComponent,
    ImageUploaderComponent
  ]
})
export class SharedModule { }
