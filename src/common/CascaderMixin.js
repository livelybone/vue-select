/**
 * @props {Array} options
 *    example: [{name: 'a', value:'1', children: [{name:'a1', value:'11', children:[...]}]}]
 * */
export default {
  beforeMount() {
    this.init()
  },
  updated() {
    if (this.$refs.optionsEl) this.optionsHeight = this.$refs.optionsEl.clientHeight
  },
  props: {
    value: Array,
    options: Array,
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
    }
  },
  methods: {
    init() {
      this.tempVal = this.value || []
    },
  },
}
