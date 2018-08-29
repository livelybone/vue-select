<template>
  <scrollbar :isMobile="isMobile" :maxHeight="maxHeight||'50vh'" :scrollTo="scrollTo"
             v-on="$listeners">
    <div v-for="(o,i) in options"
         class="option"
         :class="{selected:o.selected}"
         :key="i"
         v-html="o.name"
         @click.stop="$emit('select', o.value)"></div>
    <slot v-if="!options.length"/>
  </scrollbar>
</template>

<script>
import Scrollbar from 'vue-scrollbar-live'
import { find } from './find'

export default {
  beforeMount() {
    const index = find(Object.keys(this.options), k => this.options[k].selected)
    this.scrollTo = this.options.length === 1 ? 0 : index / (this.options.length - 1)
  },
  props: {
    isMobile: Boolean,
    maxHeight: [Number, String],
    options: Array,
  },
  data() {
    return { scrollTo: 0 }
  },
  methods: {},
  components: { Scrollbar },
}
</script>
