import PositiveTimeLength from '../handlers/PositiveTimeLength';
import { HandlerConfig, State } from '../types/types';

describe('PositiveTimeLength', () => {
  const state: State = {
    tick: { t: 0, c: 0 },
    pos: [],
  };

  const config: HandlerConfig = {
    name: 'pos',
    handler: 'PositiveTimeLength',
    inputs: {
      input: 'input',
    },
    defaults: {},
  };

  it('should return undefined if input is missing', () => {
    const handler = new PositiveTimeLength(state, config);
    const result = handler.execute({ tick: { t: 1, c: 100 } });
    expect(result).toBeUndefined();
  });

  it('should return undefined if input.c <= input.o', () => {
    const handler = new PositiveTimeLength(state, config);
    const result = handler.execute({
      tick: { t: 2, c: 100 },
      input: { o: 120, c: 100, len: 4 },
    });
    expect(result).toBeUndefined();
  });

  it('should compute val if input.c > input.o', () => {
    const handler = new PositiveTimeLength(state, config);
    const result = handler.execute({
      tick: { t: 3, c: 150 },
      input: { o: 100, c: 120, len: 4 },
    });
    expect(result).toEqual({ val: 0.25 });
  });

  it('should accumulate val over multiple calls', () => {
    const handler = new PositiveTimeLength(state, config);
    handler.execute({ tick: { t: 1, c: 100 }, input: { o: 100, c: 110, len: 2 } }); // +0.5
    const result = handler.execute({ tick: { t: 2, c: 200 }, input: { o: 150, c: 160, len: 5 } }); // +0.2
    expect(result).toEqual({ val: 0.7 });
  });
});
