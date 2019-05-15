<template>
  <div class="lds-spinner small-less " :class="['loading-' + setColor]">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>
<script>
export default {
  name: 'VuiIconLoading',
  props: {
    color: {
      type: String,
      default: 'white'
    }
  },
  computed: {
    setColor() {
      return this.color;
    }
  }
};
</script>
