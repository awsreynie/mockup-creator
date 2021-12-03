import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PaletteComponent } from './palette/palette.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ButtonModule } from './component/button/button.module';
import { LabelModule } from './component/label/label.module';
import { TextAreaModule } from './component/textarea/textarea.module';
import { InputModule } from './component/input/input.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PaletteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    ButtonModule,
    LabelModule,
    TextAreaModule,
    InputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
