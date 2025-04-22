import LogCandle from '../handlers/LogCandle';
import { HandlerConfig, State } from '../types/types';

describe('LogCandle', () => {
  const state: State = {
    tick: { t: 1, c: 100 },
    logCandle: [],
  };

  const config: HandlerConfig = {
    name: 'logCandle',
    handler: 'LogCandle',
    inputs: {
      candle: 'candle',
    },
    defaults: {},
  };

  it('should return undefined if candle is not present', () => {
    const logCandle = new LogCandle(state, config);
    const result = logCandle.execute({ tick: { t: 1, c: 100 } });
    expect(result).toBeUndefined();
  });

  it('should return candle with log-transformed o/c/h/l', () => {
    const logCandle = new LogCandle(state, config);

    const inputCandle = {
      o: 1,
      c: 100,
      h: 200,
      l: 50,
    };

    const result = logCandle.execute({
      tick: { t: 1, c: 100 },
      candle: inputCandle,
    });

    expect(result).toEqual({
      o: Math.log(1),
      c: Math.log(100),
      h: Math.log(200),
      l: Math.log(50),
    });

    expect(inputCandle).toEqual({
      o: 1,
      c: 100,
      h: 200,
      l: 50,
    });
  });
});
