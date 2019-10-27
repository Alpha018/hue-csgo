import { RequestCounter } from '../apps/types/models';

export class Utils {
  static getStatus(playStat: RequestCounter) {
    const result = {
      phase: '',
      extra: '',
    };

    if (playStat.round && playStat.round.phase === 'over') {
      result.phase = playStat.round.phase;
      result.extra = playStat.round.win_team;
      return result;
    }

    if (playStat.round && playStat.round.bomb) {
      result.phase = playStat.round.bomb;
      return result;
    }

    if (playStat.round && playStat.round.phase === 'freezetime') {
      result.phase = playStat.round.phase;
      return result;
    }

    if ((playStat.player.team === 'T' || playStat.player.team === 'CT')
      && playStat.player.activity === 'playing') {
      result.phase = playStat.player.team;
      return result;
    }
    return result;
  }

  static hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null;
  }

  static sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (+max - +min)) + +min;
  }
}
