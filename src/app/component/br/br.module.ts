import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrComponent } from './br.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ BrComponent ],
  exports: [ BrComponent ]
})

export class BrModule {}
