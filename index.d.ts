import { VuePopperProps } from '@livelybone/vue-popper'
import Vue from 'vue'
import { VueScrollbarProps } from 'vue-scrollbar-live'

declare class Common extends Vue {
  id?: string | number
  /**
   * Default to true
   * */
  canEdit?: boolean
  /**
   * Default to false
   * */
  canSearch?: boolean
  placeholder?: string
  searchPlaceholder?: string
  /**
   * Props of popper.js
   *
   * Defaults to:
   * {
   *   arrowPosition: 'start',
   *   arrowOffsetScaling: 1,
   *   popperOptions: {
   *     placement: 'bottom-start',
   *     modifiers: {
   *       preventOverflow: {
   *         boundariesElement:
   *           typeof document !== 'undefined' ? document.body : '',
   *       },
   *     },
   *   },
   * }
   * */
  popperProps?: VuePopperProps
  /**
   * Props of vue-scrollbar-live
   *
   * Default to:
   * {
   *   isMobile: false,
   *   maxHeight: '50vh',
   * }
   * */
  scrollbarProps?: VueScrollbarProps
}

export interface SelectOptions {
  name: string
  value: string | number
}

declare class SelectBase extends Common {
  value: string | number
  options: SelectOptions
  inputWrapStyle?: CSSStyleDeclaration | string
}

declare class SelectMulti extends Common {
  value: Array<string | number>
  options: SelectOptions
}

export interface CascaderOptions extends SelectOptions {
  children?: CascaderOptions
}

export type ExpandType = 'click' | 'hover'

declare class Cascader extends Common {
  value: Array<string | number>
  options: CascaderOptions
  /**
   * Set how to expand children options
   *
   * Default to 'click'
   * */
  expandType?: ExpandType
  /**
   * If set to true, options of all level can be selected
   *
   * Default to false
   * */
  changeOnSelect?: boolean
  inputWrapStyle?: CSSStyleDeclaration | string
}

declare class CasecaderMulti extends Common {
  value: Array<Array<string | number>>
  options: CascaderOptions
  /**
   * Set how to expand children options
   *
   * Default to 'click'
   * */
  expandType?: ExpandType
}

export { SelectBase, SelectMulti, Cascader, CasecaderMulti }
