import AbstractHandler from './AbstractHandler';
import { HandlerConfig, State } from "../types/types";

export default class FakeTrader extends AbstractHandler {
  private price: number | null;
  private cum: number;
  private cnt: number;

  constructor(state: State, config: HandlerConfig) {
    super(state, config);
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
      this.cnt++;
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
