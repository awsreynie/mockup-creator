import { Component } from "@angular/core";
import { Variables } from "../../shared/classes";
import { IComponent } from "../../shared/interfaces";

@Component({
  selector: "app-input",
  template: `<input [id]="id" border="solid" width="100px" [value]="name" />`
})

export class InputComponent implements IComponent {
  id = "input" + Variables.getTextAreaId();
  name = "input";
  category = "Input";
  typeObj = "3";

}
