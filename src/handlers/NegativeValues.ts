import AbstractHandler from './AbstractHandler';

export default class NegativeValues extends AbstractHandler {
  constructor() {
    super(...arguments);
    this.prev = undefined;
  }

  doExecute() {
    if (!this.v.input) {
      return;
    }
    const negative = !!(this.prev && this.v.input.c < this.prev.c);
    this.prev = this.v.input;
    if (negative) {
      return this.v.input;
    }
  }
}
