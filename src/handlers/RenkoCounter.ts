import AbstractHandler from './AbstractHandler';
import { HandlerConfig, State } from '../types/types';

export default class RenkoCounter extends AbstractHandler {
  private val: number;
  constructor(state: State, config: HandlerConfig) {
    super(state, config);
    this.val = 0;
  }

  doExecute() {
    if (!this.v.candle) {
      return;
    }
    if (this.v.candle.c < this.v.candle.o) {
      this.val++;
    } else {
      this.val = 0;
    }
    return {
      val: this.val,
    };
  }
}
