import { Component, Input } from "@angular/core";
import { IComponent, IProperty } from "../../shared/interface";

@Component({
  selector: "app-br",
  template: `<br>`
})

export class BrComponent implements IComponent {
  initProperty: IProperty = {
    id: "",
    value: "",
    typeObj: "br",
    type: "",
    style: "",
    class: "",
    targetLink: "",
    imgSrc: "",
    dataSrc: ""
  };

  private _property: IProperty;

  @Input() get property(): IProperty {
    return this._property;
  }

  set property(value: IProperty) {
    if(value) {
      this._property = value;
    } else {
      this._property = this.initProperty;
    }
  }

  constructor() {
    if(this.property) {
      this._property = this.property;
    } else {
      this._property = this.initProperty;
    }
  }

  get htmlCode() {
    return "<br>";
  }

}
