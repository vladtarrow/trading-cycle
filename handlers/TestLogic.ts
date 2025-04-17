import AbstractHandler from './AbstractHandler';

export default class TestLogic extends AbstractHandler {
  constructor() {
    super(...arguments);
  }

  doExecute() {
    const renko = this.s.candle;
    if (renko && renko.length < 10) {
      return;
    }

    if (this.started && !this.v.candle) {
      return {
        signal: true,
      };
    }

    if (
      renko[renko.length - 1].c > renko[renko.length - 1].o &&
      Math.abs(renko[renko.length - 1].c - renko[renko.length - 1].o) < 2 // &&
      // renko[renko.length - 2].c < renko[renko.length - 2].o &&
      // Math.abs(renko[renko.length - 2].c - renko[renko.length - 2].o) < 10
      // ((renko[renko.length - 1].h- renko[renko.length - 1].o)  / (renko[renko.length - 1].c- renko[renko.length - 1].l)) < 2
      //  ((renko[renko.length - 1].o- renko[renko.length - 1].c)  >  (renko[renko.length - 1].c- renko[renko.length - 1].l))
    ) {
      this.started = true;
      return {
        signal: true,
      };
    }
    this.started = false;
  }
}
