<template>
  <div>
    vui home,123,input
    <div @click="save">保存</div>
    <!--<vui-input-->
    <!--:ref="rule.ref.name"-->
    <!--v-model="name"-->
    <!--:rule="rule.rule.name"-->
    <!--&gt;-->
    <!--</vui-input>-->
    <!--<vui-button type="primary" :loading="isLoading">新 增</vui-button>-->
    <!--<vui-upload-->
    <!--action="/abc/abc"-->
    <!--name="name"-->
    <!--&gt;</vui-upload>-->

    <vui-pager
      :total="total"
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
    ></vui-pager>


  </div>
</template>

<script>
  import { checkCardID, checkLicense, isRight, deepFreeze } from '../../src/funs/check-fun';
  import Input from '../../packages/input/src/input';
  import Select from '../../packages/select/src/select';
  import Button from '../../packages/button/src/button';
  import Upload from '../../packages/upload/src/upload';
  import Pagination from '../../packages/pagination/src/pagination';

  export default {
    name: 'VuiHome',
    data() {
      return {
        total: 10000,
        currentPage: 2,
        isLoading: true,
        name: '111',
        rule: deepFreeze({
          rule: {
            // 营业执照号/身份证号
            name: [
              { require: true, tip: '此为必填项' },
              { define: this.checkCompanyId, tip: '请输入正确的营业执照号或身份证号' }
            ]
          }
        })
      };
    },
    components: {
      [Input.name]: Input,
      [Select.name]: Select,
      [Button.name]: Button,
      [Upload.name]: Upload,
      [Pagination.name]: Pagination
    },
    created() {
      // console.log(this.rule);
    },
    methods: {
      handleCurrentChange(val) {
        console.log(val);
        // this.currentPage = val;
      },
      checkCompanyId() {
        console.log(checkCardID(this.name));
        console.log(checkLicense(this.name));
        console.log(checkCardID(this.name) || checkLicense(this.name));
        if (checkCardID(this.name) || checkLicense(this.name)) {
          return true;
        } else {
          return false;
        }
        // return true;
      },
      save() {
        if (!isRight(this.rule.ref, this)) {
          console.log('err');
        }
      }
    }
  };

</script>

<style scoped>

</style>
