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
import { ThemePalette } from '@angular/material/core';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { BrComponent } from './component/br/br.component';
import { ButtonComponent } from './component/button/button.component';
import { InputComponent } from './component/input/input.component';
import { LabelComponent } from './component/label/label.component';
import { IComponent, IProperty } from './shared/interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'mockup-creator';
  tabActive = 0;
  tabs = ["first", "second"]
  canvasComponent: IComponent[] = [];
  mapCanvasComponent: Map<number, IComponent[]> = new Map<number, IComponent[]>();
  mapTabs: Map<number, string> = new Map<number, string>();
  private _selectedProperty: IProperty = {
    id: "",
    value: "",
    typeObj: "",
    type: "",
    style: "",
    class: "",
    targetLink: "",
    imgSrc: ""
  };
  selectedProperty = this._selectedProperty;
  private _styleStart = "<style>";
  private _styleEnd = "</style>";
  private _styleBody = "";
  private _htmlStart = "<!doctype html>\n<html lang=\"en\">";
  private _htmlEnd = "</html>";

  @ViewChild('canvas') canvas!: ElementRef;
  background: ThemePalette = undefined;

  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

  constructor(private renderer: Renderer2, private drag: DragDrop) {
    this.mapTabs.set(0, "Main");
    this.mapCanvasComponent.set(0, []);
  }

  ngOnInit(): void {
    /* throw new Error('Method not implemented.'); */
  }

  get style(): string {
    return this._styleBody;
  }

  set style(value: string) {
    this._styleBody = value;
  }

  styleHandler(event: any) {
    this._styleBody = event.target.value;
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
      case "button":
        tmpComponent = new ButtonComponent;
        break;
      default:
        tmpComponent = new InputComponent;
        break;
    }
    //this.canvasComponent.push(tmpComponent)
    this.mapCanvasComponent.get(this.tabActive)!.push(tmpComponent);
    this.canvasComponent = this.mapCanvasComponent.get(this.tabActive)!!;
  }

  clickHandler(component: IComponent) {
    this.selectedProperty = component.initProperty;
  }

  onDrop(event: CdkDragDrop<IComponent[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
        this.selectedProperty = event.container.data[event.currentIndex].initProperty;
    }
  }

  private htmlBody(): string {
    let tmpHtmlBody = "\n";

    this.canvasComponent.forEach((value, _) => {
      tmpHtmlBody = tmpHtmlBody + value.htmlCode + "\n";
    });
    return tmpHtmlBody;
  }

  get htmlCode(): string {
    return this._htmlStart
    + "\n" + this.htmlBody()
    + "\n" + this._htmlEnd
    + "\n" + this._styleStart
    + "\n" + this.style
    + "\n" + this._styleEnd;
  }

  onTabChangeHandler(index: number) {
    console.log(index);
    this.tabActive = index;
    this.canvasComponent = this.mapCanvasComponent.get(this.tabActive)!!;
  }

  addTabHandler() {
    this.mapCanvasComponent.set(this.mapTabs.size, []);
    this.mapTabs.set(this.mapTabs.size, "New Tab")
  }

  tabDeleteHandler(index: number) {
    this.mapTabs.delete(index);
    this.mapCanvasComponent.delete(index);
  }

  tabNameChangeHandler(index: number, event: any) {
    this.mapTabs.set(index, event.target.value)
  }

  selectTabHandler(targetLink: string) {
    this.mapTabs.forEach((value, key) => {
      if (value == targetLink) {
        this.tabActive = key;
        this.canvasComponent = this.mapCanvasComponent.get(key)!!;
      }
    });
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
