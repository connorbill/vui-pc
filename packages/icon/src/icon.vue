<template>
  <i :class="'vui-icon-' + name"></i>
</template>

<script>
  export default {
    name: 'VuiIcon',

    props: {
      name: String
    }
  };
</script>
