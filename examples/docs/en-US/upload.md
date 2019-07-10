## Upload

Upload files by clicking

### Click to upload files

:::demo Customize upload button type and text using `slot`. Set `limit` and `before-upload` to limit the maximum number of uploads allowed and specify method when the limit is exceeded. Plus, you can abort removing a file in the `before-remove` hook.
```html
<vui-button @click="upFile">Click to upload</vui-button>
<vui-dialog
  title="Upload file"
  :visible.sync="upload.isShow"
  width="500px"
>
  <vui-upload
    action="/fileUpload/upload2"
    :accept="upload.accept"
    :multiple="upload.multiple"
    :auto-upload="upload.autoUpload"
    :limit="upload.limit"
    :before-upload="beforeFile"
    :on-all-file="getAllFile"
    :on-remove="onRemove"
  >
  </vui-upload>
  <template v-slot:footer class="dialog-footer">
    <div class="middle-right-wrap">
      <vui-button @click="upload.isShow = false" type="primary" plain>Cansel</vui-button>
      <div style="margin-right: 15px;"></div>
      <vui-button
        type="primary"
        :loading="upload.isSaving"
        @click="judgeUpload()"
        :disabled="upload.disabled"
      >add file</vui-button>
    </div>
  </template>
</vui-dialog>
<script>
  export default {
    data() {
      return {
        upload: {
          isShow: false,
          isSaving: false,
          autoUpload: true,
          multiple: false,
          accept: '*',
          limit: 1,
          disabled: true,
          type: 0,
          pathType: 'path',
          agenciesId: '',
          agenciesNo: '',
          index: '',
          index2: '',
          fileIndex: '',
          num: 0,
        }
      };
    },
    methods: {
      upFile: function(obj, num) {
        //id, type, pathType, agenciesNo
        this.upload.limit = 20;
        this.upload.multiple = true;
        this.upload.id = '';
        this.upload.type = '';
        this.upload.pathType = '';
        this.upload.agenciesId = '';
        this.upload.agenciesNo = '';
        this.upload.num = 0;
        this.upload.index = '';
        this.upload.index2 = '';
  
        this.upload.isShow = true;
        this.upload.disabled = true;
      },
      beforeFile: function(file, size) {
        if (size > 20 * 1024 * 1024) {
          return {
            right: false,
            tip: 'no more than 20M'
          };
        }
  
        var fileValue = {
          path: '/fengkong/' + 20191234 + '/' + 20191234
        };
        let formData = new FormData();// FormData 对象
        formData.append('file', file);
        var params = {
          param: fileValue,
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
      onRemove: function(file, list, index) {
        this.getAllFile(list);
      },
      getAllFile: function(file) {
        var that = this;
        var hasOneTrue = false;
        this.willUploadImg = [].concat(file);
        var willUploadImg = this.$refs.uploadFileRef.willUploadImg;
        willUploadImg.forEach(function(item, index) {
          // Determine if the upload failed
          if (item.res) {
            if (item.res.code != '000000') {
              Vue.set(that.$refs.uploadFileRef.willUploadImg[index], 'hasUp', false);
              Vue.set(that.$refs.uploadFileRef.willUploadImg[index], 'failure', true);
            } else if (item.res.code == '000000') {
              hasOneTrue = true;
            }
          }
        });
        if (hasOneTrue) {
          this.upload.disabled = false;
        } else {
          this.upload.disabled = true;
        }
      },
      // Determine whether each file is successfully uploaded. If the upload is successful, add the file.
      judgeUpload: function() {
        var that = this;
        this.upload.isSaving = true;
        this.willUploadImg.forEach(function(item, index) {
          // Determine if the upload failed
          if (item.res.code == '000000') {
            var url = item.res.data.url;
            that.saveUpload(url, item.name);
          }
        });
      },
      // New signing document
      saveUpload: function(url, fileName) {
        let that = this;
        var sendData = {
          qyId: this.detailId,
          type: this.upload.type,
          path: url
        };
        let config = {
          url: '',
          method: 'post',
          contentType: 'form',
          data: sendData
        };
        axiosRequest(config)
          .then(function(res) {
            
          })
      },
    }
  }
</script>
```
:::


### Attribute
Attribute      | Description          | Type      | Accepted Values       | Default
|---------- |-------------- |---------- |--------------------------------  |-------- |
| action |required, request URL | string | — | — |
| multiple |  whether uploading multiple files is permitted  | boolean | — | — |
| accept | accepted [file types]| string | — | — |
| auto-upload |  whether to auto upload file | boolean | — | — |
| multiple | whether uploading multiple files is permitted | boolean | — | — |
| limit | maximum number of uploads allowed | number | — | — |
| on-after-upload | hook function when uploaded res: remote back data， index: number of file | function(res, index) | — | — |
| before-upload | Before each file is uploaded(File: all information about the current file information, size: file size)| function(file, size) | — | — |
| on-remove | Obj: deleted object information, fileList: the remaining file array, index: the index of the file before deletion in the array| function(obj, fileList, index) | — | — |
| on-all-file | Returns an array of all the information of the file when all the selected images have been uploaded and the interface has a callback. | function(fileList) | — | — |


