<template>
  <div class="page-container page-component">
    <div class="">
      <vui-scrollbar
        class="page-component__nav"
        wrap-class="page-component-wrap"
        scroll="seesaw"
      >
        <div class="nav-box side-nav">
          <ul>
            <li class="nav-item">
              <a>更新日志</a>
            </li>
            <li class="nav-item">
              <a>开发指南</a>
              <div class="nav-group">
                <ul class="pure-menu-list sub-nav">
                  <li class="nav-item">
                    <a>安装</a>
                  </li>
                  <li class="nav-item">
                    <a>快速上手</a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="nav-item">
              <a>组件</a>
              <div class="nav-group">
                <div class="nav-group__title">Basic</div>
                <ul class="pure-menu-list sub-nav">
                  <li class="nav-item">
                    <router-link :to="{ name: 'ButtonExample' }">Button 按钮</router-link>
                  </li>
                </ul>
              </div>
              <div class="nav-group">
                <div class="nav-group__title">Form</div>
                <ul class="pure-menu-list sub-nav">
                  <li class="nav-item">
                    <router-link :to="{ name: 'TableExample' }">table 表格</router-link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
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

<style>
  li{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  ul{
    margin: 0;
    padding: 0;
  }
  .nav-box{
    padding-top: 50px;
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

  .page-component .page-component-wrap{
    overflow-x: auto;
  }
  .page-container{
    margin: auto;
    width: 1140px;
  }
  .page-component .page-component__content {
    padding-left: 270px;
    padding-bottom: 100px;
    box-sizing: border-box;
    margin-top: 50px;
  }
  .page-component .page-component__nav {
    width: 240px;
    position: fixed;
    top: 0;
    bottom: 0;
    margin-top: 80px;
    transition: padding-top .3s;
  }
  .side-nav .nav-item a {
    font-size: 16px;
    color: #333;
    line-height: 40px;
    height: 40px;
    margin: 0;
    padding: 0;
    text-decoration: none;
    display: block;
    position: relative;
    transition: .15s ease-out;
    font-weight: 700;
  }
  .side-nav .nav-item .nav-item a {
    display: block;
    height: 40px;
    color: #444;
    line-height: 40px;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 400;
  }
  .side-nav .nav-group__title {
    font-size: 12px;
    color: #999;
    line-height: 26px;
    margin-top: 15px;
  }
  .side-nav>ul>.nav-item>a {
    margin-top: 15px;
  }
  .page-component__content h2{
    font-weight: 400;
    color: #1f2f3d;
    font-size: 28px;
    margin: 0;
  }
  .page-component__content p{
    font-size: 14px;
    color: #5e6d82;
    line-height: 1.5em;
  }
  .demo-block {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: .2s;
  }
  .demo-block {
    margin-bottom: 24px;
  }
  .demo-block .source {
    padding: 24px;
  }
  .demo-block .meta {
    background-color: #fafafa;
    border-top: 1px solid #eaeefb;
    overflow: hidden;
    height: 0;
    transition: height .2s;
  }
  .demo-block .description {
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    font-size: 14px;
    line-height: 22px;
    color: #666;
    word-break: break-word;
    margin: 10px;
    background-color: #fff;
  }
  .demo-block .description p {
    margin: 0;
    line-height: 26px;
  }
  .demo-block .description code {
    color: #5e6d82;
    background-color: #e6effb;
    margin: 0 4px;
    display: inline-block;
    padding: 1px 5px;
    font-size: 12px;
    border-radius: 3px;
    height: 18px;
    line-height: 18px;
  }
  .demo-block code {
    font-family: Menlo,Monaco,Consolas,Courier,monospace;
  }
  .demo-block .demo-block-control {
    border-top: 1px solid #eaeefb;
    height: 44px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .demo-block  .button--text {
    border-color: transparent;
    color: #409eff;
    background: transparent;
    padding-left: 0;
    padding-right: 0;
    font-size: 14px;
  }
</style>
