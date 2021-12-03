import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { IComponent } from "./shared/interfaces";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  components: IComponent[] = [];

  constructor() {}

  getComponents(): Observable<IComponent[]> {
    return of (this.components);
  }

  addComponents(component: IComponent, index: number) {
    this.components.splice(index, 0, component);
  }
}
