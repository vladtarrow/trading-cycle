import Renko from '../handlers/Renko';
import { HandlerConfig, State, Values, RenkoBar } from '../types/types';

describe('Renko', () => {
  const state: State = { candle: [] };

  it('returns undefined when no candle provided', () => {
    const config: HandlerConfig = { name: 'renko', handler: 'Renko', inputs: { candle: 'candle' } };
    const handler = new Renko(state, config);
    const result = handler.execute({ tick: { t: 1, c: 100 } } as Values);
    expect(result).toBeUndefined();
  });

  it('initializes and returns renko bar on first threshold breach', () => {
    const config: HandlerConfig = {
      name: 'renko',
      handler: 'Renko',
      inputs: { candle: 'candle' },
      defaults: { size: 1, sizeLong: 1, sizeShort: 1 },
    };
    const handler = new Renko(state, config);
    const result1 = handler.execute({
      tick: { t: 1, c: 200 },
      candle: { o: 100, c: 200, h: 200, l: 100 },
    } as Values) as RenkoBar;
    expect(result1).toEqual({
      o: 100,
      c: 200,
      h: 200,
      l: 100,
      up: 0,
      down: 0,
      len: 1,
      t: 1,
      val: 1,
    });
  });

  it('does not return new bar until percent threshold is reached again', () => {
    const config: HandlerConfig = {
      name: 'renko',
      handler: 'Renko',
      inputs: { candle: 'candle' },
      defaults: { size: 1, sizeLong: 1, sizeShort: 1 },
    };
    const handler = new Renko(state, config);
    handler.execute({
      tick: { t: 1, c: 200 },
      candle: { o: 100, c: 200, h: 200, l: 100 },
    } as Values);
    const result2 = handler.execute({
      tick: { t: 2, c: 200 },
      candle: { o: 100, c: 200, h: 200, l: 100 },
    } as Values);
    expect(result2).toBeUndefined();
  });

  it('increments down count on short threshold breach', () => {
    const config: HandlerConfig = {
      name: 'renko',
      handler: 'Renko',
      inputs: { candle: 'candle' },
      defaults: { size: 1, sizeLong: 1, sizeShort: 1 },
    };
    const handler = new Renko(state, config);
    handler.execute({
      tick: { t: 1, c: 200 },
      candle: { o: 100, c: 200, h: 200, l: 100 },
    } as Values);
    const result2 = handler.execute({
      tick: { t: 2, c: 0 },
      candle: { o: 200, c: 0, h: 200, l: 0 },
    } as Values) as RenkoBar;
    expect(result2).toEqual({ o: 200, c: 0, h: 200, l: 0, up: 0, down: 1, len: 1, t: 2, val: 0 });
  });

  it('accumulates val correctly on consecutive breaches', () => {
    const config: HandlerConfig = {
      name: 'renko',
      handler: 'Renko',
      inputs: { candle: 'candle' },
      defaults: { size: 1, sizeLong: 1, sizeShort: 1 },
    };
    const handler = new Renko(state, config);
    handler.execute({
      tick: { t: 1, c: 200 },
      candle: { o: 100, c: 200, h: 200, l: 100 },
    } as Values);
    handler.execute({
      tick: { t: 2, c: 300 },
      candle: { o: 200, c: 300, h: 300, l: 200 },
    } as Values);
    const result3 = handler.execute({
      tick: { t: 3, c: 400 },
      candle: { o: 300, c: 400, h: 400, l: 300 },
    } as Values) as RenkoBar;
    expect(result3.val).toBe(2);
  });

  it('initializes and returns bar with default baseSize', () => {
    const config: HandlerConfig = { name: 'renko', handler: 'Renko', inputs: { candle: 'candle' } };
    const handler = new Renko(state, config);
    const result1 = handler.execute({
      tick: { t: 1, c: 200 },
      candle: { o: 100, c: 200, h: 200, l: 100 },
    } as Values) as RenkoBar;
    expect(result1).toEqual({
      o: 100,
      c: 200,
      h: 200,
      l: 100,
      up: 0,
      down: 0,
      len: 1,
      t: 1,
      val: 1,
    });
  });
});
