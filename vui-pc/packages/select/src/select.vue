<template>
  <div class="vui-form-item " :class="{'is-error': error}">
    <div class="vui-form-item__content">
      <div :class="[
                {
                  'is-disabled': inputDisabled,
                }
                ]"
      >
        <select
          class="vui-select__inner"
          :class="setClassName"
          v-bind="$attrs"
          :disabled="inputDisabled"
          :autocomplete="autoComplete || autocomplete"
          ref="input"
          :value="nativeInputValue"
          @change="handleChange"

        >
          <option value="">{{sDefaultName}}</option>
          <option v-for="(item, index) in optionData" :key="index" :value="item[sId]">{{item[sName]}}</option>
        </select>
      </div>
      <div class="vui-form-item__error">{{errorTip}}</div>
    </div>
  </div>
</template>

<script>
  import { judgeValue } from '../../../src/funs/validate';

  export default {
    name: 'VuiSelect',
    data: function() {
      return {
        focused: false,
        error: false,
        errorTip: '',
        optionData: [],
        sId: '',
        sName: '',
        sDefaultName: '',
        sValue: ''
      };
    },
    props: {
      rule: [Array],
      value: {
        type: [String, Number],
        default: ''
      },
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
        type: String,
        default: 'off'
      },
      validateEvent: {
        type: Boolean,
        default: true
      },
      className: {
        type: String,
        default: ''
      },
      option: {
        type: Array,
        default: function() {
          return [];
        }
      },
      selectId: {
        type: String,
        default: ''
      },
      selectName: {
        type: String,
        default: ''
      },
      selectDefaultName: {
        type: String,
        default: '请选择'
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(newVal) {
          this.sValue = newVal;
        }
      },
      option: {
        immediate: true,
        handler(newVal) {
          this.optionData = [].concat(newVal);
        }
      },
      selectId: {
        immediate: true,
        handler(newVal) {
          this.sId = newVal;
        }
      },
      selectName: {
        immediate: true,
        handler(newVal) {
          this.sName = newVal;
        }
      },
      selectDefaultName: {
        immediate: true,
        handler(newVal) {
          this.sDefaultName = newVal;
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
        return this.$refs.input;
      },
      handleChange(event) {
        if (event.target.value === this.nativeInputValue) return;
        this.$emit('input', event.target.value);
        this.$emit('change', event.target.value);
        this.$nextTick(() => {
          this.$refs.input.value = this.nativeInputValue;
          this.checkValue();
        });
      },
      checkValue: function() {

        let obj = {
          value: this.nativeInputValue,
          rule: this.rule
        };
        // console.log(obj)
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
    }
  };

</script>



