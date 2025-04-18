import AbstractHandler from './AbstractHandler';

export default class RenkoCounter extends AbstractHandler {
  constructor() {
    super(...arguments);
    this.val = 0;
  }

  doExecute() {
    if (!this.v.candle) {
      return;
    }
    if (this.v.candle.c < this.v.candle.o) {
      this.val++;
    } else {
      this.val = 0;
    }
    return {
      val: this.val,
    };
  }
}
