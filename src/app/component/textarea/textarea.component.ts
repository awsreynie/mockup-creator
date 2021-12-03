import { Component } from "@angular/core";
import { Variables } from "../../shared/classes";
import { IComponent } from "../../shared/interfaces";

@Component({
  selector: "app-text-area",
  template: `<textarea [id]="id" border="solid" width="100px">{{ name }}</textarea>`
})

export class TextAreaComponent implements IComponent {
  id = "textarea" + Variables.getTextAreaId();
  name = "textarea";
  category = "Input";
  typeObj = "2";

}
