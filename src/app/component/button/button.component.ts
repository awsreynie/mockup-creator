
import { Component } from "@angular/core";
import { Variables } from "../../shared/classes";

import { IComponent } from "../../shared/interfaces";

@Component({
  selector: "app-button",
  template: `<button [id]="id">{{ name }}</button>`
})

export class ButtonComponent implements IComponent {
  id = "button" + Variables.getButtonId();
  name = "button";
  category = "Action";
  typeObj = "0";

}
