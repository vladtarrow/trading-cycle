import AbstractHandler from './AbstractHandler';
import { HandlerConfig, RenkoBar, State } from '../types/types';

export default class Renko extends AbstractHandler {
  private brickSizeLong: number;
  private brickSizeShort: number;
  private renko: RenkoBar | null;
  private val: number;

  constructor(state: State, config: HandlerConfig) {
    super(state, config);

    const defaults = this.defaults ?? {};
    const baseSize = defaults.size ?? 1;

    this.brickSizeLong = (defaults.sizeLong ?? baseSize) as number;
    this.brickSizeShort = (defaults.sizeShort ?? baseSize) as number;

    this.renko = null;
    this.val = 0;
  }

  doExecute(): RenkoBar | void {
    if (!this.v.candle) {
      return;
    }

    if (this.renko) {
      this.renko.len++;
      this.renko.c = this.v.candle.c;
      this.renko.h = Math.max(this.renko.h, this.v.candle.h);
      this.renko.l = Math.min(this.renko.l, this.v.candle.l);
      if (this.v.candle.c > this.renko.o) {
        this.renko.up++;
      }
      if (this.v.tick.c < this.renko.o) {
        this.renko.down++;
      }
    } else {
      this.renko = {
        o: this.v.candle.o,
        c: this.v.candle.c,
        h: this.v.candle.h,
        l: this.v.candle.l,
        up: 0,
        down: 0,
        len: 1,
      };
    }

    const max = Math.max(this.renko.c, this.renko.o);
    const min = Math.min(this.renko.c, this.renko.o);
    const percentChange = Math.abs(max - min) / min;

    const isLong = this.renko.c > this.renko.o && percentChange >= this.brickSizeLong;
    const isShort = this.renko.c < this.renko.o && percentChange >= this.brickSizeShort;

    if (isLong || isShort) {
      const renko = this.renko;
      renko.t = this.v.tick.t;
      this.val = this.val + (renko.c > renko.o ? 1 : -1);
      renko.val = this.val;

      this.renko = {
        o: renko.c,
        c: renko.c,
        h: renko.c,
        l: renko.c,
        len: 0,
        up: 0,
        down: 0,
        t: this.v.tick.t,
        val: this.val,
      };

      return renko;
    }
  }
}
