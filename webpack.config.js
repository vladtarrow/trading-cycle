const path = require('path')

module.exports = {
    entry: {
        index: "./index.js",
    },
    output: {
        filename: "[name].analyser.bundle.js",
        path: path.resolve(__dirname, "dist"),
        library: 'Analyser',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    mode: 'development',
}