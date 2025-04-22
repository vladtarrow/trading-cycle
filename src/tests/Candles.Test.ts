import Candles from '../handlers/Candles';
import { HandlerConfig, State, Values } from '../types/types';

describe('Candles', () => {
  const state: State = {
    tick: { t: 123, c: 10 },
    candles: [{ t: 1 }, { t: 2 }],
  };

  const config: HandlerConfig = {
    name: 'candles',
    handler: 'Candles',
    inputs: {
      tick: 'tick',
    },
    defaults: {},
  };

  it('should return tick from values and access calculated', () => {
    const handler = new Candles(state, config);
    const values: Values = { tick: { t: 123, c: 10 } };

    const result = handler.execute(values);
    expect(result).toEqual({ t: 123, c: 10 });

    expect(handler.calculated).toEqual(state.candles);
  });
});
