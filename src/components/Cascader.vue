<template v-if="valid">
  <div class="cascader" @click.stop="" ref="cascader">
    <div v-if="!search||optionsHidden" class="value"
         :class="{'placeholder':showSelected.value.length<1}"
         :style="inputWrapStyle" v-html="showSelected.name||_placeholder"
         @click.stop="optionsHidden=false;$nextTick(()=>$refs.input.focus())"></div>
    <input v-show="search&&!optionsHidden" class="input" v-model="inputVal" :style="inputWrapStyle"
           :placeholder="_searchPlaceholder" ref="input">
    <span class="icon-arrow" :class="{'reverse': !optionsHidden}"></span>
    <div v-if="!optionsHidden" class="options" :class="_optionsClass" ref="optionsEl">
      <options :isMobile="isMobile" :maxHeight="maxHeight||'50vh'" :options="showOptions"
               @startDrag="shouldHide=false" @endDrag="endDrag"
               @select="click($event, 0)">
        <slot/>
      </options>
      <template v-for="(options, i) in selectedOptions">
        <div class="line" :key="'line'+i" :style="_lineStyle"></div>
        <options :key="i" :isMobile="isMobile"
                 :maxHeight="maxHeight||'50vh'" :options="options" @startDrag="shouldHide=false"
                 @endDrag="endDrag" @select="click($event, i+1)">
          <slot :name="i"/>
        </options>
      </template>
    </div>
  </div>
</template>

<script>
import CascaderMixin from '../common/CascaderMixin'
import Mixin from '../common/Mixin'
import Options from '../common/Options.vue'

export default {
  mixins: [Mixin, CascaderMixin],
  computed: {
    showOptions() {
      return this.options.map(op => this.setSelect(op, this.value, 0))
    },
    selectedOptions() {
      const selected = this.getSelected(this.showOptions)
      return selected.map(s => s.children).filter(ops => ops)
    },
    selected() {
      return this.getSelected(this.mergedOptions)
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
    click(val, i = 0) {
      const { value, children } = val
      if (i === 0) this.tempVal = [value]
      else this.$set(this.tempVal, i, value)
      const isEnd = !children
      if (isEnd) {
        this.$emit('input', this.tempVal)
        this.optionsHidden = true
      }
    },
    isSelected(op, val) {
      return op.value === val
    },
    getSelected(source) {
      const item0 = this.find(source, op => this.isSelected(op, this.tempVal[0]), '')
      return item0 ? this.tempVal.slice(1).reduce((pre, val) => {
        const options = pre[pre.length - 1].children
        if (options instanceof Array) {
          const item = this.find(options, op => this.isSelected(op, val), '')
          if (item) pre.push(item)
        }
        return pre
      }, [item0]) : []
    },
  },
  components: { Options },
}
</script>
