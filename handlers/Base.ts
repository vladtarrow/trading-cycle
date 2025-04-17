export default class Base {
  constructor(state, handler) {
    this.defaults = handler.defaults;
    this.name = handler.name;
    this._inputs = handler.inputs;
    this._state = state;
    this._v = {};
    this._s = {};
  }

  get calculated() {
    return this._state[this.name];
  }

  get v() {
    return this._v;
  }

  get s() {
    return this._s;
  }

  execute(values) {
    this._v = {
      tick: values.tick,
    };
    this._s = {};
    Object.entries(this._inputs).forEach((input) => {
      this._v[input[0]] = values[input[1]];
      this._s[input[0]] = this._state[input[1]];
    });
    return this.doExecute();
  }

  doExecute() {
    throw new Error('doExecute not implemented!');
  }
}
