<template v-if="valid">
  <div class="select-base" @click.stop="">
    <div v-if="!search||optionsHidden" class="value"
         :class="{'placeholder':!selected.value&&selected.value!==0}"
         :style="inputWrapStyle" v-html="selected.name||_placeholder"
         @click.stop="optionsHidden=false;$nextTick(()=>$refs.input.focus())"></div>
    <input v-show="search&&!optionsHidden" class="input" v-model="inputVal" :style="inputWrapStyle"
           :placeholder="_searchPlaceholder" ref="input">
    <span class="icon-arrow" :class="{'reverse': !optionsHidden}"></span>
    <div v-if="!optionsHidden" class="options" :class="_optionsClass">
      <scrollbar :isMobile="isMobile" :maxHeight="maxHeight||'50vh'"
                 @startDrag="shouldHide=false"
                 @endDrag="endDrag">
        <div v-for="(o,i) in options"
             class="option"
             :class="{selected:o.value===value}"
             :key="i"
             v-html="o.name"
             @click.stop="click(o.value)"></div>
      </scrollbar>
    </div>
  </div>
</template>

<script>
import Scrollbar from 'vue-scrollbar-live'
import Mixin from '../common/Mixin'

export default {
  mixins: [Mixin],
  computed: {
    selected() {
      return this.find(this.mergedOptions, op => op.value === this.value)
    },
  },
  methods: {
    click(val) {
      this.$emit('input', val)
      this.optionsHidden = true
    },
  },
  components: { Scrollbar },
}
</script>
