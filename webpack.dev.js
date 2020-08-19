const HTMLWebpackPlugin = require('html-webpack-plugin')
const webpackCommon = require('./webpack.common.js')
const path = require('path')

module.exports = Object.assign(webpackCommon,{
    mode:'development',
    devServer:{
        hot:true,
    }
})