/* For build */
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const vuePlugin = require('rollup-plugin-vue')
const license = require('rollup-plugin-license')

const vue = vuePlugin.default || vuePlugin

module.exports = {
  output: {
    format: 'umd',
  },
  external: [],
  plugins: [
    resolve(),
    commonjs(),
    vue({ css: true }),
    babel({
      babelrc: false,
      runtimeHelpers: true,
      externalHelpers: false,
      presets: [
        ['env', { modules: false }],
        'stage-2',
      ],
      plugins: [
        'external-helpers',
      ],
    }),
    license({
      banner: `Bundle of <%= pkg.name %>
               Generated: <%= moment().format('YYYY-MM-DD') %>
               Version: <%= pkg.version %>
               License: <%= pkg.license %>
               Author: <%= pkg.author %>`,
    }),
  ],
}
