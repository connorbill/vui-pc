<template>
  <span
    class="vui-radio"
    :class="[
          border && radioSize ? 'vui-radio--' + radioSize : '',
          { 'is-disabled': isDisabled },
          { 'is-focus': focus },
          { 'is-bordered': border },
          { 'is-checked': model === label }
        ]"
    role="radio"
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="model = isDisabled ? model : label"
  >
    <span class="vui-radio__input"
          :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label
      }"
    >
      <span class="vui-radio__inner"></span>
      <input
        class="vui-radio__original"
        :value="label"
        type="radio"
        aria-hidden="true"
        v-model="model"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
        :name="name"
        :disabled="isDisabled"
        tabindex="-1"
      >
    </span>
    <span class="vui-radio__label" @keydown.stop>
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </span>
</template>

<script>
  import Emitter from '../../../src/mixins/emitter';

  export default {
    name: 'VuiRadio',
    data: function() {
      return {
        focus: false
      };
    },
    mixins: [Emitter],
    componentName: 'VuiRadio',
    props: {
      value: {},
      label: {},
      disabled: Boolean,
      name: String,
      border: Boolean,
      size: String
    },
    computed: {
      isGroup() {
        let parent = this.$parent;
        while (parent) {
          if (parent.$options.componentName !== 'VuiRadioGroup') {
            parent = parent.$parent;
          } else {
            this._radioGroup = parent;
            return true;
          }
        }
        return false;
      },
      model: {
        get() {
          return this.isGroup ? this._radioGroup.value : this.value;
        },
        set(val) {
          if (this.isGroup) {
            this.dispatch('VuiRadioGroup', 'input', [val]);
          } else {
            this.$emit('input', val);
          }
        }
      },
      isDisabled() {
        return this.isGroup
          ? this._radioGroup.disabled || this.disabled
          : this.disabled;
      },
      tabIndex() {
        return (this.isDisabled || (this.isGroup && this.model !== this.label)) ? -1 : 0;
      }
    },
    mounted: function() {
    },

    methods: {
      handleChange() {
        this.$nextTick(function() {
          this.$emit('change', this.model);
          this.$emit('input', this.model);
          this.isGroup && this.dispatch('VuiRadioGroup', 'handleChange', this.model);
        });
      }
    }
  };
</script>




