import type { HandlerConfig } from '../types/types';

const handlers: HandlerConfig[] = [
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
      size: 0.05,
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
    name: 'renko-counter',
    handler: 'RenkoCounter',
    defaults: {},
    inputs: {
      candle: 'renko-0.05',
    },
  },
  {
    name: 'test-logic',
    handler: 'TestLogic',
    inputs: {
      candle: 'renko-0.05',
    },
  },
  {
    name: 'fake-trader',
    handler: 'FakeTrader',
    inputs: {
      input: 'test-logic',
    },
  },
];

export default handlers;
