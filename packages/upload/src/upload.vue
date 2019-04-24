<template>
  <div>
    <div>
      <input type="file"
             ref="filElem"
             class="select-img"
             id="select-img"
             :multiple="multiple"
             style="opacity: 0;width: 0;height: 0;"
             :accept="accept"
             @change="getFile"/>
      <div class="img-select-top">
        <div class="middle-left-wrap">
          <vui-button
            type="primary"
            @click="choiceImg"
            style="margin-right: 15px;"
            :disabled="isLoadingImg"
          >选择文件
          </vui-button>
          <vui-button
            v-if="!autoUpload"
            type="primary"
            @click="startUp"
            :disabled="isLoadingImg"
            style="margin-right: 15px;"
          >点击上传
          </vui-button>
          <div v-if="allTip">{{allTip}}</div>
        </div>
        <div>
          <slot name="trigger"></slot>
          <slot name="tip">
          </slot>
        </div>
      </div>
      <div class="img-select-center">
        <div class="middle-left-wrap show-will-upload">
          <div v-for="(item, index) in willUploadImg" :key="index" class="upload-list">
            <div class="img-box">
              <img :src="item.src" alt="">
              <div>

              </div>
              <!--<input type="file" :value="item.src">-->
              <div class="is-loading-img" v-show="item.isLoading">
                <i class="vui-icon-loading">

                  <div class="lds-spinner small">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </i>
              </div>
              <div v-if="item.hasUp" class="is-up-img">
                已上传
              </div>
              <div v-if="item.failure && !item.isLoading" class="is-up-img">
                上传失败
              </div>
              <div class="is-up-img tip" v-if="item.sizeError">{{item.tip}}</div>
              <div class="vui-close vui-close-style" @click="deleteWillUpload(index)" v-if="!isLoadingImg">
                <span class="close rounded thick"></span>
              </div>
            </div>
            <div class="img-name">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axiosRequest from '../../../src/funs/axios-request';
  import Button from '../../button/src/button';
  // import axios from 'axios';

  export default {
    name: 'VuiUpload',
    components: {
      [Button.name]: Button
    },
    data: function() {
      return {
        allTip: '',
        allHasUp: true,
        fileNumber: 0,
        willUploadImg: [
          // {
          //     name: '',
          //     src: 'http://www.w3school.com.cn/i/eg_tulip.jpg',
          //     hasUp: false,
          //     failure:false,
          //     isLoading: true,
          //       tip: '',
          // sizeError: '',
          // address: ''
          // },
          // {
          //     name: '',
          //     src: 'http://www.w3school.com.cn/i/eg_tulip.jpg',
          //     hasUp: true,
          //     failure:false,
          //     isLoading: false
          // }
        ],
        isLoadingImg: false,
        successUploadImg: [],
        errUploadImg: []
      };
    },

    componentName: 'VuiUpload',
    props: {
      isPop: {
        type: Boolean,
        default: true
      },
      action: {
        type: String,
        required: true
      },
      name: {
        type: String,
        default: 'imgData'
      },
      accept: {
        type: String,
        default: '*'
      },
      dataType: {
        type: String,
        default: 'base64'
      },
      autoUpload: {
        type: Boolean,
        default: false
      },
      multiple: {
        type: Boolean,
        default: true
      },
      onAfterUpload: Function,
      onStart: Function,
      onSuccess: Function,
      onError: Function,
      beforeUpload: Function,
      disabled: Boolean,
      limit: Number,
      onRemove: {
        type: Function,
        default: function() {
        }
      },
      onAllFile: Function,
      onProgress: Function,
      onExceed: Function
    },
    computed: {},
    created: function() {

      this.$on('clearData', function(value) {

        this.willUploadImg.splice(0, this.willUploadImg.length);
        this.fileNumber = 0;
        this.isLoadingImg = false;
        this.$refs.filElem.value = '';
      });
    },
    mounted: function() {

    },
    methods: {
      choiceImg() {
        if (this.limit > 0) {
          if (this.willUploadImg.length >= this.limit) {
            this.allTip = `上传文件数量不能大于${this.limit}`;
            return;
          } else {
            this.allTip = '';
          }
        }
        this.$refs.filElem.dispatchEvent(new MouseEvent('click'));
      },

      // 获取到图片
      getFile: function() {
        let that = this;
        let inputFile = this.$refs.filElem.files;
        if (inputFile) {
          if (this.limit > 0) {
            if (inputFile.length + that.willUploadImg.length > this.limit) {
              this.allTip = `上传文件数量不能大于${this.limit}`;
              return;
            }
          }
          this.fileNumber = that.willUploadImg.length + inputFile.length;
          for (let i = 0; i < inputFile.length; i++) {
            that.addSrc(inputFile[i], i);
          }
        }
      },
      addSrc: function(src) {
        let that = this;
        let add = {
          src: '',
          name: src.name,
          size: src.size,
          type: src.type,
          hasUp: false,
          failure: false,
          isLoading: false,
          tip: '',
          sizeError: false,
          address: '',
          file: src,
          res: ''
        };
        let reader = new FileReader();
        reader.readAsDataURL(src);
        reader.onload = function(e) {
          add.src = this.result;
          that.willUploadImg.push(add);
          if (that.willUploadImg.length === that.fileNumber) {
            that.isLoadingImg = false;
            if (that.autoUpload) {
              that.startUp();
            }
          } else {
            that.isLoadingImg = true;
          }
        };
      },
      startUp: function() {
        if (this.willUploadImg.length > 0) {
          this.isLoadingImg = true;
          for (let i = 0; i < this.willUploadImg.length; i++) {
            if (typeof this.beforeUpload === 'function') {
              let backObj = this.beforeUpload(this.willUploadImg[i].file, this.willUploadImg[i].size);
              // console.log(backObj)
              if (backObj.right) {
                this.upPicList(this.willUploadImg[i], i, backObj.param, this.willUploadImg[i].file);
              } else {
                this.$set(this.willUploadImg[i], 'sizeError', true);
                this.$set(this.willUploadImg[i], 'tip', backObj.tip);
                this.isLoadingImg = false;
              }
            } else {
              this.upPicList(this.willUploadImg[i], i);
            }
          }
        }
      },
      // upPicList2: function(item, index, param, file) {
      //   let that = this;
      //   // let imgBase = item.src.split(',')[1];
      //   // let sendData = {
      //   //     [this.name]: JSON.stringify(imgBase)
      //   // };
      //   if (this.willUploadImg[index].hasUp) {
      //     if (index === that.fileNumber - 1) {
      //       this.isLoadingImg = false;
      //     }
      //     return;
      //   }
      //   this.$set(this.willUploadImg[index], 'isLoading', true);
      //   let formData = new FormData();// FormData 对象
      //   formData.append('file', file);
      //   console.log(formData);
      //   param.param.file = formData;
      //   let config = {
      //     url: this.action + '?path=' + param.param.path,
      //     type: 'post',
      //     token: '',
      //     contentType: param.contentType,
      //     params: formData
      //   };
      //   let hasUp = this.willUploadImg[index].hasUp;
      //   if (!hasUp) {
      //     axiosRequest(config)
      //       .then(function(res) {
      //         // console.log(res);
      //         if (res.code === '000000') {
      //           that.$set(that.willUploadImg[index], 'address', res.data.imgUrl);
      //           that.$set(that.willUploadImg[index], 'failure', false);
      //           that.$set(that.willUploadImg[index], 'hasUp', true);
      //           that.$set(that.willUploadImg[index], 'isLoading', false);
      //           if (that.onSuccess) {
      //             that.onSuccess(res, res.data.imgUrl);
      //           }
      //         } else {
      //           that.$set(that.willUploadImg[index], 'address', '');
      //           that.$set(that.willUploadImg[index], 'failure', true);
      //           that.$set(that.willUploadImg[index], 'hasUp', false);
      //           that.$set(that.willUploadImg[index], 'isLoading', false);
      //           if (that.onError) {
      //             that.onError(res);
      //           }
      //         }
      //
      //         that.backAllImg();
      //       })
      //       .catch(function(err) {
      //         // console.log(err);
      //         that.$set(that.willUploadImg[index], 'address', '');
      //         that.$set(that.willUploadImg[index], 'failure', true);
      //         that.$set(that.willUploadImg[index], 'hasUp', false);
      //         that.$set(that.willUploadImg[index], 'isLoading', false);
      //         if (that.onError) {
      //           that.onError(err);
      //         }
      //
      //         that.backAllImg();
      //       });
      //   } else {
      //     if (index === this.fileNumber - 1) {
      //       that.backAllImg();
      //     }
      //   }
      // },
      upPicList: function(item, index, param, file) {
        let that = this;
        if (this.willUploadImg[index].hasUp) {
          if (index === that.fileNumber - 1) {
            this.isLoadingImg = false;
          }
          return;
        }
        this.$set(this.willUploadImg[index], 'isLoading', true);
        let config = {
          url: this.action,
          method: 'post',
          token: '',
          params: param.param,
          contentType: param.contentType,
          data: param.data
        };
        axiosRequest(config)
          .then(function(res) {
            // console.log(res);
            // that.$set(that.willUploadImg[index], 'address', res.data.url);
            that.$set(that.willUploadImg[index], 'res', res);
            that.$set(that.willUploadImg[index], 'failure', false);
            that.$set(that.willUploadImg[index], 'hasUp', true);
            that.$set(that.willUploadImg[index], 'isLoading', false);
            if (that.onAfterUpload) {
              that.onAfterUpload(res, index);
            }
            that.backAllImg();
          })
          .catch(function(err) {
            // console.log(err);
            that.$set(that.willUploadImg[index], 'res', err);
            that.$set(that.willUploadImg[index], 'address', '');
            that.$set(that.willUploadImg[index], 'failure', true);
            that.$set(that.willUploadImg[index], 'hasUp', false);
            that.$set(that.willUploadImg[index], 'isLoading', false);
            if (that.onAfterUpload) {
              that.onAfterUpload(err, index);
            }
            that.backAllImg();
          });
      },
      deleteWillUpload: function(index) {
        this.fileNumber -= 1;
        this.willUploadImg.splice(index, 1);
      },
      backAllImg: function() {
        let that = this;
        let allImg = [];
        let load = false;
        that.willUploadImg.forEach(function(item) {
          if (item.isLoading) {
            load = true;
          }
        });
        if (load) return;
        this.isLoadingImg = false;
        for (let i = 0; i < that.willUploadImg.length; i++) {
          if (that.willUploadImg[i].hasUp) {
            allImg.push(that.willUploadImg[i].address);
          }
        }
        if (that.onAllFile) {
          that.onAllFile(that.willUploadImg);
        }
      }
    },
    beforeDestroy() {
      console.log(1);
    }
  };
</script>

<style scoped>

</style>




