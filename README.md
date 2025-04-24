# Trading Cycle

[![npm version](https://img.shields.io/npm/v/trading-cycle.svg)](https://www.npmjs.com/package/trading-cycle)  [![Build Status](https://github.com/vladtarrow/trading-cycle/actions/workflows/ci.yml/badge.svg)](https://github.com/vladtarrow/trading-cycle/actions)  [![Coverage Status](https://coveralls.io/repos/github/vladtarrow/trading-cycle/badge.svg?branch=main)](https://coveralls.io/github/vladtarrow/trading-cycle?branch=main)  [![code style: prettier](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

[![bundle size](https://badgen.net/bundlephobia/min/trading-cycle)](https://bundlephobia.com/package/trading-cycle)  [![bundle minzipped size](https://badgen.net/bundlephobia/minzip/trading-cycle)](https://bundlephobia.com/package/trading-cycle)  [![dependencies](https://badgen.net/bundlephobia/dependency-count/trading-cycle)](https://bundlephobia.com/package/trading-cycle)  [![tree shaking supported](https://badgen.net/bundlephobia/tree-shaking/trading-cycle)](https://bundlephobia.com/package/trading-cycle)

A lightweight, modular core library designed for backtesting trading strategies in financial markets.

## Installation

Install the full or light version depending on your use case:

```bash
# Full version (with built-in indicators and helpers)
npm install trading-cycle

# Light version (core only)
npm install trading-cycle
```

## Usage

### Full Version

```ts
import { TradingCycle } from 'trading-cycle/full';
```

### Light Version

```ts
import { TradingCycle } from 'trading-cycle/light';
```

## Versions

- **Full**: Includes core, built-in indicators, helpers, and utility functions.
- **Light**: Contains only the core functionality — `TradingCycle` class and abstract handler interfaces.

## Built-in Handlers

Trading Cycle ships with a set of predefined handlers you can use out of the box:

```
  Candles,
  PositiveValues,
  NegativeValues,
  Renko,
  TimeRenko,
  TestLogic,
  PositiveTimeLength,
  NegativeTimeLength,
  FakeTrader,
  LogCandle,
  RenkoCounter
```

## Default Preset Configuration

A default preset is provided under `trading-cycle/config`, pre-wiring common handlers with sensible defaults (e.g. Renko bar size of 0.05):

```ts
import defaultPreset from 'trading-cycle/config';
```

This preset includes handlers such as:
- `candles`
- `log-candles`
- `renko-0.05`
- `time-renko`
- `renko-counter`
- `test-logic`
- `fake-trader`

Customize or extend it by supplying your own `HandlerConfig[]` when creating `TradingCycle`.

## Handler Example

Below is a concise description of a custom handler, illustrating how you can extend the core functionality:

1. **Class Declaration**  
   Create a class that extends `AbstractHandler`.
2. **Internal State**  
   Define private fields (e.g., `prev`) to store data between ticks.
3. **Constructor**  
   Call `super(state, config)` to initialize base properties and set up your own fields.
4. **Override `doExecute()`**
   - Access input values via `this.v` and stored state via `this._s`.
   - Implement your logic (e.g., detect when the current close is lower than the previous close).
   - Update internal state (`this.prev = this.v.input;`).
   - Return a result only when the condition is met.

**NegativeValues** handler example (pseudocode):

> Extends `AbstractHandler`, tracks the previous candle in `prev`, and returns the current candle when its close is less than the previous close.

## Example: Backtest from CSV

A quick outline to run a backtest with CSV data:

```ts
import TradingCycle from 'trading-cycle';
import handlers from 'trading-cycle/full';
import defaultPreset from 'trading-cycle/config';

// Initialize the cycle
const cycle = new TradingCycle(handlers, defaultPreset);

// Load your CSV into `ticks: Array<{ o, h, l, c, v }>`
// e.g. via `csv-parse` or any CSV loader

ticks.forEach(tick => cycle.execute(tick));

// Inspect results
console.log(cycle.state);
```

## API Overview

- `new TradingCycle(handlerClasses: Record<string, HandlerConstructor>, preset: HandlerConfig[])` — Create a cycle with provided handlers and configuration presets.
- `execute(tick: any): void` — Run all handlers on a single market tick; results accumulate in `cycle.state`.
- `cycle.state: Record<string, any[]>` — Current output arrays for each handler.

## Design Philosophy

- **Modularity**: Handlers are self-contained units; you can add, remove or customize them without affecting others.
- **Flexibility**: Presets define the pipeline; you control data flow by composing inputs and defaults.
- **Simplicity**: Core abstractions (`TradingCycle`, `AbstractHandler`) remain minimal and clear.

## License

MIT

## Author

[Vladyslav Tarasenko](https://github.com/vladtarrow)

