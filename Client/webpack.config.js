const path = require('path')

const HtmlWebpackPlugin = require("html-webpack-plugin")


module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js",
    publicPath: '/',
  },
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom"
    },
    extensions: ['.js', '.jsx']
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },{
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },{
        test: /\.(png|pdf|jp(e*)g|svg|gif)$/,
        use: ['file-loader'],
      },{
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'url-loader?limit=9000000&name=images/*/[name].[ext]',
        }
      }
    ],
  },
  optimization: {
    splitChunks: { chunks: 'all' }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html")
    })
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    open: true,
    hot: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true
      }
    }
  }
}
