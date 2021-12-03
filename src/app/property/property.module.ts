import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyComponent } from './property.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ PropertyComponent ],
  exports: [ PropertyComponent ]
})

export class PropertyModule {}
