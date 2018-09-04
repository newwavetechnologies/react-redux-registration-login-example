var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "cheap-module-source-map",
  entry: "./src/index.jsx",
  output: {
    path: path.resolve("dist"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  module: {
    loaders: [
      {
        /*  test: /\.css$/,
                loader: 'css-loader' */
        test: /\.css$/,
        loaders: [
          "style-loader?sourceMap",
          "css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]"
        ]
      },

      {
        test: /\.(jpg|png|gif|svg|pdf|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name]-[hash:8].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          // babelrc: false,
          //cacheDirectory: true,
          presets: ["react", "es2015", "es2016", "stage-3", "env"]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      inject: "body"
    })
  ],
  devServer: {
    historyApiFallback: true,
    proxy: {
      "/api/v1": "http://localhost:5002/"
    }
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: "http://localhost:5002/api/v1"
    })
  }
};
