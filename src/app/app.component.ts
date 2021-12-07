import {
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  OnInit,
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
  private _tabCounter = 1;
  private _mapKey = 1;
  private _styleStart = "<style>";
  private _styleEnd = "</style>";
  private _styleBody = "";
  private _htmlStart = "<!doctype html>\n<html lang=\"en\">";
  private _htmlEnd = "</html>";
  private _selectedProperty: IProperty = {
    id: "",
    value: "",
    typeObj: "",
    type: "",
    style: "",
    class: "",
    targetLink: "",
    imgSrc: "",
    dataSrc: ""
  };
  title = 'mockup-creator';
  tabActive = 0;
  canvasComponent: IComponent[] = [];
  mapCanvasComponent: Map<number, IComponent[]> = new Map<number, IComponent[]>();
  mapTabs: Map<number, string> = new Map<number, string>();
  selectedProperty = this._selectedProperty;

  @ViewChild('canvas') canvas!: ElementRef;

  constructor() {
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
    this.tabActive = index;
    this.selectedProperty = this._selectedProperty;
    this.canvasComponent = this.mapCanvasComponent.get(this.tabActive)!!;
  }

  addTabHandler() {
    this.mapCanvasComponent.set(this._mapKey, []);
    this.mapTabs.set(this._mapKey++, "New Tab" + this._tabCounter++)

    if(this.mapTabs.size == 1) {
      this.selectFirstTab()
    }
  }

  tabDeleteHandler(index: number) {
    this.mapTabs.delete(index);
    this.mapCanvasComponent.delete(index);
    if (this.mapTabs.size == 0) {
      this.tabActive = -1;
      this.canvasComponent = [];
      this.selectedProperty = this._selectedProperty;
    } else if(index == this.tabActive) {
      this.selectFirstTab()
    }
  }

  tabNameChangeHandler(index: number, event: any) {
    this.mapTabs.set(index, event.target.value)
  }

  selectTargetLinkHandler(targetLink: string) {
    let tmpKey = this.tabActive;
    this.mapTabs.forEach((value, key) => {
      if (value == targetLink) {
        this.tabActive = key;
        this.canvasComponent = this.mapCanvasComponent.get(key)!!;
        this.selectedProperty = this._selectedProperty;
        this.loadDataToTab(tmpKey)
        return;
      }
    });
  }

  private selectFirstTab() {
    this.tabActive = this.mapTabs.keys().next().value;
    this.canvasComponent = this.mapCanvasComponent.get(this.tabActive)!!;
    this.selectedProperty = this._selectedProperty;
  }

  private loadDataToTab(dataIndexSource: number) {
    this.canvasComponent.forEach(data => {
      if (data.initProperty.dataSrc.trim().length > 0) {
        data.initProperty.value = this.getTargetData(dataIndexSource, data.initProperty.dataSrc);
      }
    });
  }

  private getTargetData(key: number, targetData: string) {
    let value = ""
    this.mapCanvasComponent.get(key)?.forEach(data => {
      if (data.initProperty.id === targetData) {
        value = data.initProperty.value;
        return;
      }
    });
    return value;
  }
}
