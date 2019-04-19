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
    <vui-upload
      action="/fkjdPictureDescriptionCtrl/uploadDescPicFile"
      name="imgData"
      accept="image/gif, image/png, image/jpg, image/jpeg"
      multiple
      auto-upload
      :limit="20"
      :before-upload="beforeFile"
      :on-all-file="getAllFile"
    ></vui-upload>
    <div class="title">分页组件</div>
    <vui-pager
      :total="total"
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
    ></vui-pager>
    <div class="title">省市区三级联动</div>
    <vui-addr
      :province-arr="allProvince"
    ></vui-addr>

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

  export default {
    name: 'VuiHome',
    data() {
      return {
        allProvince: [],
        total: 10000,
        currentPage: 2,
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
      [Addr.name]: Addr
    },
    created() {
      // console.log(this.rule);
      this.getProvince();
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
        // console.log(size);
        // console.log(this.showSize(file));
        if (size > 300 * 1024) {
          return {
            right: false,
            tip: '文件不能大于300kb'
          };
        }
        // console.log(file.split(',')[0])
        var base = file.split(',')[1];
        var typeStr = file.split(';')[0];

        var type = typeStr.split(':')[1];

        var imgValue = {
          path: '/fengkong/' + '20190416002' + '/JD_zhjyqk',
          imageType: type,
          baseData64: base
        };
        // console.log(imgValue)
        var param = {
          imgData: JSON.stringify(imgValue)
        };
        var back = {
          right: true,
          param: param,
          tip: ''
        };

        return back;
      },
      showSize: function(base64url) {
        // 获取base64图片大小，返回MB数字
        var str = base64url.replace('data:image/png;base64,', '');
        var equalIndex = str.indexOf('=');
        if (str.indexOf('=') > 0) {
          str = str.substring(0, equalIndex);
        }
        var strLength = str.length;
        var fileLength = strLength - (strLength / 8) * 2;
        // 由字节转换为MB
        var size = '';
        size = (fileLength / (1024 * 1024)).toFixed(2);
        var sizeStr = size + ''; // 转成字符串
        var index = sizeStr.indexOf('.'); // 获取小数点处的索引
        var dou = sizeStr.substr(index + 1, 2); // 获取小数点后两位的值
        if (dou === '00') { // 判断后两位是否为00，如果是则删除00
          return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
        }
        return size;
      },
      getAllFile: function(file) {
        console.log(file);
        this.willUploadImg = [].concat(file);

      },
      getProvince: function() {

        let config = {
          url: '/provinceCtrl/findHatProvinceAll',
          type: 'post',
          token: '',
          contentType: 'form',
          params: {}
        };
        let that = this;
        axiosRequest(config)
          .then(function(res) {
            that.allProvince = [].concat(res.data);
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
