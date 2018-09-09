<template v-if="valid">
  <div class="cascader-multi" @click.stop="" ref="wrap">
    <div class="value values" @click.stop="optionsHidden=false;$refs.input.focus()">
      <div v-for="(o, i) in showSelected" class="val" :key="i">
        <span class="v" v-html="o.name"></span>
        <span class="icon-del" @click.stop="click(o)"></span>
      </div>
      <input v-if="canSearch" v-model="inputVal" class="input val"
             :placeholder="_searchPlaceholder" ref="input">
      <span v-else-if="showSelected.length>0" class="val placeholder">{{_placeholder}}</span>
    </div>
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
  computed: {
    selected() {
      return (this.value || []).map(value => this.getSelected(this.mergedOptions, value))
    },
    showSelected() {
      return this.selected
        .map(selected => selected.reduce((pre, item) => {
          if (pre.name) pre.name += ` <span class="split">/</span> ${item.name}`
          else pre.name = item.name
          pre.value.push(item.value)
          return pre
        }, { name: '', value: [] }))
    },
  },
  methods: {
    init() {
      this.tempVal = [...this.value][0] || []
    },
    html(o) {
      return `${o.name}${this.isSelected(o.value) && [...o.children].length > 0 ? '<span class="icon-selected"></span>' : ''}`
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
    isSelected(val) {
      return this.value.some(v => v === val)
    },
  },
}
</script>
