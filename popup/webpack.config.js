const path = require('path');

module.exports = {

    entry: [
        './popup/src/scripts/index.js'
    ],

    output:{
        filename:'popup.js',
        path: path.join(__dirname, '../build'),
    },

    resolve: {
        extensions:['.js', '.jsx', '.json'],
        modules:['node_modules']
    },

    module: {
        rules:[
            {
                test: /\.(jsx|js)?$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                include: path.join(__dirname, 'src'),
                query: {
                    presets: ['env', 'react']
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader', 'postcss-loader'],
                include: path.join(__dirname, 'src')
              }
        ]
    }
}