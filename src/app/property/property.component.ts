import { Component, OnInit, Input, Output } from '@angular/core';

import { IComponent } from '../shared/interfaces';

@Component({
  selector: "app-property",
  templateUrl: "./property.component.html"
})

export class PropertyComponent implements OnInit {
  private _property: IComponent;

  @Input() get property(): IComponent {
    return this._property;
  }

  set property(value: IComponent) {
    if(value) {
      this._property = value;
    }
  }

  // @Output() propertyChange = new EventEmitter<IComponent>();

  constructor() {
    this._property = this.property;
  }

  ngOnInit(): void {
  }

}
