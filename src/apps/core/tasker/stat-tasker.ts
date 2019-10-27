import { LightGroup, RequestCounter } from '../../types/models';
import { Hue } from '../../../utils/hue';
import config from '../../../config';
import { LocalStorage } from 'node-localstorage';
import { Utils } from '../../../utils/utils';
import { HueSingleton } from '../singleton/hue-singleton';
import { HueControllerSingleton } from '../singleton/hue-controller-singleton';

export class StatTasker {
  public static async getStatus(playStat: RequestCounter) {
    const state = Utils.getStatus(playStat);

    let localStorage;
    if (typeof localStorage === 'undefined' || localStorage === null) {
      localStorage = new LocalStorage('./scratch');
    }

    const lastState = JSON.parse(localStorage.getItem('lastState') || null);
    try {
      if (state.phase) {
        if (!lastState) {
          localStorage.setItem('lastState', JSON.stringify(state));
          this.switchColor(state);
        } else if (lastState.phase !== state.phase) {
          localStorage.setItem('lastState', JSON.stringify(state));
          this.switchColor(state);
        }
      }
    } catch (e) {
      throw e;
    }
  }

  private static async switchColor(state: any) {
    let localStorage;
    if (typeof localStorage === 'undefined' || localStorage === null) {
      localStorage = new LocalStorage('./scratch');
    }

    const api: any =  HueSingleton.getInstance().api;
    const group: LightGroup[] =  HueSingleton.getInstance().group;
    const hue: Hue = HueControllerSingleton.getInstance().hue;
    const indexGroup = parseInt(localStorage.getItem('indexGroup'), 10);

    if (group) {
      try {
        hue.bombDefuse();
        switch (state.phase) {
          case 'over': {
            if (state.extra === 'CT') {
              for (const data of group[indexGroup]._rawData.lights) {
                await hue.changeColor(api, data, config.colors.counterT);
              }
            } else {
              for (const data of group[indexGroup]._rawData.lights) {
                await hue.changeColor(api, data, config.colors.terrorist);
              }
            }
            break;
          }
          case 'planted': {
            for (const data of group[indexGroup]._rawData.lights) {
              await hue.turnOff(api, parseInt(data, 10));
            }
            await hue.bombLight(api, group[indexGroup]._rawData.lights);
            break;
          }
          case 'freezetime': {
            for (const data of group[indexGroup]._rawData.lights) {
              await hue.changeColor(api, data, config.colors.freezeTime);
            }
            break;
          }
          case 'T': {
            for (const data of group[indexGroup]._rawData.lights) {
              await hue.changeColor(api, data, config.colors.terrorist);
            }
            break;
          }
          case 'CT': {
            for (const data of group[indexGroup]._rawData.lights) {
              await hue.changeColor(api, data, config.colors.counterT);
            }
            break;
          }
        }
      } catch (e) {
        throw e;
      }
    }
  }
}
