# Trading Cycle

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
import {
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
} from 'trading-cycle/full';
```

### Light Version

```ts
import { TradingCycle } from 'trading-cycle/light';
```

## Versions

- **Full**: Includes core, built-in indicators, helpers, and utility functions.
- **Light**: Contains only the core — `TradingCycle` class and abstract handler interfaces.

## Built-in Handlers

Trading Cycle ships with a set of predefined handlers you can use out of the box:

- Candles
- PositiveValues
- NegativeValues
- Renko
- TimeRenko
- TestLogic
- PositiveTimeLength
- NegativeTimeLength
- FakeTrader
- LogCandle
- RenkoCounter

These handlers cover common data transformations (e.g., raw candles, logarithmic candles), Renko bar generation, simple logic examples, and a fake trading simulation.

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

## License

MIT

## Author

[Vladyslav Tarasenko](https://github.com/vladtarrow)
