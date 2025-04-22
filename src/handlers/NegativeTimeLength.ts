import AbstractHandler from './AbstractHandler';
import { HandlerConfig, State, Values } from '../types/types';

export default class NegativeTimeLength extends AbstractHandler {
  private prev: Values | undefined;
  private val: number;
  constructor(state: State, config: HandlerConfig) {
    super(state, config);
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
