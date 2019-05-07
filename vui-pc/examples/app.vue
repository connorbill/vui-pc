<template>
  <div id="app" >
    <div class="header-menu">
      <div class="header-logo">
        <div class="vui-icon"></div>
        <div class="vui-icon-name">vui-pc</div>
      </div>
      <div class="header-list">
        <div class="header-item"><a >指南</a></div>
        <div class="header-item"><a >组件</a></div>
        <div class="header-item"><a >版本</a></div>
      </div>
    </div>
    <div class="main-cnt">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Input from '../packages/input/src/input';
  export default {
    name: 'app',
    components: {
      [Input.name]: Input
    },

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
    border-bottom: 1px solid #dcdfe6;
  }
  .header-logo{
    display: flex;
    align-items: center;
  }
  .vui-icon-name{
    margin-left: 10px;
    text-decoration: none;
    color: #1989fa;
  }
  .vui-icon-name:hover {
     opacity: 1;
  }
  .vui-icon{
    background-image: url("./assets/images/logo.png");
    width: 50px;
    height: 50px;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
  }
  .header-list{
    display: flex;
  }
  .header-item a{
    margin-left: 60px;
    text-decoration: none;
    color: #1989fa;
    opacity: .5;

  }
  .header-item a:hover {
    opacity: 1;
  }
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
  }

</style>
