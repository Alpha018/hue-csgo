import { BehaviorSubject } from 'rxjs';
import { LightGroup } from '../../types/models';
import { Hue } from '../../../utils/hue';
import { Utils } from '../../../utils/utils';
import { LocalStorage } from 'node-localstorage';

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

interface Action {
  api: any;
  group: LightGroup[];
}

export class HueSingleton {
  api: any;
  group: LightGroup[];
  private static instance: HueSingleton;
  private actionsSubject = new BehaviorSubject<Action>(null);

  get actions$() {
    return this.actionsSubject.asObservable();
  }

  private constructor() {
    this.configureHueUser();
  }

  static getInstance(): HueSingleton {
    if (!HueSingleton.instance) {
      HueSingleton.instance = new HueSingleton();
    }
    return HueSingleton.instance;
  }

  dispatch(action: Action) {
    this.actionsSubject.next(action);
  }

  configureHueUser() {
    Hue.getUser().then((api) => {
      this.api = api;
      this.configurePlace();
    }).catch(async (err) => {
      if (err.status === 570) {
        await Utils.sleep(2000);
        console.log('Press Button in your Philips Hue and try again');
        HueSingleton.instance = new HueSingleton();
      }
    });
  }

  configurePlace() {
    Hue.getAllGroup(this.api).then((group: LightGroup[]) => {
      console.log('------------------------------------------');
      console.log('         Select your group light!!        ');
      console.log('------------------------------------------');
      for (const light of group) {
        console.log(`[${light._id}] ${light._rawData.name}`);
      }
      readline.question('Enter your group number: ', (input: string) => {
        try {
          let localStorage;
          if (typeof localStorage === 'undefined' || localStorage === null) {
            localStorage = new LocalStorage('./scratch');
          }

          const indexLight = parseInt(input, 10);
          if (indexLight >= 0 && indexLight < group.length) {
            localStorage.setItem('indexGroup', indexLight.toString());
            console.log('Now you go to play CS:GO :D');
            return;
          }
          HueSingleton.instance = new HueSingleton();
          readline.close();
        } catch (e) {
          HueSingleton.instance = new HueSingleton();
          readline.close();
        }
      });
      this.group = group;
    });
  }
}
