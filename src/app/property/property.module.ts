import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyComponent } from './property.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [ CommonModule, FormsModule ],
  declarations: [ PropertyComponent ],
  exports: [ PropertyComponent ]
})

export class PropertyModule {}
