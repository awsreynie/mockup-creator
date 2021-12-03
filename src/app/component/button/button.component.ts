
import { Component, Input } from "@angular/core";
import { Variables } from "../../shared/classes";

import { IComponent, IProperty } from "../../shared/interfaces";

@Component({
  selector: "app-button",
  template: `<button [id]="property.id" [style]="property.style" [type]="property.type">{{ property.value }}</button>`
})

export class ButtonComponent implements IComponent {
  initProperty: IProperty = {
    id: "button" + Variables.getButtonId(),
    value: "button",
    typeObj: "button",
    type: "",
    style: "width: 100px",
    class: ""
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

}
