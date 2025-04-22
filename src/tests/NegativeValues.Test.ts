import NegativeValues from '../handlers/NegativeValues';
import { HandlerConfig, State } from '../types/types';

describe('NegativeValues', () => {
  const state: State = {
    tick: { t: 1, c: 100 },
    neg: [],
  };

  const config: HandlerConfig = {
    name: 'neg',
    handler: 'NegativeValues',
    inputs: {
      input: 'input',
    },
    defaults: {},
  };

  it('should return undefined if input is missing', () => {
    const handler = new NegativeValues(state, config);
    const result = handler.execute({ tick: { t: 1, c: 100 } });
    expect(result).toBeUndefined();
  });

  it('should return undefined on first valid input (no previous value)', () => {
    const handler = new NegativeValues(state, config);
    const result = handler.execute({
      tick: { t: 2, c: 105 },
      input: { c: 200 },
    });
    expect(result).toBeUndefined();
  });

  it('should return undefined when current c is equal or greater than previous', () => {
    const handler = new NegativeValues(state, config);
    handler.execute({ tick: { t: 1, c: 100 }, input: { c: 150 } });
    const result = handler.execute({ tick: { t: 2, c: 100 }, input: { c: 150 } });
    expect(result).toBeUndefined();
  });

  it('should return input when current c is less than previous', () => {
    const handler = new NegativeValues(state, config);
    handler.execute({ tick: { t: 1, c: 100 }, input: { c: 150 } }); // first input
    const result = handler.execute({ tick: { t: 2, c: 101 }, input: { c: 140 } }); // decrease
    expect(result).toEqual({ c: 140 });
  });
});
