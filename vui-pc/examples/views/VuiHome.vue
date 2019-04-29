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
      ref="addr"
      :province-arr="allProvince"
      :address-obj="{
        'provinceId': 230000,
        'cityId': 230400,
        'areaId': 230404,
        'address': '向阳工业园区133号'
      }"
      @addresstext="change"
    ></vui-addr>

    <!--<input type="file">-->
    <button @click="upFile">上传</button>
    <button @click="popPic.isShow = true">上传</button>


    <vui-dialog
      title="图片上传"
      :visible.sync="popPic.isShow"
      width="640px"
      modal
      fullscreen
    >
      <vui-upload
        action="/fileUpload/upload2"
        multiple
        :accept="accept"
        :on-remove="remove"
        :before-upload="beforeFile2"
        :on-after-upload="onAfterUpload"
        :on-all-file="getAllFile"
        :on-change="onChangeFile"
      ></vui-upload>

      <template v-slot:footer class="dialog-footer">
        <div class="middle-right-wrap">
          <vui-button type="primary" plain>取 消</vui-button>
          <div class="w-1"></div>
          <vui-button type="primary">保存图片</vui-button>
        </div>
      </template>
    </vui-dialog>

    <div @click="changeCol(1)" style="height: 50px;margin: 30px;background-color: pink;">减列</div>
    <div @click="changeCol(2)" style="height: 50px;margin: 30px;background-color: pink;">加列</div>

    <vui-table
      :data="list"
      :property="property"
    >

    </vui-table>

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
  import Table from '../../packages/table/src/table';

  export default {
    name: 'VuiHome',
    data() {
      return {
        accept: 'image/jpeg',
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
        willUploadImg: [],
        list: [1, 2, 3, 4, 5, 6],
        property: []
      };
    },
    components: {
      [Input.name]: Input,
      [Select.name]: Select,
      [Button.name]: Button,
      [Upload.name]: Upload,
      [Pagination.name]: Pagination,
      [Addr.name]: Addr,
      [Dialog.name]: Dialog,
      [Table.name]: Table
    },
    created() {
      // console.log(this.rule);
      this.getProvince();
      // this.getCity();
      // this.getLoanList();
    },
    mounted() {
      var that = this;
      setTimeout(function() {
        that.property = [].concat([{
          headTitle: '序号', // 表头名称
          width: 60, // 这一列宽度
          prop: '',
          slot: 'indexSlot',
          fixed: 'left', // 固定在左侧
          className: '',
          position: '',
          type: 'index' // 字段类型 index 为序号，
        },
        {
          headTitle: '借款主体',
          width: 150,
          prop: 'storeName',
          slot: 'storeName',
          className: '',
          fixed: 'left',
          type: ''
        },
        {
          headTitle: '借款金额（元）',
          width: 150,
          prop: 'appropriationAmount',
          slot: 'appropriationAmount',
          className: '',
          fixed: '',
          type: ''
        },
        {
          // 单位 ： period_unit 0 月， 1 日
          headTitle: '借款期限',
          width: 100,
          prop: 'appropriationDate',
          slot: 'appropriationDate',
          className: '',
          fixed: '',
          type: ''
        },
        {
          headTitle: '还款方式',
          width: 150,
          prop: 'repaymentType',
          slot: 'repaymentType',
          className: '',
          fixed: '',
          type: ''
        },
        {
          headTitle: '借款利率（%）',
          width: 110,
          prop: 'lendingRate',
          slot: 'lendingRate',
          className: '',
          fixed: '',
          type: ''
        },
        {
          headTitle: '居间服务费率（%）',
          width: 130,
          prop: 'serviceTariffing',
          slot: 'serviceTariffing',
          className: '',
          fixed: '',
          type: ''
        },
        {
          headTitle: '实际控制人',
          width: 100,
          prop: 'ctrlName',
          slot: 'ctrlName',
          className: '',
          fixed: '',
          type: ''
        },
        {
          headTitle: '评审通过时间',
          width: 150,
          prop: 'reviewTime',
          slot: 'reviewTime',
          className: '',
          fixed: '',
          type: ''
        },
        {
          // 经营贷
          headTitle: '借款类型',
          width: 100,
          prop: 'loanType',
          slot: 'loanType',
          className: '',
          fixed: '',
          type: ''
        },
        {
          headTitle: '客户经理',
          width: 100,
          prop: 'supName',
          slot: 'supName',
          className: '',
          fixed: '',
          type: ''
        },
        {
          headTitle: '所属区域',
          width: 100,
          prop: 'departmentName',
          slot: 'departmentName',
          className: '',
          fixed: '',
          type: ''
        },
        {
          headTitle: '项目编号',
          width: 110,
          prop: 'number',
          slot: 'number',
          className: '',
          fixed: '',
          type: ''
        },
        {
          headTitle: '项目编号',
          width: 110,
          prop: 'number',
          slot: 'number',
          className: '',
          fixed: '',
          type: ''
        },
        {
          headTitle: '项目编号',
          width: 110,
          prop: 'number',
          slot: 'number',
          className: '',
          fixed: '',
          type: ''
        },
        {
          headTitle: '项目编号',
          width: 110,
          prop: 'number',
          slot: 'number',
          className: '',
          fixed: '',
          type: ''
        },
        {
          headTitle: '项目编号',
          width: 110,
          prop: 'number',
          slot: 'number',
          className: '',
          fixed: '',
          type: ''
        },
        {
          headTitle: '项目编号',
          width: 110,
          prop: 'number',
          slot: 'number',
          className: '',
          fixed: '',
          type: ''
        },
        {
          headTitle: '项目编号',
          width: 110,
          prop: 'number',
          slot: 'number',
          className: '',
          fixed: '',
          type: ''
        },
        {
          headTitle: '项目编号',
          width: 110,
          prop: 'number',
          slot: 'number',
          className: '',
          fixed: '',
          type: ''
        },
        {
          headTitle: '状态',
          width: 100,
          prop: 'statusName',
          slot: 'statusName',
          className: '',
          fixed: '',
          type: ''
        },
        {
          headTitle: '操作',
          width: 120,
          prop: '',
          slot: 'operator',
          fixed: 'right',
          className: '',
          type: ''
        }]);
      }, 3000);
    },
    methods: {
      upFile: function() {
        this.accept = 'image/*';
        this.popPic.isShow = true;
      },
      changeCol: function(a) {
        if (a === 1) {
          this.property.splice(2, 1);
          this.list.splice(1, 1);
        } else {
          this.property.push(
            {
              headTitle: '状态',
              width: 100,
              prop: 'statusName',
              slot: 'statusName',
              className: '',
              fixed: '',
              type: ''
            });
          this.list.push(5);
        }
      },
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
      change: function(v) {
        console.log(v);
        // console.log(this.$refs.addr.province);
        // let id = this.$refs.addr.province;
        // var text = this.allProvince.find(item => item.provinceid === id)['province'];
        // console.log(text);
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
      onChangeFile: function(file, list) {
        console.log(file, list);
      },
      remove: function(obj, list) {
        console.log(obj);
        console.log(list);
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
