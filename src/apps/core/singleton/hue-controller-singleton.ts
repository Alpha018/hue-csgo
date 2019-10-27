import { BehaviorSubject } from 'rxjs';
import { Hue } from '../../../utils/hue';

interface Action {
  hue: Hue;
}

export class HueControllerSingleton {
  hue: Hue;
  private static instance: HueControllerSingleton;
  private actionsSubject = new BehaviorSubject<Action>(null);

  get actions$() {
    return this.actionsSubject.asObservable();
  }

  private constructor() {
    this.hue = new Hue();
  }

  static getInstance(): HueControllerSingleton {
    if (!HueControllerSingleton.instance) {
      HueControllerSingleton.instance = new HueControllerSingleton();
    }
    return HueControllerSingleton.instance;
  }

  dispatch(action: Action) {
    this.actionsSubject.next(action);
  }
}
