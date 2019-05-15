<template>
  <transition name="el-zoom-in-top" @after-leave="doDestroy">
    <div
      v-show="showPopper"
      class="vui-autocomplete-suggestion vui-popper"
      :class="{ 'is-loading': !parent.hideLoading && parent.loading }"
      :style="{ width: dropdownWidth }"
      role="region">
      <vui-scrollbar
        tag="ul"
        wrap-class="vui-autocomplete-suggestion__wrap"
        view-class="vui-autocomplete-suggestion__list">
        <li v-if="!parent.hideLoading && parent.loading">
          <i class="icon-loading">
            <vui-icon-loading></vui-icon-loading>
          </i>
        </li>
        <slot v-else>
        </slot>
      </vui-scrollbar>
    </div>
  </transition>
</template>
<script>
  import Popper from '../../../src/utils/vue-popper';
  import Emitter from '../../../src/mixins/emitter';
  import VuiScrollbar from '../../../packages/scrollbar';
  import VuiIconLoading from '../../../packages/icon-loading';

  export default {
    components: { VuiScrollbar, VuiIconLoading},
    mixins: [Popper, Emitter],

    componentName: 'VuiAutocompleteSuggestions',

    data() {
      return {
        parent: this.$parent,
        dropdownWidth: ''
      };
    },

    props: {
      options: {
        default() {
          return {
            gpuAcceleration: false
          };
        }
      },
      id: String
    },

    methods: {
      select(item) {
        this.dispatch('VuiAutocomplete', 'item-click', item);
      }
    },

    updated() {
      this.$nextTick(_ => {
        this.popperJS && this.updatePopper();
      });
    },

    mounted() {
      this.$parent.popperElm = this.popperElm = this.$el;
      this.referenceElm = this.$parent.$refs.input.$refs.input;
      this.referenceList = this.$el.querySelector('.vui-autocomplete-suggestion__list');
      this.referenceList.setAttribute('role', 'listbox');
      this.referenceList.setAttribute('id', this.id);
    },

    created() {
      this.$on('visible', (val, inputWidth) => {
        this.dropdownWidth = inputWidth + 'px';
        this.showPopper = val;
      });
    }
  };
</script>
