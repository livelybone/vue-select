<template>
  <scrollbar
    :isMobile="$_select_isMobile"
    :maxHeight="maxHeight"
    :scrollTo="scrollTo"
    :marginToWrap="marginToWrap"
    v-on="$listeners"
  >
    <div
      v-for="(o, i) in options"
      class="option"
      :class="{ selected: o.selected }"
      :key="i"
      :ref="'option-' + i"
      @mouseenter="$emit('hover', o)"
      @click.stop="$emit('select', o)"
    ></div>
    <slot v-if="!options.length" />
  </scrollbar>
</template>

<script>
import VueScrollbar from 'vue-scrollbar-live'
import { find } from './find'

export default {
  components: { scrollbar: VueScrollbar },
  props: {
    $_select_isMobile: Boolean,
    maxHeight: [Number, String],
    marginToWrap: Number,
    options: Array,
  },
  data() {
    return { scrollTo: 0 }
  },
  watch: {
    options: {
      handler() {
        this.insertHtml()
      },
      immediate: true,
    },
  },
  methods: {
    /**
     * Why not use v-html: the touch event seems to be prevented when use v-html
     * However, this solution performs poorly, because it manipulates the DOM directly
     * Waiting for another solution
     * */
    insertHtml() {
      this.$nextTick(() => {
        ;(this.options || []).forEach((o, i) => {
          if (this.$refs[`option-${i}`]) {
            const ele =
              this.$refs[`option-${i}`][0] || this.$refs[`option-${i}`]
            ele.innerHTML = o.cName || o.name
          }
        })
      })
    },
  },
  beforeMount() {
    const index = find(Object.keys(this.options), k => this.options[k].selected)
    this.scrollTo =
      this.options.length === 1 ? 0 : index / (this.options.length - 1)
  },
}
</script>
