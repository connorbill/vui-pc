<template>
  <div>
    <h2>Pagination 分页</h2>
    <vui-pager
      :total="total"
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
    ></vui-pager>
  </div>
</template>

<script>
  export default {
    name: 'PageExample',
    data() {
      return {
        total: 60,
        currentPage: 1
      };
    },
    methods: {
      handleCurrentChange(val) {
        console.log(val);
        // this.currentPage = val;
      }
    }
  };
</script>

<style scoped>

</style>
