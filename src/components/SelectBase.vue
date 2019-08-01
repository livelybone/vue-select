<template v-if="valid">
  <div class="select-base" :class="{ disabled: !canEdit }" ref="wrap">
    <div
      v-show="!canEdit || !canSearch || optionsHidden"
      class="value"
      :class="{ placeholder: !selected.value && selected.value !== 0 }"
      :style="inputWrapStyle"
      v-html="selected.name || $placeholder"
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
          @select="click"
        >
          <slot />
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
    value: [String, Number],
    inputWrapStyle: [String, Object],
  },
  computed: {
    selected() {
      return this.find(this.mergedOptions, op => op.value === this.value)
    },
    showOptions() {
      return this.options.map(op => ({
        ...op,
        selected: op.value === this.value,
      }))
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
