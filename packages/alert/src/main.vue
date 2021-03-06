<template>
  <transition name="vui-alert-fade">
    <div
      class="vui-alert"
      :class="[typeClass, center ? 'is-center' : '']"
      v-show="visible"
      role="alert"
    >
      <i class="vui-alert__icon" :class="[ iconClass, isBigIcon ]" v-if="showIcon"></i>
      <div class="vui-alert__content">
        <span class="vui-alert__title" :class="[ isBoldTitle ]" v-if="title || $slots.title">
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="vui-alert__description" v-if="$slots.default && !description"><slot></slot></p>
        <p class="vui-alert__description" v-if="description && !$slots.default">{{ description }}</p>
        <i class="vui-alert__closebtn" :class="{ 'is-customed': closeText !== '', 'vui-icon-close': closeText === '' }" v-show="closable" @click="close()">{{closeText}}</i>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  const TYPE_CLASSES_MAP = {
    'success': 'vui-icon-success',
    'warning': 'vui-icon-warning',
    'error': 'vui-icon-error'
  };
  export default {
    name: 'VuiAlert',

    props: {
      title: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'info'
      },
      closable: {
        type: Boolean,
        default: true
      },
      closeText: {
        type: String,
        default: ''
      },
      showIcon: Boolean,
      center: Boolean
    },

    data() {
      return {
        visible: true
      };
    },

    methods: {
      close() {
        this.visible = false;
        this.$emit('close');
      }
    },

    computed: {
      typeClass() {
        return `vui-alert--${ this.type }`;
      },

      iconClass() {
        return TYPE_CLASSES_MAP[this.type] || 'vui-icon-info';
      },

      isBigIcon() {
        return this.description || this.$slots.default ? 'is-big' : '';
      },

      isBoldTitle() {
        return this.description || this.$slots.default ? 'is-bold' : '';
      }
    }
  };
</script>
