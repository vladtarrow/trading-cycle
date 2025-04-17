import AbstractHandler from './AbstractHandler';

export default class FakeTrader extends AbstractHandler {
  constructor() {
    super(...arguments);
    this.price = null;
    this.cum = 0;
    this.cnt = 0;
  }

  doExecute() {
    if (this.v.input && this.v.input.signal && typeof this.price !== 'number') {
      this.price = this.v.tick.c;
    }
    if ((!this.v.input || !this.v.input.signal) && typeof this.price === 'number') {
      const delta = this.v.tick.c - this.price;
      const cum = this.cum;
      this.cum += delta;
      this.cnt++; // = delta > 0 ? this.cnt+1:this.cnt-1;
      this.price = null;
      return {
        cnt: this.cnt,
        delta: delta,
        cum: this.cum,
        o: cum,
        c: this.cum,
        h: Math.max(this.cum, cum),
        l: Math.min(this.cum, cum),
        t: this.v.tick.t,
      };
    }
  }
}
