<template v-if="valid">
  <div class="cascader" @click.stop="" ref="wrap">
    <div v-if="!canSearch||optionsHidden" class="value"
         :class="{'placeholder':showSelected.value.length<1}"
         :style="inputWrapStyle" v-html="showSelected.name||_placeholder"
         @click.stop="show()"></div>
    <input v-if="canSearch" v-show="!optionsHidden" class="input" v-model="inputVal"
           :style="inputWrapStyle" :placeholder="_searchPlaceholder" ref="input">
    <span class="icon-arrow" :class="{'reverse': !optionsHidden}"></span>
    <popper v-if="!optionsHidden" class="options" ref="optionsEl"
            :referenceElm="$refs.wrap" :popperOptions="_popperProps.popperOptions"
            :arrowPosition="_popperProps.arrowPosition"
            :arrowOffsetScaling="_popperProps.arrowOffsetScaling">
      <options :isMobile="isMobile" :maxHeight="maxHeight||'50vh'" :options="showOptions"
               @startDrag="shouldHide=false" @endDrag="endDrag"
               @select="click($event, 0)" @hover="hover($event, 0)">
        <slot/>
      </options>
      <template v-for="(options, i) in selectedOptions">
        <div class="line" :key="'line'+i" :style="_lineStyle"></div>
        <options :key="i" :isMobile="isMobile"
                 :maxHeight="maxHeight||'50vh'" :options="options" @startDrag="shouldHide=false"
                 @endDrag="endDrag" @select="click($event, +i+1)" @hover="hover($event, +i+1)">
          <slot :name="i"/>
        </options>
      </template>
    </popper>
  </div>
</template>

<script>
import CascaderMixin from '../common/CascaderMixin'
import Mixin from '../common/Mixin'

export default {
  mixins: [Mixin, CascaderMixin],
  props: {
    inputWrapStyle: Object,
  },
  computed: {
    selected() {
      return this.getSelected(this.mergedOptions, this.value)
    },
    showSelected() {
      return this.selected.reduce((pre, item) => {
        if (pre.name) pre.name += ` <span class="split">/</span> ${item.name}`
        else pre.name = item.name
        pre.value.push(item.value)
        return pre
      }, { name: '', value: [] })
    },
  },
  methods: {
    init() {
      this.tempVal = [...this.value]
    },
    setSelect(op, valArr, index) {
      return {
        ...op,
        selected: this.isSelected(op, valArr[index]),
        ...(op.children instanceof Array
          ? {
            children: op.children.map(child => this.setSelect(child, valArr, index + 1)),
            cName: `${op.name}<span class="icon-expand"></span>`,
          } : {}),
      }
    },
    click(option, i = 0, isHover = false) {
      const { value, children } = option
      if (this.tempVal[i] !== value) {
        if (i === 0) this.tempVal = [value]
        else this.$set(this.tempVal, i, value)
      }
      const isEnd = !children
      if ((this.changeOnSelect || isEnd) && !isHover) {
        this.$emit('input', [...this.tempVal])
        if (isEnd) this.optionsHidden = true
      }
    },
    hover(option, i = 0) {
      if (this.expandType === 'hover') {
        if (option.children && option.children.length > 0) {
          this.click(option, i, true)
        } else {
          this.$set(this.tempVal, i, '')
        }
      }
    },
    isSelected(op, val) {
      return op.value === val
    },
  },
}
</script>
