# @livelybone/vue-select
[![NPM Version](http://img.shields.io/npm/v/@livelybone/vue-select.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/vue-select)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/vue-select.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/vue-select)
![gzip with dependencies: kb](https://img.shields.io/badge/gzip--with--dependencies-kb-brightgreen.svg "gzip with dependencies: kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

A vue select component, includes cascader

## repository
https://github.com/livelybone/vue-select.git

## Demo
https://github.com/livelybone/vue-select#readme

## Installation
```bash
npm i -S @livelybone/vue-select
```

## Global name
`VueSelect`

## Usage
```js
import VueSelect from '@livelybone/vue-select'
import '@livelybone/vue-select/lib/css/index.css';

// Global register
Vue.component('VueSelect', VueSelect)

// Local register
new Vue({
  components:{VueSelect}
})
```

when you want to set this module as external while you are developing another module, you should import it like this:
```js
import * as VueSelect  from '@livelybone/vue-select'

// then use it by need
```

Use in html, see what your can use in [CDN: unpkg](https://unpkg.com/@livelybone/vue-select/lib/umd/)
```html
<-- use what you want -->
<script src="https://unpkg.com/@livelybone/vue-select/lib/umd/<--module-->.js"></script>
```

## Props
| Name                      | Type                                      | DefaultValue                                  | Description  |
| ------------------------- | ----------------------------------------- | --------------------------------------------- | ------------ |
| `prop`                    | `type`                                    | none                                          | Description |


## Events
| Name              | EmittedData           | Description                                       |
| ----------------- | --------------------- | ------------------------------------------------- |
| `event`           | `type`                |  |

## style
For building style, you can use the css or scss file in lib directory.
```js
// scss
import 'node_modules/@livelybone/vue-select/lib/css/index.scss'

// css
import 'node_modules/@livelybone/vue-select/lib/css/index.css'
```
Or
```scss
// scss
@import 'node_modules/@livelybone/vue-select/lib/css/index.scss'

// css
@import 'node_modules/@livelybone/vue-select/lib/css/index.css'
```

Or, you can build your custom style by copying and editing `index.scss`

## QA

1. Error `Error: spawn node-sass ENOENT`

> You may need install node-sass globally, `npm i -g node-sass`
