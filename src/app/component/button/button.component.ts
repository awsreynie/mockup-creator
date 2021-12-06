import { Component, Input } from "@angular/core";
import { Variables } from "../../shared/classes";

import { IComponent, IProperty } from "../../shared/interface";

@Component({
  selector: "app-button",
  template: `<button [id]="property.id" [style]="property.style" [type]="property.type">{{ property.value }}</button>`
})

export class ButtonComponent implements IComponent {
  private _id = "button" + Variables.getButtonId();
  private _style = "width: auto";
  private _value = "button";

  initProperty: IProperty = {
    id: this._id,
    value: this._value,
    typeObj: "button",
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
    let tmpHtmlCode = "<button";
    if (this.property.id.trim().length > 0) {
      tmpHtmlCode += " id=\"" + this.property.id + "\"";
    }

    if (this.property.type.trim().length > 0) {
      tmpHtmlCode += " type=\"" + this.property.type + "\"";
    }

    if (this.property.class.trim().length > 0) {
      tmpHtmlCode += " class=\"" + this.property.class + "\"";
    }

    if (this.property.style.trim().length > 0) {
      tmpHtmlCode += " style=\"" + this.property.style + "\"";
    }

    tmpHtmlCode += ">" + this.property.value + "</button>";

    return tmpHtmlCode;
  }

  constructor() {
     // console.log("constructor");  constructor is called twice :(
  }

}
