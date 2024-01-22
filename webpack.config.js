const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   mode: "development", 
   entry: './src/index.js',
   output: {
      path: path.join(__dirname, '/docs'),
      filename: './src/index_bundle.js'
   },
   target: "web",
   devServer: {
      port: 8001,
      open: true,
      hot: true,
      liveReload: true
   },
   resolve:  {
        extensions: ['.js','.jsx','.json'] 
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: 'babel-loader'
         }, 
         {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ]
         },
         {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
         }
      ]
   },
   plugins:[
      new HtmlWebpackPlugin({
         template: './src/index.html'
      })
   ]
}