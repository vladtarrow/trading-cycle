import AbstractHandler from './AbstractHandler';
import {HandlerConfig, State, Values} from "../types/types";

export default class NegativeValues extends AbstractHandler {
  private prev: Values | undefined;
  constructor(state: State, config: HandlerConfig) {
    super(state, config);
    this.prev = undefined;
  }

  doExecute() {
    if (!this.v.input) {
      return;
    }
    const negative = this.prev && this.v.input.c < this.prev.c;
    this.prev = this.v.input;
    if (negative) {
      return this.v.input;
    }
  }
}
