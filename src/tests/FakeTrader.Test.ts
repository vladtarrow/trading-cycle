import FakeTrader from '../handlers/FakeTrader';
import { HandlerConfig, State, Values } from '../types/types';

describe('FakeTrader', () => {
  const state: State = {
    tick: { t: 1, c: 100 },
    fakeTrader: [],
  };

  const config: HandlerConfig = {
    name: 'fakeTrader',
    handler: 'FakeTrader',
    inputs: {
      input: 'input',
      tick: 'tick',
    },
    defaults: {},
  };

  it('should set price when signal is true', () => {
    const trader = new FakeTrader(state, config);

    const values: Values = {
      tick: { t: 1, c: 100 },
      input: { signal: true },
    };

    const result = trader.execute(values);
    expect(result).toBeUndefined();
  });

  it('should return delta and update cum when signal is false', () => {
    const trader = new FakeTrader(state, config);

    trader.execute({
      tick: { t: 1, c: 100 },
      input: { signal: true },
    });

    const result = trader.execute({
      tick: { t: 2, c: 110 },
      input: { signal: false },
    });

    expect(result).toEqual({
      cnt: 1,
      delta: 10,
      cum: 10,
      o: 0,
      c: 10,
      h: 10,
      l: 0,
      t: 2,
    });
  });
});
