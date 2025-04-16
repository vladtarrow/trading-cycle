const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './index.ts',
    output: {
        filename: '[name].trading-cycle.bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'TradingCycle',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
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
                        transpileOnly: true, // todo remove
                    },
                },
                exclude: /node_modules/,
            },
        ],
    },
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    optimization: {
        minimize: isProduction,
    },
};
