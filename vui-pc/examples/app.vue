<template>
  <div id="app" >
    <div class="header-menu">
      <div>vui-pc</div>
      <div>组件文档</div>
    </div>
    <div class="main-cnt">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',

    computed: {
    },

    methods: {
    },

    mounted() {
    }
  };
</script>
<style>
  .header-menu{
    width: 1140px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    height: 70px;
    align-items: center;
    background-color: pink;
  }
</style>
