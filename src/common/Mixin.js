module.exports = {
  beforeDestroy() {
    this.bind(false)
  },
  props: {
    isMobile: Boolean,
    id: String,
    value: [String, Number],
    options: Array,
    maxHeight: String,
    canEdit: {
      default: true,
      type: Boolean,
    },
    search: Boolean,
    inputWrapStyle: Object,
    optionsClass: String,
  },
  data() {
    return {
      optionsHidden: true,
      shouldHide: true,
      inputVal: '',
    }
  },
  computed: {
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
  }
  ,
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
    find(arr, rule) {
      let item = {}
      arr.some((item1) => {
        if (rule(item1)) {
          item = item1
          return true
        }
        return false
      })
      return item
    },
  },
}
