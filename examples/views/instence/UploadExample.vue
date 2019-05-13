<template>
  <div>
    <h2>Upload 上传</h2>
    <div class="title">上传图片组件</div>
    <!--accept="image/gif, image/png, image/jpg, image/jpeg"
      auto-upload-->
    <button @click="upFile">上传</button>
    <button @click="popPic.isShow = true">上传</button>
    <vui-dialog
      title="图片上传"
      :visible.sync="popPic.isShow"
      width="640px"
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
  </div>
</template>

<script>
  import Dialog from '../../../packages/dialog/src/dialog';
  import Upload from '../../../packages/upload/src/upload';

  export default {
    name: 'UploadExample',
    data() {
      return {
        accept: 'image/jpeg',
        popPic: {
          isShow: false
        },
        allProvince: [],
        willUploadImg: []
      };
    },
    components: {
      [Upload.name]: Upload,
      [Dialog.name]: Dialog
    },
    methods: {
      upFile: function() {
        this.accept = 'image/*';
        this.popPic.isShow = true;
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
      }
    }
  };
</script>

<style scoped>

</style>
