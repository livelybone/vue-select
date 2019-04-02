<template v-if="valid">
  <div class="select-multi"
       :class="{disabled:!canEdit}"
       ref="wrap">
    <div class="value values">
      <div v-for="(o, i) in selected"
           class="val"
           :key="i">
        <span class="v"
              v-html="o.name"></span>
        <span v-if="canEdit"
              class="icon-del"
              @click.stop="click(o)"></span>
      </div>
      <template v-if="canEdit">
        <input v-if="canSearch"
               v-model="inputVal"
               class="input val"
               :placeholder="_searchPlaceholder"
               @click="optionsHidden=false"
               ref="input">
        <span v-else-if="selected.length<=0"
              class="val placeholder">{{_placeholder}}</span>
      </template>
    </div>
    <template v-if="canEdit">
      <span class="icon-arrow"
            :class="{'reverse': !optionsHidden}"></span>
      <popper v-show="!optionsHidden"
              class="options"
              :referenceElm="$refs.wrap"
              :popperOptions="_popperProps.popperOptions"
              :arrowPosition="_popperProps.arrowPosition"
              :arrowOffsetScaling="_popperProps.arrowOffsetScaling">
        <options :$_select_isMobile="$_select_isMobile"
                 :maxHeight="maxHeight||'50vh'"
                 :options="showOptions"
                 @startDrag="shouldHide=false"
                 @endDrag="endDrag"
                 @select="click">
          <slot/>
        </options>
      </popper>
    </template>
  </div>
</template>

<script>
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
      if (this.canEdit) {
        const index = this.find(Object.keys(this.value), k => this.value[k] === value, -1)
        if (index > -1) {
          this.$emit('input', this.value.slice(0, index).concat(this.value.slice(+index + 1)))
        } else {
          this.$emit('input', this.value.concat([value]))
        }
      }
    },
    isSelected(val) {
      return this.value.some(v => v === val)
    },
  },
}
</script>
