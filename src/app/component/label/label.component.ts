import { Component, Input } from "@angular/core";
import { Variables } from "../../shared/classes";

import { IComponent, IProperty } from "../../shared/interface";

@Component({
  selector: "app-label",
  template: `<label [id]="property.id" [style]="property.style">{{ property.value }}</label>`
})

export class LabelComponent implements IComponent {
  private _id = "label" + Variables.getLabelId();
  private _style = "width: auto";
  private _value = "label";

  initProperty: IProperty = {
    id: this._id,
    value: this._value,
    typeObj: "label",
    type: "",
    style: this._style,
    class: "",
    targetLink: "",
    imgSrc: "",
    dataSrc: ""
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
    let tmpHtmlCode = "<label";
    if (this.property.id.trim().length > 0) {
      tmpHtmlCode += " id=\"" + this.property.id + "\"";
    }

    if (this.property.class.trim().length > 0) {
      tmpHtmlCode += " class=\"" + this.property.class + "\"";
    }

    if (this.property.style.trim().length > 0) {
      tmpHtmlCode += " style=\"" + this.property.style + "\"";
    }

    tmpHtmlCode += ">" + this.property.value + "</label>";

    return tmpHtmlCode;
  }

  constructor() {
     // console.log("constructor");  constructor is called twice :(
  }

}
