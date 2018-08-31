<template v-if="valid">
  <div class="select-multi" @click.stop="">
    <div class="value values" @click.stop="optionsHidden=false;$refs.input.focus()">
      <div v-for="(o, i) in selected" class="val" :key="i">
        <span class="v" v-html="o.name"></span>
        <span class="icon-del" @click.stop="click(o.value)"></span>
      </div>
      <input v-if="search" v-model="inputVal" class="input val"
             :placeholder="_searchPlaceholder" ref="input">
      <span v-else-if="selected.length>0" class="val placeholder">{{_placeholder}}</span>
    </div>
    <span class="icon-arrow" :class="{'reverse': !optionsHidden}"></span>
    <div v-if="!optionsHidden" class="options" :class="_optionsClass">
      <!--<div class="popper"></div>-->
      <options :isMobile="isMobile" :maxHeight="maxHeight||'50vh'" :options="showOptions"
               @startDrag="shouldHide=false" @endDrag="endDrag" @select="click">
        <slot/>
      </options>
    </div>
  </div>
</template>

<script>
import Mixin from '../common/Mixin'
import Options from '../common/Options.vue'

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
    selected() {
      return this.mergedOptions.filter(op => this.value.some(v => v === op.value))
    },
    showOptions() {
      return this.options.map(op => ({
        ...op,
        selected: this.isSelected(op.value),
        name: this.html(op),
      }))
    },
  },
  methods: {
    html(o) {
      return `${o.name}${this.isSelected(o.value) ? '<span class="icon-selected"></span>' : ''}`
    },
    click({ value }) {
      const index = this.find(Object.keys(this.value), k => this.value[k] === value, -1)
      if (index > -1) {
        this.$emit('input', this.value.slice(0, index).concat(this.value.slice(+index + 1)))
      } else {
        this.$emit('input', this.value.concat([value]))
      }
    },
    isSelected(val) {
      return this.value.some(v => v === val)
    },
  },
  components: { Options },
}
</script>
