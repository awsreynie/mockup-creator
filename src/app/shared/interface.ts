export interface IComponent {
  initProperty: IProperty;
  get htmlCode(): string;
}

export interface IProperty {
  id: string;
  value: string;
  class: string;
  style: string;
  typeObj: string;
  type: string;
  targetLink: string;
  imgSrc: string;
}
