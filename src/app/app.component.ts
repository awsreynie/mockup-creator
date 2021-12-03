import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable, BehaviorSubject, switchMap } from 'rxjs';

import { IComponent } from './shared/interfaces';
import { ButtonComponent } from './component/button/button.component';
import { LabelComponent } from './component/label/label.component';
import { TextAreaComponent } from './component/textarea/textarea.component';
import { InputComponent } from './component/input/input.component';
import { EmptyComponent } from './shared/classes';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mockup-creator';

  paletteComponent: IComponent[] = [new ButtonComponent, new LabelComponent, new TextAreaComponent, new InputComponent];
  canvasComponent: IComponent[] = [];
  selectedComponent: IComponent = new EmptyComponent;
  refreshComponent$ = new BehaviorSubject<boolean>(true);

  components$: Observable<IComponent[]>;

  constructor(private api: ApiService) {
    this.components$ = api.getComponents();
  }

  ngOnInit() {
    this.components$ = this.refreshComponent$.pipe(switchMap(_ => this.api.getComponents()));
  }

  onDrop(event: CdkDragDrop<IComponent[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
        this.selectedComponent = event.container.data[event.currentIndex]
    } else {
      let tmpComponent: IComponent;
      switch (event.previousContainer.data[event.previousIndex].initProperty["typeObj"]) {
        case "button":
          tmpComponent = new ButtonComponent;
          break;
        case "label":
          tmpComponent = new LabelComponent;
          break;
        case "textarea":
          tmpComponent = new TextAreaComponent;
          break;
        default:
          tmpComponent = new InputComponent;
          break;
      }
      this.selectedComponent = tmpComponent;
      this.api.addComponents(tmpComponent, event.currentIndex);
    }
  }

  clickHandler(component: IComponent) {
    this.selectedComponent = component;
  }
}
