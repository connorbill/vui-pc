<template>
  <div>

    <vui-pager
      :total="total"
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
    ></vui-pager>
  </div>
</template>

<script>
  import Pagination from '../../../packages/pagination/src/pagination';
  export default {
    name: 'PageExample',
    components: {
      [Pagination.name]: Pagination
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
