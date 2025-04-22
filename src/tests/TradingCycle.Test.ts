import TradingCycle from '../TradingCycle';
import AbstractHandler from '../handlers/AbstractHandler';
import { HandlerConfig } from '../types/types';

class FakeHandler extends AbstractHandler {
  doExecute(): any {
    return { test: 'ok', t: this.v.tick.t };
  }
}

describe('TradingCycle', () => {
  const handlerClasses = {
    FakeHandler,
  };

  const preset: HandlerConfig[] = [
    {
      name: 'fake',
      handler: 'FakeHandler',
      inputs: {},
    },
  ];

  it('should register handlers and update state when executed', () => {
    const tc = new TradingCycle(handlerClasses, preset);

    const tick = { t: 123, c: 10 };

    tc.execute(tick);

    const state = (tc as any).state;
    expect(state.fake.length).toBe(1);
    expect(state.fake[0]).toEqual({ test: 'ok', t: 123 });
  });

  it('should throw if handler name is empty', () => {
    const badPreset = [{ name: '', handler: 'FakeHandler', inputs: {} }];
    expect(() => new TradingCycle(handlerClasses, badPreset as any)).toThrow(
      "No Handler's name found."
    );
  });

  it('should throw if handler name is reserved', () => {
    const badPreset = [{ name: 'tick', handler: 'FakeHandler', inputs: {} }];
    expect(() => new TradingCycle(handlerClasses, badPreset as any)).toThrow(
      "Handler's name is reserved."
    );
  });

  it('should throw if handler is already registered', () => {
    const doublePreset = [
      { name: 'dup', handler: 'FakeHandler', inputs: {} },
      { name: 'dup', handler: 'FakeHandler', inputs: {} },
    ];
    expect(() => new TradingCycle(handlerClasses, doublePreset as any)).toThrow(
      'dup already exists'
    );
  });
});
