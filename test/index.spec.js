import { shallowMount } from '@vue/test-utils'
import VueSelect from '../src/components/Index.vue'

describe('Index.vue', () => {
  it('Rendered', () => {
    const wrapper = shallowMount(VueSelect)
    expect(wrapper.find('div').exists()).to.equal(true)
  })
})
