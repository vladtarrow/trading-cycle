import Base from './Base';

export default class TimeRenko extends Base {
  constructor() {
    super(...arguments);
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
