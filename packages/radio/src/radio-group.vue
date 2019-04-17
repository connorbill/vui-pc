<template>
  <div class="vui-form-item " :class="{'is-error': error}">
    <div class="vui-form-item__content">
      <div
        class="vui-radio-group "
        role="radiogroup"
      >
        <div class="vui-radio__inner">
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
    name: 'VuiRadioGroup',
    data: function() {
      return {
        focus: false,
        errorTip: '',
        error: false
      };
    },
    mixins: [Emitter],
    componentName: 'VuiRadioGroup',
    props: {
      value: {},
      size: String,
      fill: String,
      textColor: String,
      disabled: Boolean,
      rule: Array
    },

    created() {
      this.$on('handleChange', function(value) {
        this.$emit('input', value);
        this.$emit('change', value);

        this.checkValue();
      });
    },
    mounted() {
      // 当radioGroup没有默认选项时，第一个可以选中Tab导航
      const radios = this.$el.querySelectorAll('[type=radio]');
      const firstLabel = this.$el.querySelectorAll('[role=radio]')[0];
      if (![].some.call(radios, radio => radio.checked) && firstLabel) {
        firstLabel.tabIndex = 0;
      }
    },
    methods: {

      checkValue: function() {
        var res = {
          isRight: true
        };
        var obj = {
          value: this.value,
          rule: this.rule
        };
        if (!this.rule) return res;
        var tip = judgeValue(obj);
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
    },
    watch: {
      // value(value) {
      //     this.$nextTick(function () {
      //         console.log(value)
      //         this.$emit('input', value);
      //         this.$emit('change', value);
      //     });
      // }
      value(value) {
        // this.dispatch('VuiFormItem', 'vui.form.change', [this.value]);
      }
    }
  };
</script>

<style scoped>

</style>




