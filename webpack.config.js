import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));

const webpackConfig = {
    entry: './src/console-app.ts',
    resolve: {
        extensions: ['.js', '.ts'],
        preferRelative: true,
    },
    output: {
        filename: 'main.js',
        path: resolve(__dirname, 'dist'),
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
}

if (process.env.APP_TARGET === 'node') {
    webpackConfig.target = 'node'
}
webpackConfig.mode = 'production'
if (process.env.APP_ENV === 'local') {
    webpackConfig.mode = 'development'
    webpackConfig.optimization = {
        minimize: false,
    }
}

export default webpackConfig
