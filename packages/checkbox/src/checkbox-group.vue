<template>
  <div class="vui-form-item " :class="{'is-error': error}">
    <div class="vui-form-item__content">
      <div
        class="vui-checkbox-group "
        role="checkbox-group"
      >
        <div class="vui-checkbox__inner">
          <slot></slot>
        </div>
      </div>

      <div class="vui-form-item__error">{{errorTip}}</div>
    </div>
  </div>
</template>

<script>
  import { judgeValue } from '../../../src/funs/validate';
  import Emitter from '../../../src/mixins/emitter';

  export default {
    name: 'VuiCheckboxGroup',
    data: function() {
      return {
        focus: false,
        errorTip: '',
        error: false
      };
    },
    componentName: 'VuiCheckboxGroup',
    mixins: [Emitter],

    props: {
      value: {},
      disabled: Boolean,
      min: Number,
      max: Number,
      size: String,
      fill: String,
      textColor: String,
      rule: Array
    },

    watch: {
      value(value) {
        // console.log(value);
        // this.dispatch('VuiFormItem', 'vui.form.change', [value]);
      }
    },
    created() {
      this.$on('change', function(value) {
        // this.$emit('input', value);
        // this.$emit('change', value);
        this.checkValue();
      });
    },
    methods: {

      checkValue: function() {
        let res = {
          isRight: true
        };
        let obj = {
          value: this.value,
          rule: this.rule
        };
        if (!this.rule) return res;
        let tip = judgeValue(obj);
        if (tip) {
          this.errorTip = tip;
          this.error = true;
          res.isRight = false;
        } else {
          this.error = false;
          res.isRight = true;
        }
        return res;
      }
    }
  };
</script>

<style scoped>

</style>




