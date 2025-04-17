import type { HandlerConfig, State, Values } from '../types/types';

export default abstract class AbstractHandler {
  protected defaults?: Record<string, unknown>;
  protected name: string;
  protected _inputs: Record<string, string>;
  protected _state: State;
  protected _v: Values;
  protected _s: Record<string, any>;

  constructor(state: State, handler: HandlerConfig) {
    this.defaults = handler.defaults;
    this.name = handler.name;
    this._inputs = handler.inputs;
    this._state = state;
    this._v = {};
    this._s = {};
  }

  get calculated(): any[] {
    return this._state[this.name];
  }

  get v(): Values {
    return this._v;
  }

  get s(): Record<string, any> {
    return this._s;
  }

  execute(values: Values): any {
    this._v = {
      tick: values.tick,
    };
    this._s = {};
    Object.entries(this._inputs).forEach(([alias, real]) => {
      this._v[alias] = values[real];
      this._s[alias] = this._state[real];
    });
    return this.doExecute();
  }

  protected abstract doExecute(): any;
}
