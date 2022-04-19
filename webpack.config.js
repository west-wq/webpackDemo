const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
console.log('process.env.NODE_ENV', process.env.NODE_ENV)
const config = {
  mode: 'development',
  entry: './src/index.js', //入口地址
  output: {
    filename: 'bundle.js', //输出文件名
    path: path.join(__dirname, 'dist'), //输出文件夹
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'), // 静态文件目录
    compress: true, //是否启动压缩 gzip
    port: 8080, // 端口号
    open: true // 是否自动打开浏览器
  },
  module: {
    rules: [
      // 转换规则
      {
        test: /\.(s[ac]|c)ss$/i, ///\.css$/i
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'], //   'style-loader'   loader将webpack不认识的内容转换成认识的内容
      }
    ]
  },
  plugins: [
    //配置插件  贯穿webpack打包的整个生命周期，执行不同的任务
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ // 通过css文件的形式引入到页面中
      filename: '[name].[hash:8].css'
    }),
  ],
  /* 
  开发环境： 更快的构建速度， 打印debug信息，live reload或者hot reload， sourcemap更好的定位问题等
  生产环境： 更小的包体积 tree-shaking和代码压缩， 代码分割， 压缩图片体积等    
  */
}

module.exports = (evn, argv) => {
  console.log('argv.mode=', argv.mode) // 打印 mode(模式) 值
  // 这里可以通过不同的模式修改 config 配置
  return config;

}