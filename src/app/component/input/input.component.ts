import { Component, Input } from "@angular/core";
import { Variables } from "../../shared/classes";
import { IComponent, IProperty } from "../../shared/interface";

@Component({
  selector: "app-input",
  template: `<input (keyup)="keyPressHandler($event)" [id]="property.id" [type]="property.type" [style]="property.style" [value]="property.value" />`
})

export class InputComponent implements IComponent {
  private _id = "input" + Variables.getInputId();
  private _style = "width: auto";
  private _value = "label";

  initProperty: IProperty = {
    id: this._id,
    value: this._value,
    typeObj: "input",
    type: "",
    style: this._style,
    class: "",
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

  keyPressHandler(event: any) {
    this.property.value = event.target.value
  }

  get htmlCode(): string {
    let tmpHtmlCode = "<input";
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

    if (this.property.value.trim().length > 0) {
      tmpHtmlCode += " value=\"" + this.property.value + "\"";
    }

    tmpHtmlCode += "></input>";

    return tmpHtmlCode;
  }

}
