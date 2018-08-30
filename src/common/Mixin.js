import { find } from './find'

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
    options: Array,
    maxHeight: String,
    canEdit: {
      default: true,
      type: Boolean,
    },
    search: Boolean,
    placeholder: String,
    searchPlaceholder: String,
    inputWrapStyle: Object,
    optionsClass: String,
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
    _optionsClass() {
      return /^(left|right)-(top|bottom)$/.test(this.optionsClass) ? this.optionsClass : 'left-bottom'
    },
    valid() {
      let valid = true
      valid = !this.options || !this.options.every(item => item.name && item.value !== undefined)
      if (!valid) {
        throw new Error('vue-select: Prop options is invalid! Right example: [{name: "option", value: 1}]')
      }
      return valid
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
}
