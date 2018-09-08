<template v-if="valid">
  <div class="select-base" @click.stop="" ref="wrap">
    <div v-if="!search||optionsHidden" class="value"
         :class="{'placeholder':!selected.value&&selected.value!==0}"
         :style="inputWrapStyle" v-html="selected.name||_placeholder"
         @click.stop="show()"></div>
    <input v-if="search" v-show="!optionsHidden" class="input" v-model="inputVal"
           :style="inputWrapStyle" :placeholder="_searchPlaceholder" ref="input">
    <span class="icon-arrow" :class="{'reverse': !optionsHidden}"></span>
    <popper v-if="!optionsHidden" class="options" :referenceElm="$refs.wrap"
            :popperOptions="_popperProps.popperOptions" :arrowPosition="_popperProps.arrowPosition"
            :arrowOffsetScaling="_popperProps.arrowOffsetScaling">
      <options :isMobile="isMobile" :maxHeight="maxHeight||'50vh'" :options="showOptions"
               @startDrag="shouldHide=false" @endDrag="endDrag" @select="click">
        <slot/>
      </options>
    </popper>
  </div>
</template>

<script>
import Mixin from '../common/Mixin'

export default {
  mixins: [Mixin],
  props: {
    value: [String, Number],
  },
  computed: {
    selected() {
      return this.find(this.mergedOptions, op => op.value === this.value)
    },
    showOptions() {
      return this.options.map(op => ({ ...op, selected: op.value === this.value }))
    },
  },
  methods: {
    click({ value }) {
      this.$emit('input', value)
      this.optionsHidden = true
    },
  },
}
</script>
