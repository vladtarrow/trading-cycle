import { HandlerClassMap, HandlerConfig, State, Values } from './types/types';
import AbstractHandler from './handlers/AbstractHandler';

export default class TradingCycle {
  private readonly handlers: Record<string, AbstractHandler>;
  private readonly handlerClasses: HandlerClassMap;
  public state: State;

  constructor(handlerClasses: HandlerClassMap, preset: HandlerConfig[]) {
    this.handlers = {};
    this.state = {};
    this.handlerClasses = handlerClasses;

    preset.forEach((handler: HandlerConfig) => {
      this.#register(handler);
    });
  }

  #register(handler: HandlerConfig): void {
    this.#checkRegistration(handler);
    this.handlers[handler.name] = <AbstractHandler>(
      new this.handlerClasses[handler.handler](this.state, handler)
    );
    this.state[handler.name] = [];
  }

  execute(tick: any): void {
    const values: Values = { tick };
    Object.keys(this.handlers).forEach((name) => {
      const handler = this.handlers[name];
      values[name] = handler.execute(values);
      if (values[name]) {
        this.state[name].push(values[name]);
      }
    });
  }

  #checkRegistration(handler: HandlerConfig): void {
    if (!handler.name.trim().length) {
      throw new Error(`No Handler's name found.`);
    }
    if (handler.name === 'tick') {
      throw new Error(`Handler's name is reserved.`);
    }
    if (this.handlers[handler.name]) {
      throw new Error(`${handler.name} already exists`);
    }
  }
}
