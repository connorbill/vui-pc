<template>
  <div>
    <h2>Dialog 对话框</h2>
    <div @click="show">显示</div>
    <vui-dialog
      title="图片上传"
      :visible.sync="popPic.isShow"
      width="640px"
      :time="popPic.time"
    >
    </vui-dialog>
  </div>
</template>

<script>
  export default {
    name: 'DialogExample',
    data() {
      return {
        popPic: {
          isShow: false,
          time: 3000
        }
      };
    },
    methods: {
      show() {
        this.popPic.isShow = true;
        this.popPic.time = 5000;
      }
    }
  };
</script>

<style scoped>

</style>
