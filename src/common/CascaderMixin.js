/**
 * @prop {Array} options
 *    example: [{name: 'a', value:'1', children: [{name:'a1', value:'11', children:[...]}]}]
 * @prop {String} ['hover','click'] expandType, the action to trigger expand sub options
 *    default: 'click'
 * */
export default {
  beforeMount() {
    this.initTemp()
  },
  props: {
    value: {
      default() {
        return []
      },
      type: Array,
    },
    expandType: String,
  },
  data() {
    return {
      tempVal: [],
      optionsHeight: 0,
      optionsRight: 0,
      positionFixed: true,
    }
  },
  computed: {
    $lineStyle() {
      return { height: `${this.optionsHeight}px` }
    },
    showOptions() {
      return this.options.map(op => this.setSelect(op, 0))
    },
    selectedOptions() {
      const selected = this.getSelected(this.showOptions)
      return selected.map(s => s.children).filter(ops => ops)
    },
  },
  watch: {
    optionsHidden(val) {
      if (!val) {
        this.$nextTick(this.listenOptionsStyle)
      }
    },
    selectedOptions(val) {
      if (val) {
        this.listenOptionsStyle()
      }
    },
  },
  methods: {
    listenOptionsStyle() {
      if (this.$refs.optionsEl) {
        const { clientHeight } = this.$refs.optionsEl.$el
        if (clientHeight && this.optionsHeight !== clientHeight) {
          this.optionsHeight = clientHeight
        }
      }
    },
    getSelected(source, values = null) {
      const arr = values || this.tempVal
      const item0 = this.find(source, op => this.isSelected(op, arr[0]), '')
      return item0
        ? arr.slice(1).reduce(
            (pre, val) => {
              const options = pre[pre.length - 1].children
              if (options instanceof Array) {
                const item = this.find(
                  options,
                  op => this.isSelected(op, val),
                  '',
                )
                if (item) pre.push(item)
              }
              return pre
            },
            [item0],
          )
        : []
    },
    isSelected(op, val) {
      return op.value === val
    },
    isEnd(op) {
      return !(op.children instanceof Array && op.children.length > 0)
    },
  },
}
