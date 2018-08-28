import { shallowMount } from '@vue/test-utils';
import Index from '../src/components/SelectBase.vue';

describe('SelectAllowTags.vue', () => {
  it('Rendered', () => {
    const wrapper = shallowMount(Index);
    expect(wrapper.find('div').exists()).to.equal(true);
  });
});
