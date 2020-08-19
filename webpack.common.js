const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry:{
        'bundle.js': './public/main.ts',
        // 'bundle.js': ['./public/main.ts','./public/tex.ts']
        // 'bundle2.js': './public/tex.ts'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.ts$/i,
                use:'ts-loader',
                exclude:'/node_modules/'
            },{

                test: /\.jsx?$/i,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader'
                }]

            },
            {
                test:/\.css$/i,
                exclude:/node_modules/,
                use: ['style-loader','css-loader']
            }
        ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        new HTMLWebpackPlugin({
            template:path.resolve(__dirname,'public','index.html')
        })
    ]
}