import handlers from './handlers/index';

export default class TradingCycle {
  constructor(preset) {
    this.handlers = {};
    this.state = {};
    preset.forEach((handler) => {
      this.#register(handler);
    });
  }

  #register(handler) {
    this.#checkRegistration(handler);
    this.#checkRequiredHandlers(handler);
    this.handlers[handler.name] = new handlers[handler.handler](this.state, handler);
    this.state[handler.name] = [];
    console.log(`${handler.name} has been registered.`);
  }

  execute(tick) {
    const values = {
      tick,
    };
    Object.keys(this.handlers).forEach((name) => {
      const Handler = this.handlers[name];
      values[name] = Handler.execute(values);
      if (!!values[name]) {
        this.state[name].push(values[name]);
      }
    });
  }

  #checkRegistration(handler) {
    if (typeof handler.name !== 'string' || !handler.name.trim().length) {
      throw new Error(`No Handler's name found.`);
    }
    if (handler.name === 'tick') {
      throw new Error(`Handler's name is reserved.`);
    }
    if (this.handlers[handler.name]) {
      throw new Error(`${handler.name} already exists`);
    }
  }

  #checkRequiredHandlers(handler) {
    const registeredHandlers = Object.keys(this.handlers);
    const requiredHandlers = Object.values(handler.inputs);
    requiredHandlers.forEach((handlerName) => {
      if (!registeredHandlers.includes(handlerName) && handlerName !== 'tick') {
        // throw new Error(`${handlerName} has not registered for ${handler.name}`);
      }
    });
  }
}
