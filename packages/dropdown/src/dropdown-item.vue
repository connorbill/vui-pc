<template>
  <li
    class="vui-dropdown-menu__item"
    :class="{
      'is-disabled': disabled,
      'vui-dropdown-menu__item--divided': divided
    }"
    @click="handleClick"
    :aria-disabled="disabled"
    :tabindex="disabled ? null : -1"
  >
    <i :class="icon" v-if="icon"></i>
    <slot></slot>
  </li>
</template>
<script>
  import Emitter from 'vui-pc/src/mixins/emitter';

  export default {
    name: 'VuiDropdownItem',

    mixins: [Emitter],

    props: {
      command: {},
      disabled: Boolean,
      divided: Boolean,
      icon: String
    },

    methods: {
      handleClick(e) {
        this.dispatch('VuiDropdown', 'menu-item-click', [this.command, this]);
      }
    }
  };
</script>
