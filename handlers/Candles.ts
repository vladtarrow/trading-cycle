import AbstractHandler from './AbstractHandler';

export default class Candles extends AbstractHandler {
  constructor() {
    super(...arguments);
  }
  doExecute() {
    return this.v.tick;
  }
}
