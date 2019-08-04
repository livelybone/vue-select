# @livelybone/vue-select
[![NPM Version](http://img.shields.io/npm/v/@livelybone/vue-select.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/vue-select)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/vue-select.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/vue-select)
![gzip with dependencies: 15kb](https://img.shields.io/badge/gzip--with--dependencies-15kb-brightgreen.svg "gzip with dependencies: 15kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")
![ssr supported](https://img.shields.io/badge/ssr-supported-blue.svg "ssr supported")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

A vue select component, includes cascader

## repository
https://github.com/livelybone/vue-select

## Demo
https://livelybone.github.io/vue/vue-select/

## Run Example
Your can see the usage by run the example of the module, here is the step:

1. Clone the library `git clone https://github.com/livelybone/vue-select.git`
2. Go to the directory `cd vue-select`
3. Install npm dependencies `npm i`(use taobao registry: `npm i --registry=http://registry.npm.taobao.org`)
4. Open service `npm run dev`
5. See the example(usually is `http://127.0.0.1/examples/test.html`) in your browser

## Installation
```bash
npm i -S @livelybone/vue-select
```

## Register
```js
// import all
import {SelectBase, SelectMulti, Cascader, CascaderMulti} from '@livelybone/vue-select';
// or
import * as VueSelect from '@livelybone/vue-select';

// Global register
Vue.component('select-base', SelectBase);
Vue.component('select-multi', SelectMulti);
Vue.component('cascader', Cascader);
Vue.component('cascader-multi', CascaderMulti);

// Local register
new Vue({
  components:{SelectBase, SelectMulti, Cascader, CascaderMulti}
})
```

Use in html, see what your can use in [CDN: unpkg](https://unpkg.com/@livelybone/vue-select/lib/umd/)
```html
<-- use what you want -->
<script src="https://unpkg.com/@livelybone/vue-select/lib/umd/<--module-->.js"></script>
```

## Props

### Common
| Name                      | Type                                      | DefaultValue                                  | Description  |
| ------------------------- | ----------------------------------------- | --------------------------------------------- | ------------ |
| `id`                      | `[String, Number]`                        | none                                          |  |
| `options`                 | `Array`                                   | `[]`                                          | Select options |
| `canEdit`                 | `Boolean`                                 | `true`                                        | If it's set to false, the component can only be used for show |
| `canSearch`               | `Boolean`                                 | `false`                                       | Set to true to enable search |
| `placeholder`             | `String`                                  | none                                          | Placeholder  |
| `searchPlaceholder`       | `String`                                  | `true`                                        | Placeholder of search input |
| `popperProps`             | `Object`                                  | `defaultPopperProps`                          | Props of module [@livelybone/vue-popper](https://github.com/livelybone/vue-popper) |
| `scrollbarProps`          | `Object`                                  | `{isMobile:false, maxHeight: '50vh'}`         | Props of module [@livelybone/vue-scrollbar-live](https://github.com/livelybone/vue-scrollbar-live) |

```js
const defaultPopperProps = {
  arrowPosition: 'start',
  arrowOffsetScaling: 1,
  popperOptions: {
    placement: 'bottom-start',
    // If component is Cascader or CascaderMulti -> `positionFixed: true`
    // More options in https://popper.js.org
  },
}
```

### SelectBase
| Name              | Type                  | DefaultValue          | Description  |
| ----------------- | --------------------- | --------------------- | ------------ |
| `value`           | `[String, Number]`    | none                  |  |
| `inputWrapStyle`  | `[String, Object]`    | none                  |  |

### SelectMulti
| Name              | Type                  | DefaultValue          | Description  |
| ----------------- | --------------------- | --------------------- | ------------ |
| `value`           | `Array`               | none                  |  |

### Cascader
| Name              | Type                  | DefaultValue          | Description  |
| ----------------- | --------------------- | --------------------- | ------------ |
| `value`           | `Array`               | none                  |  |
| `expandType`      | `String`              | `click`               | Options: `['click', 'hover']`. Set how to expand children options |
| `changeOnSelect`  | `Boolean`             | `false`               | If set to true, options of all level can be selected |
| `inputWrapStyle`  | `[String, Object]`    | none                  | input wrap style |

### CascaderMulti
| Name              | Type                  | DefaultValue          | Description  |
| ----------------- | --------------------- | --------------------- | ------------ |
| `value`           | `Array`               | none                  |  |
| `expandType`      | `String`              | `click`               | Options: `['click', 'hover']`. Set how to expand children options |

## Events
| Name              | EmittedData           | Description                                       |
| ----------------- | --------------------- | ------------------------------------------------- |
| `input`           | `[Array, String]`     |  |
| `search`          | `String`              |  |

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
@import 'node_modules/@livelybone/vue-select/lib/css/index.scss';

// css
@import 'node_modules/@livelybone/vue-select/lib/css/index.css';
```

Or, you can build your custom style by copying and editing `index.scss`

## QA

1. Error `Error: spawn node-sass ENOENT`

> You may need install node-sass globally, `npm i -g node-sass`
