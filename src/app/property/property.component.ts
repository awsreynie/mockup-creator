import { Component, OnInit, Input, Output } from '@angular/core';

import { IProperty } from '../shared/interface';

@Component({
  selector: "app-property",
  templateUrl: "./property.component.html"
})

export class PropertyComponent implements OnInit {
  private _property: IProperty;

  @Input() get property(): IProperty {
    return this._property;
  }

  set property(value: IProperty) {
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

  idChangeHandler(event: any) {
    this.property.id = event.target.value;
  }

  valueChangeHandler(event: any) {
    this.property.value = event.target.value;
  }

  typeChangeHandler(event: any) {
    this.property.type = event.target.value;
  }

  targetLinkChangeHandler(event: any) {
    this.property.targetLink = event.target.value;
  }

  imgSrcChangeHandler(event: any) {
    this.property.imgSrc = event.target.value;
  }

  styleChangeHandler(event: any) {
    this.property.style = event.target.value;
  }

  classChangeHandler(event: any) {
    this.property.class = event.target.value;
  }
}
