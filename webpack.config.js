const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const fs = require('fs')

function getEntries() {
  const reg = /\.vue$/
  return fs.readdirSync(path.resolve(__dirname, './src/components'))
    .filter(filename => reg.test(filename) && !fs.statSync(path.resolve(__dirname, './src/components', filename)).isDirectory())
    .map(filename => ({
      name: [filename.replace(reg, '')],
      filename: path.resolve(__dirname, './src/components', filename),
    }))
}

const config = {
  mode: 'production',
  entry: { index: './src/components/Index.vue' },
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: './[name].js',
    library: 'VueComponent',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      { test: /\.vue$/, exclude: /node_modules/, loader: 'vue-loader' },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              modules: false,
              targets: {
                browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
              },
            }],
            'stage-2',
          ],
          env: {
            test: {
              plugins: ['istanbul'],
            },
          },
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/css'),
        to: 'css',
        ignore: ['.*'],
      },
    ]),
  ],
}

module.exports = config
