import { Component, Input } from "@angular/core";
import { Variables } from "../../shared/classes";
import { IComponent, IProperty } from "../../shared/interfaces";

@Component({
  selector: "app-text-area",
  template: `<textarea [id]="property.id" [style]="property.style">{{ property.value }}</textarea>`
})

export class TextAreaComponent implements IComponent {
  initProperty: IProperty = {
    id: "textarea" + Variables.getTextAreaId(),
    value: "textarea",
    typeObj: "textarea",
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
