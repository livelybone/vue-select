import * as ScrollGet from '@livelybone/scroll-get'

/**
 * @props {Array} options
 *    example: [{name: 'a', value:'1', children: [{name:'a1', value:'11', children:[...]}]}]
 * */
export default {
  beforeMount() {
    this.init()
  },
  props: {
    value: Array,
    options: {
      default() {
        return []
      },
      type: Array,
    },
  },
  computed: {
    _lineStyle() {
      return { height: `${this.optionsHeight}px` }
    },
  },
  data() {
    return {
      tempVal: [],
      optionsHeight: 0,
      optionsRight: 0,
    }
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
    init() {
      this.tempVal = this.value || []
    },
    listenOptionsStyle() {
      if (this.$refs.optionsEl) {
        const { pageLeft } = ScrollGet.posRelativeToPage(this.$refs.cascader)
        const { clientHeight, clientWidth } = this.$refs.optionsEl
        if (clientHeight && this.optionsHeight !== clientHeight) {
          this.optionsHeight = clientHeight
        }
        if (pageLeft + clientWidth >= document.body.clientWidth - 10) {
          // this.
        }
      }
    },
  },
}
