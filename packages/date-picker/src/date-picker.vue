<template>
  <div class="vui-form-item " :class="{'is-error': error}">
    <div class="vui-form-item__content">
      <div :class="[
                {
                  'is-disabled': inputDisabled,
                }
                ]"
      >
        <div class="vui-date-width data-box get-date relative" :class="setClassName">
          <input
            class="vui-input__inner vui-date-width input-text normal-input carDate"
            :class="setClassName"
            v-bind="$attrs"
            :disabled="inputDisabled"
            :readonly="readonly"
            :autocomplete="autoComplete || autocomplete"
            ref="input"
            :value="value"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
            @click="dateFun(config)"
            :id="idName"
          >
          <span class="date-icon"></span>
        </div>
      </div>
      <div class="vui-form-item__error">{{errorTip}}</div>
    </div>
  </div>
</template>

<script>
  import { judgeValue } from '../../../src/funs/validate';

  export default {
    name: 'VuiDatePicker',
    data: function() {
      return {
        focused: false,
        error: false,
        errorTip: '',
        dateFun: '',
        changeValue: '',
        selfRule: '',
        config: {}
      };
    },
    props: {
      rule: [Array],
      value: [String, Number],
      disabled: {
        type: Boolean,
        default: false
      },
      readonly: Boolean,
      autocomplete: {
        type: String,
        default: 'off'
      },
      autoComplete: {
        type: String
      },
      validateEvent: {
        type: Boolean,
        default: true
      },
      className: {
        type: String
      },
      dateFormat: {
        type: String,
        default: 'yyyy-MM-dd'
      },
      option: {},
      idName: String

    },

    watch: {
      rule: {
        immediate: true,
        handler(newVal) {
          this.selfRule = newVal;
        }
      },
      option: {
        immediate: true,
        handler(newVal) {
          this.config = Object.assign(this.config, newVal);
        }
      }
    },
    computed: {
      setDateFormat() {
        return this.dateFormat;
      },
      setClassName() {
        return this.className;
      },
      inputDisabled() {
        return this.disabled;
      },
      nativeInputValue() {
        return this.value === null || this.value === undefined ? '' : String(this.value);
      }
    },
    methods: {
      setNativeInputValue() {
        const input = this.getInput();
        if (!input) return;
        if (input.value === this.nativeInputValue) return;
        input.value = this.nativeInputValue;
      },

      getInput() {
        return this.$refs.input || this.$refs.textarea;
      },
      focus() {
        (this.$refs.input || this.$refs.textarea).focus();
      },
      blur() {
        (this.$refs.input || this.$refs.textarea).blur();
      },
      handleBlur(event) {
        this.focused = false;
        this.$emit('blur', event);
      },
      select() {
        (this.$refs.input || this.$refs.textarea).select();
      },
      handleFocus(event) {
        this.focused = true;
        this.$emit('focus', event);
      },
      handleInput() {
        return;
      },
      handleChange(event) {
        this.$emit('input', event.target.value);
        this.$emit('change', event.target.value);
        this.$nextTick(() => {
          this.$refs.input.value = this.nativeInputValue;

          this.checkValue();
        });
      },
      setValue: function(th, va) {
        let that = this;
        let oldValue = this.$refs.input.value;
        if (va) {
          setTimeout(function() {
            that.$refs.input.value = va;
          }, 0);
          this.$emit('input', va);
          this.$emit('change', va);
          this.$nextTick(function() {
            this.$refs.input.value = va;
            this.checkValue();
          });
        } else {
          setTimeout(function() {
            that.$refs.input.value = oldValue;
          }, 0);
        }
      },
      checkValue: function() {
        let res = {
          isRight: true
        };
        let obj = {
          value: this.$refs.input.value,
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
          this.errorTip = '';
          res.isRight = true;
        }
        return res;
      }
    },
    created: function() {
      this.dateFun = window.WdatePicker;
      let that = this;
      let baseConfig = {
        dateFmt: that.setDateFormat,
        Mchanging: function(dp) {
          that.setValue(this);
        },
        ychanging: function(dp) {
          that.setValue(this);
        },
        onpicked: function(dp) {
          let va = dp.cal.getNewDateStr();
          that.setValue(this, va);
        },
        oncleared: function(dp) {
          that.setValue(this);
        }
      };
      this.config = Object.assign(baseConfig, this.config);
    },
    mounted() {
      this.setNativeInputValue();
    }
  };
</script>




