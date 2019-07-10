<template>
  <div class="vui-form-item " :class="{'is-error': error}">
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
          :type="showPassword ? 'password' : type"
          :disabled="inputDisabled"
          :readonly="readonly"
          :autocomplete="autoComplete || autocomplete"
          ref="input"
          @compositionstart="handleCompositionStart"
          @compositionend="handleCompositionEnd"
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
          @compositionstart="handleCompositionStart"
          @compositionend="handleCompositionEnd"
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
  /**
   *
   * 定义一个名为 vui-input 的新组件
   *
   * Attributes
   *@param {参数: type}   {说明: 绑定值} {类型: string }   {可选值: text / textarea}     {默认值: text}
   *@param {参数: value}   {说明: 绑定值} {类型: string/  number }   {可选值: }     {默认值: }
   *@param {参数: rule}   {说明: 校验规则}   {类型: Object}     {可选值: }     {默认值: }
   *@param {参数: disabled}   {说明: 禁用}   {类型: boolean}     {可选值: }     {默认值: false}
   *@param {参数: autocomplete}   {说明: 原生属性，自动补全}   {类型: string }     {可选值: on, off}     {默认值: off}
   *@param {参数: className}   {说明: 给select元素添加样式}   {类型: string }     {可选值: }     {默认值: }
   *@param {参数: placeholder}   {说明: placeholder}   {类型: string }     {可选值: }     {默认值: }
   *
   *
   * Input Events
   * blur {说明: 在 Input 失去焦点时触发} {回调参数: (event: Event) }
   * focus {说明: 在 Input 获得焦点时触发} {回调参数: (event: Event) }
   * change {说明: 在 Input 值改变时触发} {回调参数: (value: string | number) }
   */
  import { judgeValue } from '../../../src/funs/validate';

  export default {
    name: 'VuiInput',
    data() {
      return {
        isComposing: false,
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
      },
      showPassword: {
        type: Boolean,
        default: false
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
        if (this.isComposing) return;
        const input = this.getInput();
        if (!input) return;
        if (input.value === this.nativeInputValue) return;
        input.value = this.nativeInputValue;
        this.checkValue();
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
      handleCompositionStart() {
        this.isComposing = true;
      },
      handleCompositionEnd(event) {
        this.isComposing = false;
        this.handleInput(event);
      },
      handleInput(event) {
        if (this.isComposing) return;
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

        let obj = {
          value: this.nativeInputValue,
          rule: this.selfRule
        };
        if (!obj.rule) return;
        let tip = judgeValue(obj);
        let res = {
          isRight: true
        };
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
    mounted() {
      this.setNativeInputValue();
    }
  };
</script>




