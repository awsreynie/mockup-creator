import {
  CdkDragDrop,
  DragDrop,
  DragDropConfig,
  DragDropModule,
  DragRef,
  DragRefConfig,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { BrComponent } from './component/br/br.component';
import { InputComponent } from './component/input/input.component';
import { LabelComponent } from './component/label/label.component';
import { EmptyComponent } from './shared/classes';
import { IComponent } from './shared/interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'mockup-creator';
  canvasComponent: IComponent[] = [];
  selectedComponent: IComponent = new EmptyComponent;
  style = "";
  private _htmlStart = "<!doctype html>\n<html lang=\"en\">";
  private _htmlEnd = "</html>";

  @ViewChild('canvas') canvas!: ElementRef;

  constructor(private renderer: Renderer2, private drag: DragDrop) {}

  ngOnInit(): void {
    /* throw new Error('Method not implemented.'); */
  }

  addComponentHandler(component: string) {
    let tmpComponent: IComponent;
    switch(component) {
      case "label":
        tmpComponent = new LabelComponent;
        break;
      case "br":
        tmpComponent = new BrComponent;
        break;
      default:
        tmpComponent = new InputComponent;
        break;
    }
    this.canvasComponent.push(tmpComponent)
  }

  clickHandler(component: IComponent) {
    this.selectedComponent = component;
  }

  onDrop(event: CdkDragDrop<IComponent[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
        this.selectedComponent = event.container.data[event.currentIndex]
    }
  }

  private htmlBody(): string {
    let tmpHtmlBody = "\n";

    this.canvasComponent.forEach((value, _) => {
      console.log(value)
      tmpHtmlBody = tmpHtmlBody + value.htmlCode + "\n";
    });
    return tmpHtmlBody;
  }

  get htmlCode(): string {
    return this._htmlStart + "\n" + this.htmlBody() + "\n" + this._htmlEnd;
  }

  createButton() {
    const newButton = this.renderer.createElement('button'); //create dom element

    let ref = this.drag.createDrag(newButton); //make the element draggable with createDrag, then store the reference to ref

    ref.withBoundaryElement(this.canvas); //set the draggable area to only be the canvas

    const text = this.renderer.createText('BUTTON'); //add text to button

    this.renderer.setProperty(newButton, 'type', 'button'); //add type attribute to button

    this.renderer.addClass(newButton, 'btn-primary'); //add css class to the button

    this.renderer.appendChild(newButton, text); //append the text into the button tag

    this.renderer.appendChild(this.canvas.nativeElement, newButton); //append the button to the canvas div
  }

  createTextbox() {
    const newTextbox = this.renderer.createElement('textarea');
    let ref = this.drag.createDrag(newTextbox);
    ref.withBoundaryElement(this.canvas);
    this.renderer.setProperty(newTextbox, 'placeholder', 'Insert text here...');
    this.renderer.addClass(newTextbox, 'textarea');
    this.renderer.appendChild(this.canvas.nativeElement, newTextbox);
  }

  createPopup() {
    const newPopup = this.renderer.createElement('button');
    const text = this.renderer.createText("Popup");
    let ref = this.drag.createDrag(newPopup);
    ref.withBoundaryElement(this.canvas);
    this.renderer.setProperty(newPopup, 'type', 'button');
    this.renderer.addClass(newPopup, 'popup');
    this.renderer.setProperty(newPopup, 'data-toggle', "popover");
    this.renderer.setProperty(newPopup, 'data-content', "This is a popup");
    this.renderer.appendChild(newPopup, text);
    this.renderer.appendChild(this.canvas.nativeElement, newPopup);
    console.log(newPopup);
  }
}
