import AbstractHandler from './AbstractHandler';

export default class NegativeTimeLength extends AbstractHandler {
  constructor() {
    super(...arguments);
    this.prev = undefined;
    this.val = 0;
  }

  doExecute() {
    if (!this.v.input) {
      return;
    }

    if (this.v.input.c < this.v.input.o) {
      this.val = this.val + 1 / this.v.input.len;
      return {
        val: this.val,
      };
    }
  }
}
