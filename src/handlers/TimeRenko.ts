import AbstractHandler from './AbstractHandler';
import { HandlerConfig, State } from '../types/types';

export default class TimeRenko extends AbstractHandler {
  private prev: { o: number; c: number; h: number; l: number; t: number };

  constructor(state: State, config: HandlerConfig) {
    super(state, config);
    this.prev = {
      o: 0,
      c: 0,
      h: 0,
      l: 0,
      t: 1,
    };
  }

  doExecute() {
    if (!this.v.input) {
      return;
    }

    const o = this.prev.c;
    const c =
      this.prev.c + (this.v.input.c > this.v.input.o ? this.v.input.len : -this.v.input.len);
    const h = Math.max(o, c);
    const l = Math.min(o, c);

    this.prev = {
      o: o,
      c: c,
      h: h,
      l: l,
      t: this.v.input.t,
    };

    return this.prev;
  }
}
