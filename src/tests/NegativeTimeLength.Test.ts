import NegativeTimeLength from '../handlers/NegativeTimeLength';
import { HandlerConfig, State } from '../types/types';

describe('NegativeTimeLength', () => {
  const state: State = {
    tick: { t: 1, c: 100 },
    neg: [],
  };

  const config: HandlerConfig = {
    name: 'neg',
    handler: 'NegativeTimeLength',
    inputs: {
      input: 'input',
    },
    defaults: {},
  };

  it('should return undefined if input is missing', () => {
    const handler = new NegativeTimeLength(state, config);
    const result = handler.execute({ tick: { t: 1, c: 100 } });
    expect(result).toBeUndefined();
  });

  it('should return undefined if input.c >= input.o', () => {
    const handler = new NegativeTimeLength(state, config);
    const result = handler.execute({
      tick: { t: 2, c: 101 },
      input: { o: 50, c: 100, len: 10 },
    });
    expect(result).toBeUndefined();
  });

  it('should calculate and return incremented value if input.c < input.o', () => {
    const handler = new NegativeTimeLength(state, config);

    const input = { o: 100, c: 50, len: 10 }; // c < o
    const result = handler.execute({ tick: { t: 3, c: 102 }, input });

    expect(result).toEqual({ val: 0.1 });

    const second = handler.execute({ tick: { t: 4, c: 103 }, input });
    expect(second).toEqual({ val: 0.2 });
  });
});
