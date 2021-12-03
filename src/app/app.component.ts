import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { IComponent } from './shared/interfaces';
import { ButtonComponent } from './component/button/button.component';
import { LabelComponent } from './component/label/label.component';
import { TextAreaComponent } from './component/textarea/textarea.component';
import { InputComponent } from './component/input/input.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mockup-creator';

  paletteComponent: IComponent[] = [new ButtonComponent, new LabelComponent, new TextAreaComponent, new InputComponent];
  canvasComponent: IComponent[] = [];


  onDrop(event: CdkDragDrop<IComponent[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      let tmpComponent: IComponent;
      switch (event.previousContainer.data[event.previousIndex]["typeObj"]) {
        case "0":
          tmpComponent = new ButtonComponent;
          break;
        case "1":
          tmpComponent = new LabelComponent;
          break;
        case "2":
          tmpComponent = new TextAreaComponent;
          break;
        default:
          tmpComponent = new InputComponent;
          break;
      }
      this.canvasComponent.splice(event.currentIndex, 0, tmpComponent);
    }
  }
}
