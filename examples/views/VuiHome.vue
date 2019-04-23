<template>
  <div>
    <div class="title">input</div>
    <vui-input
      :ref="rule.ref.name"
      v-model="name"
      :rule="rule.rule.name"
    >
    </vui-input>
    <div class="title">按钮</div>
    <div class="middle-left-wrap">
      <vui-button type="primary" class-name="aaaa">新 增</vui-button>
      <div style="width: 20px;"></div>
      <vui-button type="primary" :loading="isLoading">新 增</vui-button>
    </div>
    <div class="title">上传图片组件</div>
    <!--accept="image/gif, image/png, image/jpg, image/jpeg"
      auto-upload-->
    <div class="title">分页组件</div>
    <vui-pager
      :total="total"
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
    ></vui-pager>
    <!--<div class="title">省市区三级联动</div>-->

    <vui-addr
      :province-arr="allProvince"
    ></vui-addr>

    <!--<input type="file">-->
    <button @click="popPic.isShow = true">上传</button>
    <button @click="popPic.isShow = true">上传</button>


    <vui-dialog
      title="图片上传"
      :visible.sync="popPic.isShow"
      width="640px"
    >
      <vui-upload
        action="/fileUpload/upload2"
        multiple
        :before-upload="beforeFile2"
        :on-after-upload="onAfterUpload"
        :on-all-file="getAllFile"
      ></vui-upload>
    </vui-dialog>

  </div>
</template>

<script>
  import {checkCardID, checkLicense, isRight, deepFreeze} from '../../src/funs/check-fun';
  import axiosRequest from '../../src/funs/axios-request';
  import Input from '../../packages/input/src/input';
  import Select from '../../packages/select/src/select';
  import Button from '../../packages/button/src/button';
  import Upload from '../../packages/upload/src/upload';
  import Pagination from '../../packages/pagination/src/pagination';
  import Addr from '../../packages/addr/src/addr';
  import Dialog from '../../packages/dialog/src/dialog';

  export default {
    name: 'VuiHome',
    data() {
      return {
        popPic: {
          isShow: false
        },
        allProvince: [],
        total: 59,
        currentPage: 1,
        isLoading: true,
        name: '111',
        rule: deepFreeze({
          rule: {
            // 营业执照号/身份证号
            name: [
              {require: true, tip: '此为必填项'},
              {define: this.checkCompanyId, tip: '请输入正确的营业执照号或身份证号'}
            ]
          }
        }),
        willUploadImg: []
      };
    },
    components: {
      [Input.name]: Input,
      [Select.name]: Select,
      [Button.name]: Button,
      [Upload.name]: Upload,
      [Pagination.name]: Pagination,
      [Addr.name]: Addr,
      [Dialog.name]: Dialog
    },
    created() {
      // console.log(this.rule);
      // this.getProvince();
      // this.getCity();
      // this.getLoanList();
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
      },

      beforeFile: function(file, size) {
        // console.log(file);
        // console.log(this.showSize(file));
        // if (size > 300 * 1024) {
        //   return {
        //     right: false,
        //     tip: '文件不能大于300kb'
        //   };
        // }
        var base64 = file.split(',')[1];
        // var typeStr = file.split(';base')[0];

        // var type = typeStr.split('data:')[1];

        var imgValue = {
          path: '/fengkong/' + '20190416002' + '/Qy_file',
          baseData64: base64
        };
        console.log(imgValue);
        var param = {
          param: {
            imgData: JSON.stringify(imgValue),
            path: imgValue.path
          },
          contentType: 'formdata'
        };
        var back = {
          right: true,
          param: param,
          tip: ''
        };

        return back;
      },
      getAllFile: function(file) {
        console.log(file);
        this.willUploadImg = [].concat(file);

      },
      beforeFile2: function(file, size) {
        // console.log(file);
        // console.log(this.showSize(file));
        // if (size > 300 * 1024) {
        //   return {
        //     right: false,
        //     tip: '文件不能大于300kb'
        //   };
        // }
        // var base64 = file.split(',')[1];
        // var typeStr = file.split(';base')[0];

        // var type = typeStr.split('data:')[1];

        var imgValue = {
          path: '/fengkong/20190416002/Qy_file'
        };
        console.log(imgValue);

        let formData = new FormData();// FormData 对象
        formData.append('file', file);
        var params = {
          param: {
            path: imgValue.path
          },
          contentType: 'formdata',
          data: formData
        };
        var back = {
          right: true,
          param: params,
          tip: ''
        };

        return back;
      },
      onAfterUpload: function(res) {
        console.log(res);
      },
      getProvince: function() {

        let config = {
          url: '/provinceCtrl/findHatProvinceAll',
          method: 'post',
          token: '',
          contentType: 'form',
          params: {}
        };
        // 110000
        let that = this;
        axiosRequest(config)
          .then(function(res) {
            console.log(res);
            that.allProvince = [].concat(res.data);
          });
      },
      getCity: function() {

        let config = {
          url: '/provinceCtrl/findByCityParentCode',
          method: 'post',
          token: '',
          contentType: 'form',
          data: {
            code: 110000
          }
        };
        // 110000
        // let that = this;
        axiosRequest(config)
          .then(function(res) {
          });
      },

      getLoanList: function() {
        var config = {
          url: '/fkqyStoreReviewCtrl/fkqyStoreReviewList',
          method: 'post',
          token: '',
          contentType: 'form',
          data: {}
        };
        axiosRequest(config)
          .then(function(res) {
            console.log(res);
            if (res.code === '000000') {
              //  that.loanPlan.list = [].concat();
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    }
  };

</script>

<style scoped>
  .title {
    font-size: 20px;
    padding: 50px 10px 10px;
  }
</style>
