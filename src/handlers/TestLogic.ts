import AbstractHandler from './AbstractHandler';

export default class TestLogic extends AbstractHandler {
  private started = false;

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
      Math.abs(renko[renko.length - 1].c - renko[renko.length - 1].o) < 2
    ) {
      this.started = true;
      return {
        signal: true,
      };
    }
    this.started = false;
  }
}
