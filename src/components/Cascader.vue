<template v-if="valid">
  <div class="cascader" :class="{ disabled: !canEdit }" ref="wrap">
    <div
      v-show="!canEdit || !canSearch || optionsHidden"
      class="value"
      :class="{ placeholder: showSelected.value.length < 1 }"
      :style="inputWrapStyle"
      v-html="showSelected.name || $placeholder"
    ></div>
    <template v-if="canEdit">
      <input
        v-if="canSearch"
        v-show="!optionsHidden"
        class="input"
        v-model="inputVal"
        :style="inputWrapStyle"
        :placeholder="$searchPlaceholder"
        ref="input"
      />
      <span class="icon-arrow" :class="{ reverse: !optionsHidden }"></span>
      <popper
        v-show="!optionsHidden"
        class="options"
        ref="optionsEl"
        :popperOptions="$popperProps.popperOptions"
        :arrowPosition="$popperProps.arrowPosition"
        :arrowOffsetScaling="$popperProps.arrowOffsetScaling"
      >
        <options
          :$_select_isMobile="$_select_isMobile"
          :maxHeight="maxHeight"
          :marginToWrap="marginToWrap"
          :options="showOptions"
          @startDrag="shouldHide = false"
          @endDrag="endDrag"
          @select="click($event, 0)"
          @hover="hover($event, 0)"
        >
          <slot />
        </options>
        <template v-for="(options, i) in selectedOptions">
          <div class="line" :key="'line' + i" :style="$lineStyle"></div>
          <options
            :key="i"
            :$_select_isMobile="$_select_isMobile"
            :maxHeight="maxHeight"
            :marginToWrap="marginToWrap"
            :options="options"
            @startDrag="shouldHide = false"
            @endDrag="endDrag"
            @select="click($event, +i + 1)"
            @hover="hover($event, +i + 1)"
          >
            <slot :name="i" />
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
  props: {
    changeOnSelect: Boolean,
    inputWrapStyle: [String, Object],
  },
  computed: {
    showSelected() {
      const selected = this.getSelected(this.mergedOptions, this.value)
      return selected.reduce(
        (pre, item) => {
          if (pre.name) pre.name += ` <span class="split">/</span> ${item.name}`
          else pre.name = item.name
          pre.value.push(item.value)
          return pre
        },
        { name: '', value: [] },
      )
    },
  },
  methods: {
    initTemp() {
      this.tempVal = [...this.value]
    },
    setSelect(op, index) {
      return {
        ...op,
        selected: this.isSelected(op, this.tempVal[index]),
        ...(op.children instanceof Array
          ? {
              children: op.children.map(child =>
                this.setSelect(child, index + 1),
              ),
              cName: `${op.name}<span class="icon-expand"></span>`,
            }
          : {}),
      }
    },
    click(option, i = 0, isHover = false) {
      const { value } = option
      if (this.tempVal[i] !== value) {
        this.tempVal.length = i + 1
        if (i === 0) this.tempVal = [value]
        else this.$set(this.tempVal, i, value)
      }
      const isEnd = this.isEnd(option)
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
  },
}
</script>
