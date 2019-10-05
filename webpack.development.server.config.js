const path = require('path');

module.exports = {
    entry: './src/server/index.js',
    mode: 'development',
    output: { 
        path: path.resolve(__dirname, 'dist/server')
    },
    target: 'node'
    // node: {
    //     fs: 'empty',
    //     net: 'empty'
    // }
}