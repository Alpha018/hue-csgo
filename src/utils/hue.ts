// @ts-ignore
import { v3 } from 'node-hue-api';
import { errors } from './errors';
import { Light } from '../apps/types/models';
import { LocalStorage } from 'node-localstorage';
import { Utils } from './utils';
import config from '../config';

export class Hue {

  bombPlanted: boolean;

  constructor() {
    this.bombPlanted = false;
  }

  public static async getUser() {
    let localStorage;
    if (typeof localStorage === 'undefined' || localStorage === null) {
      localStorage = new LocalStorage('./scratch');
    }
    const results = await v3.discovery.nupnpSearch();

    const unauthenticatedApi = await v3.api.create(results[0].ipaddress);

    let createdUser;
    try {
      const username = localStorage.getItem('userName');
      if (!username) {
        createdUser = await unauthenticatedApi.users.createUser('csgo-hue', 'light for cs:go');
        localStorage.setItem('userName', createdUser.username);
        return await v3.api.create(results[0].ipaddress, createdUser.username);
      }
      return await v3.api.create(results[0].ipaddress, username);
    } catch (e) {
      if (e.getHueErrorType() === 101) {
        throw new errors.BUTTON_NOT_PRESSED();
      }
      throw new errors.UNEXPECTED_ERROR();
    }
  }

  public static async getAllLights(api: any) {
    try {
      const lights = await api.lights.getAll();
      const json = (JSON.stringify(lights, null, 2));
      return JSON.parse(json);
    } catch (e) {
      throw new errors.UNEXPECTED_ERROR();
    }
  }

  public static async getAllGroup(api: any) {
    try {
      const lights = await api.groups.getAll();
      const json = (JSON.stringify(lights, null, 2));
      return JSON.parse(json);
    } catch (e) {
      throw new errors.UNEXPECTED_ERROR();
    }
  }

  public async turnOff(api: any, lightId: number) {
    try {
      return await api.lights.setLightState(lightId, { on: false });
    } catch (e) {
      throw new errors.UNEXPECTED_ERROR();
    }
  }

  public async turnOn(api: any, lightId: number) {
    try {
      return await api.lights.setLightState(lightId, { on: true });
    } catch (e) {
      throw new errors.UNEXPECTED_ERROR();
    }
  }

  public async toggleLight(api: any, light: Light) {
    try {
      return await api.lights.setLightState(light._id, { on: !light._rawData.state.on });
    } catch (e) {
      throw new errors.UNEXPECTED_ERROR();
    }
  }

  public async changeColor(api: any, light: string, colorHex: string) {
    try {
      const LightState = v3.lightStates.LightState;
      const rgb = Utils.hexToRgb(colorHex);
      const state = new LightState()
        .on(true)
        .rgb(rgb.r, rgb.g, rgb.b)
        .brightness(50);
      return await api.lights.setLightState(light, state);
    } catch (e) {
      console.log(e);
      throw new errors.UNEXPECTED_ERROR();
    }
  }

  public async bombLight(api: any, lights: string[]) {
    let localStorage;
    if (typeof localStorage === 'undefined' || localStorage === null) {
      localStorage = new LocalStorage('./scratch');
    }
    this.bombPlanted = true;
    while (this.bombPlanted) {
      try {

        const lastBomb: string = localStorage.getItem('lastBomb');
        let light = Utils.randomNumber(0, lights.length);

        if (lights.length > 1) {
          while (light.toString() === lastBomb) {
            light = Utils.randomNumber(0, lights.length);
          }
        }

        if (lastBomb) {
          await this.turnOff(api, parseInt(lastBomb, 10));
        }

        this.changeColor(api, lights[light], config.colors.bombPlanted);
        await localStorage.setItem('lastBomb', lights[light]);
        await Utils.sleep(1000);

      } catch (e) {
        throw e;
      }
    }
  }

  public bombDefuse() {
    this.bombPlanted = false;
  }
}
