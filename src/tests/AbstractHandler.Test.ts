import { HandlerConfig, State, Values } from '../types/types';
import AbstractHandler from '../handlers/AbstractHandler';

class TestHandler extends AbstractHandler {
  protected doExecute(): any {
    return { result: 'done', tickTime: this.v.tick.t };
  }

  public getName(): string {
    return this.name;
  }
}

describe('AbstractHandler', () => {
  const state: State = {
    fake: [],
    tick: { t: 123, c: 10 },
  };
  const handlerConfig: HandlerConfig = {
    name: 'testHandler',
    handler: 'TestHandler',
    inputs: {
      tickTime: 'tick',
    },
    defaults: {},
  };

  it('should initialize correctly', () => {
    const handler = new TestHandler(state, handlerConfig);

    expect(handler.getName()).toBe('testHandler');
    expect(handler.v).toEqual({});
    expect(handler.s).toEqual({});
  });

  it('should correctly execute and update state', () => {
    const handler = new TestHandler(state, handlerConfig);

    const values: Values = { tick: { t: 123, c: 10 } };
    const result = handler.execute(values);

    expect(result).toEqual({ result: 'done', tickTime: 123 });

    expect(handler.v).toEqual({ tick: { t: 123, c: 10 }, tickTime: { t: 123, c: 10 } });
    expect(handler.s).toEqual({ tickTime: { t: 123, c: 10 } });
  });

  it('should correctly handle inputs and state updates', () => {
    const handler = new TestHandler(state, handlerConfig);

    const values: Values = { tick: { t: 100, c: 20 } };
    const result = handler.execute(values);

    expect(result).toEqual({ result: 'done', tickTime: 100 });
    expect(handler.v).toEqual({ tick: { t: 100, c: 20 }, tickTime: { t: 100, c: 20 } });
    expect(handler.s).toEqual({ tickTime: { t: 123, c: 10 } });
  });

  it('should return calculated values from state', () => {
    const handler = new TestHandler(state, handlerConfig);

    expect(handler.calculated).toEqual(state[handlerConfig.name]);
  });
});
