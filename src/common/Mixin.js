import { objectDeepMerge } from '@livelybone/copy'
import VuePopper from '@livelybone/vue-popper'
import Options from '../common/Options.vue'
import { find } from './find'

export default {
  components: { Options, 'popper': VuePopper },
  props: {
    id: String,
    options: {
      default() {
        return []
      },
      type: Array,
    },
    canEdit: {
      default: true,
      type: Boolean,
    },
    canSearch: Boolean,
    placeholder: String,
    searchPlaceholder: String,
    popperProps: Object,
    scrollbarProps: Object,
  },
  data() {
    return {
      mergedOptions: [],
      optionsHidden: true,
      shouldHide: true,
      inputVal: '',
      defaultPopperProps: Object.freeze({
        arrowPosition: 'start',
        arrowOffsetScaling: 1,
        popperOptions: {
          placement: 'bottom-start',
          modifiers: {
            preventOverflow: {
              boundariesElement: typeof document !== 'undefined' ? document.body : '',
            },
          },
        },
      }),
    }
  },
  computed: {
    _placeholder() {
      return this.placeholder || '请选择'
    },
    _searchPlaceholder() {
      return this.searchPlaceholder || '搜索'
    },
    valid() {
      let valid = true
      valid = !this.options || !this.options.every(item => item.name && item.value !== undefined)
      if (!valid) {
        throw new Error('vue-select: Prop options is invalid! Right example: [{name: "option", value: 1}]')
      }
      return valid
    },
    _popperProps() {
      return objectDeepMerge({}, this.defaultPopperProps, this.popperProps)
    },
    $_select_isMobile() {
      const { isMobile } = this.scrollbarProps || {}
      return isMobile
    },
    maxHeight() {
      const { maxHeight } = this.scrollbarProps || {}
      return maxHeight
    },
  },
  watch: {
    optionsHidden(val) {
      this.bind(!val)
    },
    inputVal(val) {
      this.$emit('search', val)
    },
    options(val) {
      this.mergedOptions = this.mergeOptions(this.mergedOptions, val)
    },
  },
  methods: {
    show() {
      if (this.canEdit && this.optionsHidden) {
        this.optionsHidden = false
        if (this.canSearch) this.$nextTick(() => this.$refs.input.focus())
        if ('initTemp' in this) this.initTemp()
      } else {
        this.hide()
      }
    },
    hide() {
      if (this.shouldHide) {
        this.optionsHidden = true
      }
      this.shouldHide = true
    },
    endDrag() {
      setTimeout(() => {
        this.shouldHide = true
      }, 100)
    },
    bind(bool) {
      if (typeof window !== 'undefined') {
        window[`${bool ? 'add' : 'remove'}EventListener`]('click', this.hide)
      }
    },
    find,
    mergeOptions(a1, a2) {
      const obj = [...a1, ...a2].reduce((pre, item) => {
        const item1 = pre[item.value]
        if (item1 && item1.name !== item.name) {
          throw new Error(`vue-select: the options at same level have conflict items(name: ${item.name} & name: ${item1.name}) that have the same value`)
        } else if (item1 && (item1.children instanceof Array || item.children instanceof Array)) {
          pre[item.value] = { ...item, children: this.mergeOptions(item1.children, item.children) }
        } else pre[item.value] = item
        return pre
      }, {})
      return Object.keys(obj).map(k => obj[k])
    },
  },
  beforeMount() {
    this.mergedOptions = [...this.options]
  },
  beforeDestroy() {
    this.bind(false)
  },
}
