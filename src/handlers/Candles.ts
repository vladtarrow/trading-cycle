import AbstractHandler from './AbstractHandler';

export default class Candles extends AbstractHandler {
  doExecute() {
    return this.v.tick;
  }
}
