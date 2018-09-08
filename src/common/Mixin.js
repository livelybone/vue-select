import VuePopper from '@livelybone/vue-popper'
import Options from '../common/Options.vue'
import { find } from './find'

const defaultPopperProps = {
  arrowPosition: 'start',
  arrowOffsetScaling: 1,
  popperOptions: {
    placement: 'bottom-start',
  },
}

export default {
  beforeMount() {
    this.mergedOptions = [...this.options]
  },
  beforeDestroy() {
    this.bind(false)
  },
  props: {
    isMobile: Boolean,
    id: String,
    options: {
      default() {
        return []
      },
      type: Array,
    },
    maxHeight: String,
    canEdit: {
      default: true,
      type: Boolean,
    },
    search: Boolean,
    placeholder: String,
    searchPlaceholder: String,
    inputWrapStyle: Object,
    popperProps: Object,
  },
  data() {
    return {
      mergedOptions: [],
      optionsHidden: true,
      shouldHide: true,
      inputVal: '',
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
      const { popperOptions } = this.popperProps || {}
      return {
        ...defaultPopperProps,
        ...this.popperProps,
        popperOptions: {
          ...defaultPopperProps.popperOptions,
          ...popperOptions,
          positionFixed: !!this.positionFixed,
        },
      }
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
      this.optionsHidden = false
      if (this.search) this.$nextTick(() => this.$refs.input.focus())
      if ('tempVal' in this) this.tempVal = [...this.value]
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
      window[`${bool ? 'add' : 'remove'}EventListener`]('click', this.hide)
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
  components: { Options, 'popper': VuePopper },
}
