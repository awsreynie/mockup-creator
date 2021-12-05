import { Component, Input } from "@angular/core";
import { Variables } from "../../shared/classes";

import { IComponent, IProperty } from "../../shared/interface";

@Component({
  selector: "app-label",
  template: `<label [id]="property.id" [style]="property.style">{{ property.value }}</label>`
})

export class LabelComponent implements IComponent {
  private _id = "label" + Variables.getLabelId();
  private _style = "width: 100px";
  private _value = "label";

  initProperty: IProperty = {
    id: this._id,
    value: this._value,
    typeObj: "label",
    type: "",
    style: this._style,
    class: "",
  };

  @Input() get property(): IProperty {
    return this.initProperty;
  }

  set property(value: IProperty) {
    // console.log("set property");
    if(value) {
      this.initProperty = value;
    }
  }

  get htmlCode(): string {
    return "<label id=\"" + this.property.id + "\" "
    + "type=\"" + this.property.type + "\" "
    + "style=\"" + this.property.style + "\">"
    + this.property.value + "</label>";
  }

  constructor() {
     // console.log("constructor");  constructor is called twice :(
  }

}
