const path = require('path');

module.exports = {
    entry: './src/client/components/app.js',
    mode: 'development',
    output: { 
        path: path.resolve(__dirname, 'dist/client')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, 
                loader: 'ts-loader'
            },
            {
                test: /\.m?js$/,
                loader: 'babel-loader'
            }
        ]
    }
}