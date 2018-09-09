# @livelybone/vue-select
![gzip with dependencies: 13.5kb](https://img.shields.io/badge/gzip--with--dependencies-13.5kb-brightgreen.svg "gzip with dependencies: 13.5kb")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")
![mobile supported](https://img.shields.io/badge/mobile-supported-green.svg "mobile supported")

A vue select component, includes cascader

## repository
vue, select, cascader

## Demo
vue, select, cascader

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

// import what you just need
import SelectBase from '@livelybone/vue-select/lib/umd/SelectBase';
import SelectMulti from '@livelybone/vue-select/lib/umd/SelectMulti';
import Cascader from '@livelybone/vue-select/lib/umd/Cascader';
import CascaderMulti from '@livelybone/vue-select/lib/umd/CascaderMulti';

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
| `inputWrapStyle`  | `Object`              | none                  | input wrap style |

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
| `inputWrapStyle`  | `Object`              | none                  | input wrap style |

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
