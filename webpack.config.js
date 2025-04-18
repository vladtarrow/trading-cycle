const path = require('path');

const commonConfig = {
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true, // todo удалить
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
};

const createConfig = ({ entry, filename, library, name }, mode) => ({
  name,
  ...commonConfig,
  entry,
  output: {
    filename,
    path: path.resolve(__dirname, 'dist'),
    library,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  mode,
  devtool: mode === 'production' ? 'source-map' : 'inline-source-map',
  optimization: {
    minimize: mode === 'production',
  },
});

module.exports = (env, argv) => [
  createConfig(
    {
      name: 'light',
      entry: './src/index-light.ts',
      filename: 'trading-cycle-light.bundle.js',
      library: 'TradingCycleLight',
    },
    argv.mode
  ),
  createConfig(
    {
      name: 'full',
      entry: './src/index-full.ts',
      filename: 'trading-cycle-full.bundle.js',
      library: 'TradingCycleFull',
    },
    argv.mode
  ),
];
