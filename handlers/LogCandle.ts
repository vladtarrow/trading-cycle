import AbstractHandler from './AbstractHandler';

export default class LogCandle extends AbstractHandler {
  constructor() {
    super(...arguments);
  }

  doExecute() {
    if (!this.v.candle) {
      return;
    }
    const candle = Object.assign({}, this.v.candle);
    candle.o = Math.log(candle.o);
    candle.c = Math.log(candle.c);
    candle.h = Math.log(candle.h);
    candle.l = Math.log(candle.l);
    return candle;
  }
}
