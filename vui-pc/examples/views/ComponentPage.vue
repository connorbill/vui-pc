<template>
  <div class="page-container page-component">
    <div class="page-component__nav">
      <vui-scrollbar>
        <li>
          组件列表，点击查看详情
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">table 表格</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">2</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ComponentTable' }">1</router-link>
        </li>
      </vui-scrollbar>
    </div>
    <div class="page-component__content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Scrollbar from '../../packages/scrollbar/src/main';
  export default {
    name: 'ComponentPage',
    components: {
      [Scrollbar.name]: Scrollbar
    }
  };
</script>

<style scoped>
  li{
    list-style: none;
  }
  .page-component__nav li a{
    display: block;
    height: 40px;
    color: #444;
    line-height: 40px;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 400;
    text-decoration: none;
  }
  .page-container{
    margin: auto;
    width: 1140px;
  }
  .page-component .page-component__content {
    padding-left: 270px;
    padding-bottom: 100px;
    box-sizing: border-box;
  }
  .page-component .page-component__nav {
    width: 240px;
    position: fixed;
    top: 0;
    bottom: 0;
    margin-top: 80px;
    transition: padding-top .3s;
  }
</style>
