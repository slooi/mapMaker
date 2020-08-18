const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    mode:'development',
    devServer:{
        hot:true,
    },
    entry:{
        'bundle.js': ['./public/main.ts','./public/tex.ts']
        // 'bundle2.js': './public/tex.ts'
    },
    //path.resolve(__dirname,'public','main.ts'),
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