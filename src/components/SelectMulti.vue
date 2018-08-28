<template v-if="valid">
  <div class="select-multi" @click.stop="">
    <div class="value values" @click.stop="optionsHidden=false;$refs.input.focus()">
      <div v-for="(o, i) in selectedArr" class="val" :key="i">
        <span class="v" v-html="o.name"></span>
        <span class="icon-del" @click.stop="click(o.value)"></span>
      </div>
      <input v-if="search" v-model="inputVal" class="input val" ref="input"/>
    </div>
    <span class="icon-arrow" :class="{'reverse': !optionsHidden}"></span>
    <div v-if="!optionsHidden" class="options" :class="_optionsClass">
      <scrollbar v-if="!optionsHidden" :isMobile="isMobile" :maxHeight="maxHeight||'50vh'"
                 @startDrag="shouldHide=false"
                 @endDrag="endDrag">
        <div v-for="(o,i) in options"
             class="option"
             :class="{'multi-selected':value.includes(o.value)}"
             :key="i"
             v-html="html(o)"
             @click.stop="click(o.value)">
        </div>
      </scrollbar>
    </div>
  </div>
</template>

<script>
import Scrollbar from 'vue-scrollbar-live'
import Mixin from '../common/Mixin'

export default {
  mixins: [Mixin],
  props: {
    value: {
      default() {
        return []
      },
      type: Array,
    },
  },
  computed: {
    selectedArr() {
      return this.value.map(val => this.options.find(op => op.value === val))
    },
  },
  methods: {
    html(o) {
      return `${o.name}${this.value.includes(o.value) ? '<span class="icon-selected"></span>' : ''}`
    },
    click(val) {
      const index = Object.keys(this.value).find(k => this.value[k] === val)
      if (index) {
        this.$emit('input', this.value.slice(0, index).concat(this.value.slice(+index + 1)))
      } else {
        this.$emit('input', this.value.concat([val]))
      }
    },
  },
  components: { Scrollbar },
}
</script>
