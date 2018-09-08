# @livelybone/vue-select
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
| Name                      | Type                                      | DefaultValue         | Description  |
| ------------------------- | ----------------------------------------- | -------------------- | ------------ |
| `id`                      | `[String, Number]`                        | none                 |  |
| `value`                   | `[String, Number]`                        | none                 |  |
| `placeholder`             | `String`                                  | none                 |  |
| `min`                     | `String`                                  | none                 | Min |
| `max`                     | `String`                                  | none                 | Max |
| `canEdit`                 | `Boolean`                                 | `true`               | If it can be changed |
| `inputStyle`              | `Object`                                  | none                 | Style of input tag |
| `arrowOffsetScaling`      | `Number`                                  | `1`                  | Prop `arrowOffsetScaling` of @livelybone/vue-popper |

### SelectBase
| Name          | Type         | DefaultValue                                 | Description  |
| ------------- | ------------ | -------------------------------------------- | ------------ |
| `dayStr`      | `Array`      | `['日', '一', '二', '三', '四', '五', '六']`   | Used to set day name |

### SelectMulti
| Name          | Type                   | DefaultValue                                 | Description  |
| ------------- | ---------------------- | -------------------------------------------- | ------------ |
| `maxHeight`   | `[String, Number]`     | `200`                                        | MaxHeight of scroll wrap |
| `timeStr`     | `Array`                | `['时', '分', '秒']`                          | Used to set time name |
| `btnStr`      | `String`               | `确定`                                        | Used to set text of button |

### Cascader
| Name          | Type                   | DefaultValue                                 | Description  |
| ------------- | ---------------------- | -------------------------------------------- | ------------ |
| `dayStr`      | `Array`                | `['日', '一', '二', '三', '四', '五', '六']`   | Used to set day name |
| `maxHeight`   | `[String, Number]`     | `200`                                        | MaxHeight of scroll wrap |
| `timeStr`     | `Array`                | `['时', '分', '秒']`                          | Used to set time name |
| `btnStr`      | `String`               | `确定`                                        | Used to set text of button |

### CascaderMulti
| Name          | Type                   | DefaultValue                                 | Description  |
| ------------- | ---------------------- | -------------------------------------------- | ------------ |
| `dayStr`      | `Array`                | `['日', '一', '二', '三', '四', '五', '六']`   | Used to set day name |
| `maxHeight`   | `[String, Number]`     | `200`                                        | MaxHeight of scroll wrap |
| `timeStr`     | `Array`                | `['时', '分', '秒']`                          | Used to set time name |
| `btnStr`      | `String`               | `确定`                                        | Used to set text of button |

## Events
| Name                  | EmittedData           | Description                                       |
| --------------------- | --------------------- | ------------------------------------------------- |
| `input`               | `String`              | |

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
