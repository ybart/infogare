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
    new CopyWebpackPlugin([{ from: 'src/static' }]),
    new WriteFilePlugin()
  ],
  devServer: { contentBase: path.join(__dirname, 'dist') }
};
