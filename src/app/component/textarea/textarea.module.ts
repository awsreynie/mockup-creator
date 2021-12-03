import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextAreaComponent } from './textarea.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ TextAreaComponent ],
  exports: [ TextAreaComponent ]
})

export class TextAreaModule {}
