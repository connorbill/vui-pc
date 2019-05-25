<template>
  <div>
    <h2>按钮</h2>
    <p>常用的操作按钮。</p>
    <div class="demo-block">
      <div class="source">
        <div>
          <div class="middle-left-wrap">
            <vui-button type="primary" class-name="aaaa">新 增</vui-button>
            <div style="width: 20px;"></div>
            <vui-button type="primary" :loading="isLoading">新 增</vui-button>
          </div>
        </div>
      </div>
      <div class="meta" >
        <div class="description">
          <div><p>使用<code>type</code>、<code>plain</code>、<code>round</code>和<code>circle</code>属性来定义 Button 的样式。</p>
          </div>
        </div>
      </div>
      <div class="demo-block-control" style="left: 0px;">
        <i class="el-icon-caret-top"></i>
        <span style="display: none;">隐藏代码</span>
        <span class="button--text">在线运行</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ButtonExample',
    data() {
      return {
        isLoading: true
      };
    }
  };
</script>

<style>
  .a {
    width: 1px;
  }
</style>
