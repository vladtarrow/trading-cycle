import Base from './Base';

export default class Candles extends Base {
  constructor() {
    super(...arguments);
  }
  doExecute() {
    return this.v.tick;
  }
}
