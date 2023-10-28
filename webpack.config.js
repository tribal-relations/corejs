const path = require('path');

let mode = 'production'

if (process.env.APP_ENV === 'local') {
    mode = 'development';
}

module.exports = {
    mode: 'production',
    entry: './src/console-app.ts',
    resolve: {
        extensions: ['.js', '.ts'],
        preferRelative: true,
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     loader: 'babel',
            // },
            { test: /\.css$/, use: 'css-loader' },
            { test: /\.ts$/, use: 'ts-loader' },
        ],
    },
    target: 'node'
};