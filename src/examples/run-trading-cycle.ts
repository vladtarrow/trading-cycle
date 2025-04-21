import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import TradingCycle from '../TradingCycle';
import defaultTradingCycle from '../presets/default-trading-cycle';
import handlers from '../handlers/index';

const csvPath = path.resolve(__dirname, './data/GALUSDT.csv');
const fileContent = fs.readFileSync(csvPath, 'utf-8');

const records = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
});

interface TickData {
  '<OPEN>': string;
  '<HIGH>': string;
  '<LOW>': string;
  '<CLOSE>': string;
  '<VOL>': string;
}

const tradingCycle = new TradingCycle(handlers, defaultTradingCycle);

records.forEach((record: TickData) => {
  const tick = {
    o: record['<OPEN>'],
    h: record['<HIGH>'],
    l: record['<LOW>'],
    c: record['<CLOSE>'],
    v: record['<VOL>'],
  };
  tradingCycle.execute(tick);
});

// eslint-disable-next-line no-console
console.log(tradingCycle);
