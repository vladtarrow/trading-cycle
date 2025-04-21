import AbstractHandler from './AbstractHandler';
import { HandlerConfig, State } from '../types/types';

export default class PositiveValues extends AbstractHandler {
  private prev: undefined;
  constructor(state: State, config: HandlerConfig) {
    super(state, config);
    this.prev = undefined;
  }

  doExecute() {
    if (!this.v.input) {
      return;
    }
    const positive = !!(this.prev && this.v.input.c > this.prev.c);
    this.prev = this.v.input;
    if (positive) {
      return this.v.input;
    }
  }
}
