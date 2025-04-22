import PositiveValues from '../handlers/PositiveValues';
import { HandlerConfig, State } from '../types/types';

describe('PositiveValues', () => {
  const state: State = {
    tick: { t: 0, c: 0 },
    pos: [],
  };

  const config: HandlerConfig = {
    name: 'positive',
    handler: 'PositiveValues',
    inputs: {
      input: 'input',
    },
    defaults: {},
  };

  it('should return undefined if input is missing', () => {
    const handler = new PositiveValues(state, config);
    const result = handler.execute({ tick: { t: 1, c: 100 } });
    expect(result).toBeUndefined();
  });

  it('should return undefined if there is no previous value', () => {
    const handler = new PositiveValues(state, config);
    const result = handler.execute({ tick: { t: 2, c: 100 }, input: { o: 100, c: 105, len: 1 } });
    expect(result).toBeUndefined(); // prev is undefined
  });

  it('should return undefined if current c is less than or equal to previous c', () => {
    const handler = new PositiveValues(state, config);
    handler.execute({ tick: { t: 3, c: 100 }, input: { o: 100, c: 105, len: 1 } }); // prev = 105
    const result = handler.execute({ tick: { t: 4, c: 100 }, input: { o: 100, c: 100, len: 1 } }); // 100 <= 105
    expect(result).toBeUndefined();
  });

  it('should return input if current c is greater than previous c', () => {
    const handler = new PositiveValues(state, config);
    handler.execute({ tick: { t: 5, c: 100 }, input: { o: 100, c: 100, len: 1 } }); // prev = 100
    const input = { o: 100, c: 120, len: 1 };
    const result = handler.execute({ tick: { t: 6, c: 120 }, input });
    expect(result).toBe(input);
  });
});
