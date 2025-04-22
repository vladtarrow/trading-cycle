import TimeRenko from '../handlers/TimeRenko';
import { HandlerConfig, State } from '../types/types';

describe('TimeRenko', () => {
  const state: State = {
    tick: { t: 0, c: 0 },
    pos: [],
  };

  const config: HandlerConfig = {
    name: 'timeRenko',
    handler: 'TimeRenko',
    inputs: {
      input: 'input',
    },
    defaults: {},
  };

  it('should calculate new renko values when input is provided', () => {
    const handler = new TimeRenko(state, config);

    // Simulate input with a candle where close is greater than open
    const result = handler.execute({
      tick: { t: 1, c: 110 },
      input: { o: 100, c: 110, h: 112, l: 99, len: 10, t: 1 },
    });

    // Check if calculated values match the expected ones
    expect(result).toEqual({
      o: 0, // Previous close is now the open
      c: 10, // Close increases by len (10)
      h: 10, // Max of open and close
      l: 0, // Min of open and close
      t: 1, // The time is the same as the input time
    });
  });

  it('should calculate new renko values when input has a lower close', () => {
    const handler = new TimeRenko(state, config);

    // Simulate input with a candle where close is less than open
    const result = handler.execute({
      tick: { t: 1, c: 100 },
      input: { o: 110, c: 100, h: 112, l: 99, len: 10, t: 1 },
    });

    // Check if calculated values match the expected ones
    expect(result).toEqual({
      o: 0, // Previous close is still the open
      c: -10, // Close decreases by len (10)
      h: 0, // Max of open and close
      l: -10, // Min of open and close
      t: 1, // The time remains the same
    });
  });

  it('should update previous values correctly after each execution', () => {
    const handler = new TimeRenko(state, config);

    // First execution with a positive change
    handler.execute({
      tick: { t: 1, c: 100 },
      input: { o: 90, c: 100, h: 110, l: 80, len: 10, t: 1 },
    });

    // Second execution with a negative change
    const result = handler.execute({
      tick: { t: 2, c: 110 },
      input: { o: 100, c: 90, h: 105, l: 85, len: 10, t: 2 },
    });

    // Ensure previous values were updated correctly
    expect(result).toEqual({
      o: 10, // Previous close is now the open
      c: 0, // Close decreases by len (10)
      h: 10, // Max of open and close
      l: 0, // Min of open and close
      t: 2, // The time updates to 2
    });
  });

  it('should not return any value if input is missing', () => {
    const handler = new TimeRenko(state, config);

    // Execute without input
    const result = handler.execute({
      tick: { t: 1, c: 100 },
    });

    // Should return nothing since input is missing
    expect(result).toBeUndefined();
  });
});
