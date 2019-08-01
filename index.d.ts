import { ArrowPosition } from '@livelybone/vue-popper'
import { PopperOptions } from 'popper.js'
import Vue from 'vue'

interface ScrollbarProps {
  isMobile: boolean
  maxHeight: number | string
}

declare class Common extends Vue {
  id: string | number
  /**
   * Default to true
   * */
  canEdit: boolean
  /**
   * Default to false
   * */
  canSearch: boolean
  placeholder: string
  searchPlaceholder: string
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
  popperProps: {
    arrowPosition: ArrowPosition
    arrowOffsetScaling: number
    referenceElm: Element
    popperOptions: PopperOptions
  }
  /**
   * Props of vue-scrollbar-live
   *
   * Default to:
   * {
   *   isMobile: false,
   *   maxHeight: '50vh',
   * }
   * */
  scrollbarProps: ScrollbarProps
}

export interface SelectOptions {
  name: string
  value: string | number
}

declare class SelectBase extends Common {
  value: string | number
  options: SelectOptions
  inputWrapStyle: Object
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
  /**
   * Set how to expand children options
   *
   * Default to 'click'
   * */
  expandType: ExpandType
  /**
   * If set to true, options of all level can be selected
   *
   * Default to false
   * */
  changeOnSelect: boolean
  inputWrapStyle: Object
  options: CascaderOptions
}

declare class CasecaderMulti extends Common {
  value: Array<Array<string | number>>
  /**
   * Set how to expand children options
   *
   * Default to 'click'
   * */
  expandType: ExpandType
  options: CascaderOptions
}

export { SelectBase, SelectMulti, Cascader, CasecaderMulti }
