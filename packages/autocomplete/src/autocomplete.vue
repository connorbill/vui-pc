<template>
  <div
    class="vui-autocomplete"
    v-clickoutside="close"
    aria-haspopup="listbox"
    role="combobox"
    :aria-expanded="suggestionVisible"
    :aria-owns="id"
  >
    <vui-input
      :rule="selfRule"
      ref="input"
      v-bind="[$props, $attrs]"
      @input="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @clear="handleClear"
      @keydown.up.native.prevent="highlight(highlightedIndex - 1)"
      @keydown.down.native.prevent="highlight(highlightedIndex + 1)"
      @keydown.enter.native="handleKeyEnter"
      @keydown.native.tab="close"
    >
    </vui-input>
    <vui-autocomplete-suggestions
      visible-arrow
      :class="[popperClass ? popperClass : '']"
      :popper-options="popperOptions"
      :append-to-body="popperAppendToBody"
      ref="suggestions"
      :placement="placement"
      :id="id">
      <li
        v-for="(item, index) in suggestions"
        :key="index"
        :class="{'highlighted': highlightedIndex === index}"
        @click="select(item)"
        :id="`${id}-item-${index}`"
        role="option"
        :aria-selected="highlightedIndex === index"
      >
        <slot :item="item">
          {{ item[valueKey] }}
        </slot>
      </li>
    </vui-autocomplete-suggestions>
  </div>
</template>
<script>
  import debounce from 'throttle-debounce/debounce';
  import VuiInput from '../../../packages/input';
  import Clickoutside from '../../../src/utils/clickoutside';
  import VuiAutocompleteSuggestions from './autocomplete-suggestions.vue';
  import Emitter from '../../../src/mixins/emitter';
  import Migrating from '../../../src/mixins/migrating';
  import { generateId } from '../../../src/utils/util';
  import Focus from '../../../src/mixins/focus';
  // import {judgeValue} from '../../../src/funs/validate';

  export default {
    name: 'VuiAutocomplete',

    mixins: [Emitter, Focus('input'), Migrating],

    inheritAttrs: false,

    componentName: 'VuiAutocomplete',

    components: {
      VuiInput,
      VuiAutocompleteSuggestions
    },

    directives: { Clickoutside },

    props: {
      valueKey: {
        type: String,
        default: 'value'
      },
      popperClass: String,
      popperOptions: Object,
      placeholder: String,
      clearable: {
        type: Boolean,
        default: false
      },
      disabled: Boolean,
      name: String,
      size: String,
      value: String,
      maxlength: Number,
      minlength: Number,
      autofocus: Boolean,
      fetchSuggestions: Function,
      triggerOnFocus: {
        type: Boolean,
        default: true
      },
      customItem: String,
      selectWhenUnmatched: {
        type: Boolean,
        default: false
      },
      prefixIcon: String,
      suffixIcon: String,
      label: String,
      debounce: {
        type: Number,
        default: 300
      },
      placement: {
        type: String,
        default: 'bottom-start'
      },
      hideLoading: Boolean,
      popperAppendToBody: {
        type: Boolean,
        default: true
      },
      highlightFirstItem: {
        type: Boolean,
        default: false
      },
      rule: {
        type: [String, Array],
        default: function() {
          return '';
        }
      }
    },
    data() {
      return {
        activated: false,
        suggestions: [],
        loading: false,
        highlightedIndex: -1,
        suggestionDisabled: false,
        selfRule: ''
      };
    },
    computed: {
      suggestionVisible() {
        const suggestions = this.suggestions;
        let isValidData = Array.isArray(suggestions) && suggestions.length > 0;
        return (isValidData || this.loading) && this.activated;
      },
      id() {
        return `vui-autocomplete-${generateId()}`;
      }
    },
    watch: {
      suggestionVisible(val) {
        let $input = this.getInput();
        if ($input) {
          this.broadcast('VuiAutocompleteSuggestions', 'visible', [val, $input.offsetWidth]);
        }
      },
      rule: {
        immediate: true,
        handler(newVal) {
          this.selfRule = newVal;
        }
      }
    },
    methods: {
      getMigratingConfig() {
        return {
          props: {
            'custom-item': 'custom-item is removed, use scoped slot instead.',
            'props': 'props is removed, use value-key instead.'
          }
        };
      },
      getData(queryString) {
        if (this.suggestionDisabled) {
          return;
        }
        this.loading = true;
        this.fetchSuggestions(queryString, (suggestions) => {
          this.loading = false;
          if (this.suggestionDisabled) {
            return;
          }
          if (Array.isArray(suggestions)) {
            this.suggestions = suggestions;
            this.highlightedIndex = this.highlightFirstItem ? 0 : -1;
          } else {
            console.error('[Error][Autocomplete]autocomplete suggestions must be an array');
          }
        });
      },
      handleChange(value) {
        this.$emit('input', value);
        this.suggestionDisabled = false;
        if (!this.triggerOnFocus && !value) {
          this.suggestionDisabled = true;
          this.suggestions = [];
          return;
        }
        this.debouncedGetData(value);
        this.checkValue();
      },
      handleFocus(event) {
        this.activated = true;
        this.$emit('focus', event);
        if (this.triggerOnFocus) {
          this.debouncedGetData(this.value);
        }
      },
      handleBlur(event) {
        this.$emit('blur', event);
      },
      handleClear() {
        this.activated = false;
        this.$emit('clear');
      },
      close(e) {
        this.activated = false;
      },
      handleKeyEnter(e) {
        if (this.suggestionVisible && this.highlightedIndex >= 0 && this.highlightedIndex < this.suggestions.length) {
          e.preventDefault();
          this.select(this.suggestions[this.highlightedIndex]);
        } else if (this.selectWhenUnmatched) {
          this.$emit('select', {value: this.value});
          this.$nextTick(_ => {
            this.suggestions = [];
            this.highlightedIndex = -1;
          });
        }
      },
      select(item) {
        this.$emit('input', item[this.valueKey]);
        this.$emit('select', item);
        this.$nextTick(_ => {
          this.suggestions = [];
          this.highlightedIndex = -1;
        });
      },
      highlight(index) {
        if (!this.suggestionVisible || this.loading) { return; }
        if (index < 0) {
          this.highlightedIndex = -1;
          return;
        }
        if (index >= this.suggestions.length) {
          index = this.suggestions.length - 1;
        }
        const suggestion = this.$refs.suggestions.$el.querySelector('.el-autocomplete-suggestion__wrap');
        const suggestionList = suggestion.querySelectorAll('.el-autocomplete-suggestion__list li');

        let highlightItem = suggestionList[index];
        let scrollTop = suggestion.scrollTop;
        let offsetTop = highlightItem.offsetTop;

        if (offsetTop + highlightItem.scrollHeight > (scrollTop + suggestion.clientHeight)) {
          suggestion.scrollTop += highlightItem.scrollHeight;
        }
        if (offsetTop < scrollTop) {
          suggestion.scrollTop -= highlightItem.scrollHeight;
        }
        this.highlightedIndex = index;
        let $input = this.getInput();
        $input.setAttribute('aria-activedescendant', `${this.id}-item-${this.highlightedIndex}`);
      },
      getInput() {
        return this.$refs.input.getInput();
      },
      checkValue: function() {
        if (this.$refs.input) {
          if (this.$refs.input.checkValue) {
            this.$refs.input.checkValue();
          } else {
            return true;
          }
        } else {
          return true;
        }
        // let obj = {
        //   value: '',
        //   rule: this.selfRule
        // };
        // if (!obj.rule) return;
        // let tip = judgeValue(obj);
        // let res = {
        //   isRight: true
        // };
        // if (tip) {
        //   this.errorTip = tip;
        //   this.error = true;
        //
        //   res.isRight = false;
        // } else {
        //   this.error = false;
        //   this.errorTip = '';
        //   res.isRight = true;
        // }
        // return res;
      }
    },
    mounted() {
      this.debouncedGetData = debounce(this.debounce, this.getData);
      this.$on('item-click', item => {
        this.select(item);
      });
      let $input = this.getInput();
      $input.setAttribute('role', 'textbox');
      $input.setAttribute('aria-autocomplete', 'list');
      $input.setAttribute('aria-controls', 'id');
      $input.setAttribute('aria-activedescendant', `${this.id}-item-${this.highlightedIndex}`);
    },
    beforeDestroy() {
      this.$refs.suggestions.$destroy();
    }
  };
</script>
