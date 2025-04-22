import TimeRenko from '../handlers/TimeRenko';
import { State, HandlerConfig, Values } from '../types/types';

describe('TimeRenko', () => {
  const state: State = {};
  const config: HandlerConfig = {
    name: 'time-renko',
    handler: 'TimeRenko',
    inputs: { input: 'input' },
    defaults: {},
  };

  it('returns correct state after one execution', () => {
    const handler = new TimeRenko(state, config);
    const result = handler.execute({
      tick: { t: 1, c: 0 },
      input: { o: 0, c: 100, h: 0, l: 0, len: 100, t: 1 },
    } as unknown as Values);
    expect(result).toEqual({ o: 0, c: 100, h: 100, l: 0, t: 1 });
  });

  it('returns correct state after consecutive executions', () => {
    const handler = new TimeRenko(state, config);
    handler.execute({
      tick: { t: 1, c: 0 },
      input: { o: 0, c: 100, h: 0, l: 0, len: 100, t: 1 },
    } as unknown as Values);
    const result = handler.execute({
      tick: { t: 2, c: 0 },
      input: { o: 0, c: 100, h: 0, l: 0, len: 100, t: 2 },
    } as unknown as Values);
    expect(result).toEqual({ o: 100, c: 200, h: 200, l: 100, t: 2 });
  });

  it('updates prev values after multiple executions', () => {
    const handler = new TimeRenko(state, config);
    handler.execute({
      tick: { t: 1, c: 0 },
      input: { o: 0, c: 100, h: 0, l: 0, len: 100, t: 1 },
    } as unknown as Values);
    handler.execute({
      tick: { t: 2, c: 0 },
      input: { o: 0, c: 100, h: 0, l: 0, len: 100, t: 2 },
    } as unknown as Values);
    const result = handler.execute({
      tick: { t: 3, c: 0 },
      input: { o: 0, c: 100, h: 0, l: 0, len: 100, t: 3 },
    } as unknown as Values);
    expect(result).toEqual({ o: 200, c: 300, h: 300, l: 200, t: 3 });
  });
});
