import { IComponent, IProperty } from "./interfaces";

export class Variables {
  private static _buttonId = 1;
  private static _labelId = 1;
  private static _textAreaId = 1;
  private static _inputId = 1;

  public static getButtonId() {
    return this._buttonId++;
  }

  public static getLabelId() {
    return this._labelId++;
  }

  public static getTextAreaId() {
    return this._textAreaId++;
  }

  public static getInputId() {
    return this._inputId++;
  }
}

export class EmptyComponent implements IComponent {
  initProperty: IProperty = {
    id: "",
    value: "",
    typeObj: "",
    type: "",
    style: "",
    class: ""
  };
}
