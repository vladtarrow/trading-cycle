export default [
  {
    name: 'candles',
    handler: 'Candles',
    defaults: {},
    inputs: {},
  },
  {
    name: 'log-candles',
    handler: 'LogCandle',
    defaults: {},
    inputs: {
      candle: 'candles',
    },
  },
  {
    name: 'renko-0.05',
    handler: 'Renko',
    defaults: {
      size: 0.00003,
      // sizeLong: 0.02,
      // sizeShort: 0.01,
      // reverse: 2,
    },
    inputs: {
      candle: 'candles',
    },
  },
  {
    name: 'time-renko',
    handler: 'TimeRenko',
    defaults: {},
    inputs: {
      input: 'renko-0.05',
    },
  },
  {
    name: 'renko-0.05-2',
    handler: 'Renko',
    defaults: {
      size: 0.02,
      // sizeLong: 0.02,
      // sizeShort: 0.01,
      // reverse: 2,
    },
    inputs: {
      candle: 'time-renko',
    },
  },
  {
    name: 'renko-0.05-p',
    handler: 'PositiveValues',
    defaults: {},
    inputs: {
      candle: 'renko-0.05',
    },
  },
  {
    name: 'renko-counter',
    handler: 'RenkoCounter',
    defaults: {},
    inputs: {
      candle: 'renko-0.05',
    },
  },
  {
    name: 'test-diff',
    handler: 'TestDiff',
    defaults: {},
    inputs: {
      candle: 'renko-0.05',
    },
  },
  {
    name: 'test-logic',
    handler: 'TestLogic',
    inputs: {
      candle: 'renko-0.05-2',
    },
  },
  {
    name: 'fake-trader-1',
    handler: 'FakeTrader',
    inputs: {
      input: 'test-logic',
    },
  },
  {
    name: 'test-logic-2',
    handler: 'TestLogic2',
    inputs: {
      candle: 'renko-0.05',
      signal: 'test-logic',
    },
  },
];
