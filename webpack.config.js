var path = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  mode: 'development',
  context: path.join(__dirname),
  output: { path: path.join(__dirname, './dist') },
  plugins: [
    new MomentLocalesPlugin({ localesToKeep: ['es-us', 'fr'] }),
    new CopyWebpackPlugin([
      { from: 'src/static' },
      {
        from: 'src/components/*/*.css',
        to: 'assets/stylesheets',
        transformPath: function(targetPath, absolutePath) {
          var components = targetPath.split('/');
          return 'stylesheets/' + components[components.length - 1];
        }
      }
    ]),
    new WriteFilePlugin()
  ],
  module: {
    rules: [
      { test: /\.hbs$/, loader: "handlebars-loader" }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    proxy: {
      '/api/**': {
        target: 'https://api-lab-trone-stif.opendata.stif.info/service/tr-unitaire-stif/',
        secure: false,
        changeOrigin: true,
        pathRewrite: { '^/api/': '/' }
      }
    }
  }
};
