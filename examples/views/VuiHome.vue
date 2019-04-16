<template>
  <div>
    vui home,123,input
    <vui-input
      v-model="name">
    </vui-input>
  </div>
</template>

<script>
  import Input from '../../packages/input/src/input';
  import Select from '../../packages/select/src/select';
  import Addr from '../../packages/addr/src/addr';

  export default {
    name: 'VuiHome',
    data() {
      return {
        name: '111'
      };
    },
    components: {
      [Input.name]: Input,
      [Addr.name]: Addr,
      [Select.name]: Select
    }
  };

</script>

<style scoped>

</style>
