import { Component } from "@angular/core";
import { Variables } from "../../shared/classes";

import { IComponent } from "../../shared/interfaces";

@Component({
  selector: "app-label",
  template: `<label [id]="id" border="solid" width="100px">{{ name }}</label>`
})

export class LabelComponent implements IComponent {
  id = "label" + Variables.getLabelId();
  name = "label";
  category = "Display";
  typeObj = "1";

}
