<template v-if="valid">
  <div class="cascader-multi"
       :class="{disabled:!canEdit}"
       @click.stop=""
       ref="wrap">
    <div class="value values"
         @click.stop="show()">
      <div v-for="(o, i) in showSelected"
           class="val"
           :key="i">
        <span class="v"
              v-html="o.name"></span>
        <span class="icon-del"
              @click.stop="deal(o.value)"></span>
      </div>
      <template v-if="canEdit">
        <input v-if="canSearch"
               v-model="inputVal"
               class="input val"
               :placeholder="_searchPlaceholder"
               @click.stop="optionsHidden=false"
               ref="input">
        <span v-else-if="showSelected.length<=0"
              class="val placeholder">{{_placeholder}}</span>
      </template>
    </div>
    <template v-if="canEdit">
      <span class="icon-arrow"
            :class="{'reverse': !optionsHidden}"></span>
      <popper v-if="!optionsHidden"
              class="options"
              ref="optionsEl"
              :referenceElm="$refs.wrap"
              :popperOptions="_popperProps.popperOptions"
              :arrowPosition="_popperProps.arrowPosition"
              :arrowOffsetScaling="_popperProps.arrowOffsetScaling">
        <options :$_select_isMobile="$_select_isMobile"
                 :maxHeight="maxHeight||'50vh'"
                 :options="showOptions"
                 @startDrag="shouldHide=false"
                 @endDrag="endDrag"
                 @select="click($event, 0)"
                 @hover="hover($event, 0)">
          <slot/>
        </options>
        <template v-for="(options, i) in selectedOptions">
          <div class="line"
               :key="'line'+i"
               :style="_lineStyle"></div>
          <options :key="i"
                   :$_select_isMobile="$_select_isMobile"
                   :maxHeight="maxHeight||'50vh'"
                   :options="options"
                   @startDrag="shouldHide=false"
                   @endDrag="endDrag"
                   @select="click($event, +i+1)"
                   @hover="hover($event, +i+1)">
            <slot :name="i"/>
          </options>
        </template>
      </popper>
    </template>
  </div>
</template>

<script>
import CascaderMixin from '../common/CascaderMixin'
import Mixin from '../common/Mixin'

export default {
  mixins: [Mixin, CascaderMixin],
  computed: {
    showSelected() {
      const selected = (this.value || []).filter(v => v)
        .map(value => this.getSelected(this.mergedOptions, value))
      return selected
        .map(s => s.reduce((pre, item) => {
          if (pre.name) pre.name += ` <span class="split">/</span> ${item.name}`
          else pre.name = item.name
          pre.value.push(item.value)
          return pre
        }, { name: '', value: [] }))
    },
  },
  methods: {
    initTemp() {
      this.tempVal = this.value && this.value[0] ? [...this.value[0]] : []
    },
    html(o, selected, isEnd) {
      return `${o.name}${selected && isEnd ? '<span class="icon-selected"></span>' : ''}`
    },
    setSelect(op, index) {
      const isEnd = this.isEnd(op)
      const selected = (this.value || [])
        .filter(val => this.equal(this.tempVal.slice(0, index), val))
        .some(val => this.isSelected(op, val[index]))
      return {
        ...op,
        selected,
        ...(!isEnd
          ? {
            children: op.children.map(child => this.setSelect(child, index + 1)),
            cName: `${op.name}<span class="icon-expand"></span>`,
          } : { cName: this.html(op, selected, isEnd) }),
      }
    },
    deal(valArr) {
      const values = [...this.value]
      const key = this.find(Object.keys(values), k => this.equal(values[k], valArr), '')
      if (key) {
        if (values[key].length === valArr.length) values.splice(key, 1)
        else values.splice(key, 1, [...valArr])
      } else values.push([...valArr])
      this.$emit('input', values)
    },
    click(option, i = 0, isHover = false) {
      const { value } = option
      if (this.tempVal[i] !== value) {
        this.tempVal.length = i + 1
        if (i === 0) this.tempVal = [value]
        else this.$set(this.tempVal, i, value)
      }
      const isEnd = this.isEnd(option)
      if (isEnd && !isHover) {
        this.deal(this.tempVal)
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
    equal(tArr, arr) {
      return tArr.every((v, i) => v === arr[i])
    },
  },
}
</script>
