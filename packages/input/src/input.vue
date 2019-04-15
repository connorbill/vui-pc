<template>

    <div class="vui-form-item " :class="{'is-error': error}" >
        <div class="vui-form-item__content">
            <div :class="[
                type === 'textarea' ? 'vui-textarea' : 'vui-input',
                {
                  'is-disabled': inputDisabled,
                }
                ]"
            >
                <input
                        v-if="type !== 'textarea'"
                        class="vui-input__inner"
                        :class="setClassName"
                        v-bind="$attrs"
                        :type="type"
                        :disabled="inputDisabled"
                        :readonly="readonly"
                        :autocomplete="autoComplete || autocomplete"
                        ref="input"
                        @input="handleInput"
                        @focus="handleFocus"
                        @blur="handleBlur"
                        @change="handleChange"
                >
                <textarea
                        v-else
                        class="vui-textarea__inner"
                        :class="setClassName"
                        @input="handleInput"
                        ref="textarea"
                        v-bind="$attrs"
                        :disabled="inputDisabled"
                        :readonly="readonly"
                        :autocomplete="autoComplete || autocomplete"
                        @focus="handleFocus"
                        @blur="handleBlur"
                        @change="handleChange"
                >
                    </textarea>
            </div>
            <div class="vui-form-item__error">{{errorTip}}</div>
        </div>
    </div>
</template>

<script>
  import { judgeValue } from '../../../src/funs/check-fun';
  export default {
    name: 'VuiInput',
    data() {
      return {
        errorTwo: false,
        focused: false,
        error: false,
        errorTip: '',
        selfRule: ''
      };
    },
    props: {
      rule: {
        type: [String, Array],
        default: function() {
          return '';
        }
      },
      value: [String, Number],
      disabled: {
        type: Boolean,
        default: false
      },
      readonly: Boolean,
      type: {
        type: String,
        default: 'text'
      },
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
        type: [Array, String],
        default: ''
      }
      // placeholder:{
      //     type: String,
      //     default: ''
      // }
    },
    watch: {
      rule: {
        immediate: true,
        handler(newVal) {
          this.selfRule = newVal;
        }
      },
      value: {
        immediate: true,
        handler(newVal) {
          this.setNativeInputValue();
        }
      }
    },
    computed: {
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
      handleInput(event) {
        if (event.target.value === this.nativeInputValue) return;
        this.$emit('input', event.target.value);
        this.$nextTick(function() {
          const input = this.getInput();
          input.value = this.nativeInputValue;

          this.checkValue();
        });
      },
      handleChange(event) {
        this.$emit('change', event.target.value);
        this.$nextTick(function() {
          const input = this.getInput();
          input.value = this.nativeInputValue;
          this.checkValue();
        });
      },
      checkValue: function() {

        var obj = {
          value: this.nativeInputValue,
          rule: this.selfRule
        };
        if (!obj.rule) return;
        var tip = judgeValue(obj);
        var res = {
          isRight: true
        };
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
    mounted() {
      this.setNativeInputValue();
    }
  };
</script>

<style scoped>

</style>




