import TestLogic from '../handlers/TestLogic';
import { HandlerConfig, State, Values } from '../types/types';

describe('TestLogic', () => {
  const config: HandlerConfig = {
    name: 'testLogic',
    handler: 'TestLogic',
    inputs: { candle: 'candle' },
    defaults: {},
  };

  it('returns undefined when renko length is less than 10', () => {
    const state: State = { candle: Array(5).fill({ o: 0, c: 1 }) };
    const handler = new TestLogic(state, config);
    const result = handler.execute({ tick: { t: 1, c: 0 } } as Values);
    expect(result).toBeUndefined();
  });

  it('returns signal when renko length >= 10 and last bar meets conditions', () => {
    const bars = Array(10)
      .fill({ o: 100, c: 101 })
      .map((b, i) => ({ ...b, o: b.o + i, c: b.c + i }));
    const state: State = { candle: bars };
    const handler = new TestLogic(state, config);
    const result = handler.execute({ tick: { t: 2, c: 0 } } as Values);
    expect(result).toEqual({ signal: true });
  });

  it('returns signal on second call when started and no input candle', () => {
    const bars = Array(10).fill({ o: 100, c: 101 });
    const state: State = { candle: bars };
    const handler = new TestLogic(state, config);
    handler.execute({ tick: { t: 3, c: 0 } } as Values);
    const result = handler.execute({ tick: { t: 4, c: 0 } } as Values);
    expect(result).toEqual({ signal: true });
  });

  it('returns undefined when last bar does not meet conditions', () => {
    const bars = Array(10).fill({ o: 100, c: 105 });
    const state: State = { candle: bars };
    const handler = new TestLogic(state, config);
    const result = handler.execute({ tick: { t: 5, c: 0 } } as Values);
    expect(result).toBeUndefined();
  });
});
