import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PaletteComponent } from './palette/palette.component';
import { CanvasComponent } from './canvas/canvas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LabelModule } from './component/label/label.module';
import { InputModule } from './component/input/input.module';
import { PropertyModule } from './property/property.module';
import { BrModule } from './component/br/br.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from './component/button/button.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PaletteComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    LabelModule,
    InputModule,
    BrModule,
    PropertyModule,
    ButtonModule,
    DragDropModule
  ],
  providers: [DragDropModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
