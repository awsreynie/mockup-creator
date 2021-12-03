import { Component, Input } from "@angular/core";
import { Variables } from "../../shared/classes";
import { IComponent, IProperty } from "../../shared/interface";

@Component({
  selector: "app-input",
  template: `<input [id]="property.id" [type]="property.type" [style]="property.style" [value]="property.value" />`
})

export class InputComponent implements IComponent {
  initProperty: IProperty = {
    id: "input" + Variables.getInputId(),
    value: "input",
    typeObj: "input",
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
