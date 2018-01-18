
const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    app: './app.js'
  },
  context: path.resolve(__dirname, 'src'),

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'build.[name].js',
  },

  module: {
    rules: [

      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax', // <style lang="sass">
            less: 'vue-style-loader!css-loader!less-loader', // <style lang="sass">
          },

          // other vue-loader options go here
        }
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          }, {
            loader: "css-loader" // translates CSS into CommonJS
          }, {
            loader: "less-loader" // compiles Less to CSS
          }
        ]
      }
    ]
  },


  plugins: [
    new CopyWebpackPlugin([
      { from: 'manifest.json'},
      { from: 'popup.html'},
      {from: 'icons', to: 'icons'},
      {from: 'css', to: 'css'},
    ])
  ]
}


if (IS_PRODUCTION) {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({minimize: true}),
    new webpack.optimize.UglifyJsPlugin({
      // sourceMap: false,
      compress: {
        warnings: false,
        drop_console: true
      }
    }),
    ])
}
