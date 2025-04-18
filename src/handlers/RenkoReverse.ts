import AbstractHandler from './AbstractHandler';

export default class RenkoReverse extends AbstractHandler {
  constructor() {
    super(...arguments);
    this.brickSizeLong = this.defaults.sizeLong || this.defaults.size;
    this.brickSizeShort = this.defaults.sizeShort || this.defaults.size;
    this.reverse = this.defaults.reverse || 1;
    this.isPrevLong = false;
    this.isPrevShort = false;
    this.prevRange = 0;
    this.renko = null;
  }

  doExecute() {
    if (!this.v.candle) {
      return;
    }
    if (this.renko) {
      this.renko.len++;
      this.renko.c = this.v.candle.c;
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
        up: 0,
        down: 0,
        len: 1,
      };
    }

    const max = Math.max(this.renko.c, this.renko.o);
    const min = Math.min(this.renko.c, this.renko.o);

    const percentChange = Math.abs(max - min) / min;

    const isLong = this.renko.c > this.renko.o;
    const isShort = this.renko.c < this.renko.o;

    const brickSizeLong =
      this.isPrevShort && isLong ? this.prevRange * this.reverse : this.brickSizeLong;
    const brickSizeShort =
      this.isPrevLong && isShort ? this.prevRange * this.reverse : this.brickSizeShort;

    const isLongChange = isLong && percentChange >= brickSizeLong;
    const isShortChange = isShort && percentChange >= brickSizeShort;

    if (isLongChange || isShortChange) {
      const renko = this.renko;
      renko.t = this.v.tick.t;
      renko.h = Math.max(renko.o, renko.c);
      renko.l = Math.min(renko.o, renko.c);
      // renko.len = 1/renko.len;
      this.renko = {
        o: renko.c,
        c: renko.c,
        len: 1,
        up: 0,
        down: 0,
        t: this.v.tick.t,
      };
      this.isPrevLong = renko.c > renko.o;
      this.isPrevShort = renko.c < renko.o;
      this.prevRange = Math.abs(renko.c - renko.o) / Math.min(renko.c, renko.o);
      return renko;
    }
  }
}
