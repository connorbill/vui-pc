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
          >选择图片
          </vui-button>
          <vui-button
            type="primary"
            @click="startUp"
            :disabled="isLoadingImg"
          >点击上传
          </vui-button>
        </div>
        <div>
          <slot name="trigger"></slot>
          <slot name="tip">
            <div>

            </div>
          </slot>
        </div>
      </div>
      <div class="img-select-center">
        <div class="middle-left-wrap show-will-upload">
          <div v-for="(item, index) in willUploadImg" :key="index" class="img-box">
            <img :src="item.src" alt="">
            <div class="is-loading-img" v-show="item.isLoading">
              <i class="vui-icon-loading">
                <div class="m-load2">
                  <div class="line">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <div class="circlebg"></div>
                </div>
              </i>
            </div>
            <div v-if="item.hasUp" class="is-up-img">
              已上传
            </div>
            <div v-if="item.failure" class="is-up-img reup" @click="upPicList(item, index)">
              上传失败，点击重新上传
            </div>
            <div v-if="item.sizeError">{{item.tip}}</div>
            <div class="vui-close vui-close-style" @click="deleteWillUpload(index)" v-if="!isLoadingImg">
              <span class="close rounded thick"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axiosRequest from '../../../src/funs/axios-request';
  export default {
    name: 'VuiUpload',
    data: function() {
      return {

        popPic: {
          // 提示文字
          msg: '',
          // 是否显示 true显示， false隐藏
          isShow: false,
          // 如果是删除数组，则传数组的下标
          index: '',
          // 如果是删除数组，则传数组的下标的数据，不是的话，传有关删除数据的信息对象如 {id: 1, name:"abcd"}
          data: '',
          // 点击确定，执行函数
          fun: ''
        },
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
      accept: String,
      autoUpload: {
        type: Boolean,
        default: true
      },
      multiple: {
        type: Boolean,
        default: true
      },
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
    watch: {
      willUploadImg(val) {
        // if (val.length > 0){
        //     // this.allHasUp = false;
        // }
      }
    },
    created: function() {

      this.$on('clearData', function(value) {

        this.willUploadImg.splice(0, this.willUploadImg.length);
        this.fileNumber = 0;
        this.isLoadingImg = false;
      });
    },
    mounted: function() {

    },
    methods: {

      showPicPop: function() {
        this.popPic.isShow = true;
      },
      choiceImg() {
        this.$refs.filElem.dispatchEvent(new MouseEvent('click'));
      },

      // 获取到图片
      getFile: function() {
        var that = this;
        var inputFile = this.$refs.filElem.files;
        if (inputFile) {
          this.fileNumber = this.fileNumber + inputFile.length;
          for (var i = 0; i < inputFile.length; i++) {
            that.addSrc(inputFile[i], i);
          }
        }
      },
      addSrc: function(src, index) {
        var that = this;
        // console.log(index);
        var add = {
          src: '',
          name: src.name,
          size: src.size,
          hasUp: false,
          failure: false,
          isLoading: false,
          tip: '',
          sizeError: false,
          address: ''
        };
        var reader = new FileReader();
        reader.readAsDataURL(src);
        reader.onload = function(e) {
          add.src = this.result;
          that.willUploadImg.push(add);
          if (that.willUploadImg.length === that.fileNumber) {
            that.isLoadingImg = false;
          } else {
            that.isLoadingImg = true;
          }
        };
      },
      startUp: function() {
        // this.beforeUpload('beforeUpload',this.willUploadImg);
        var that = this;
        if (this.willUploadImg.length > 0) {
          this.isLoadingImg = true;
          for (var i = 0; i < this.willUploadImg.length; i++) {
            if (typeof this.beforeUpload === 'function') {
              var backObj = this.beforeUpload(this.willUploadImg[i].src);
              if (backObj.right) {
                this.upPicList(this.willUploadImg[i], i);
              } else {
                that.$set(this.willUploadImg[i], 'sizeError', false);
                that.$set(this.willUploadImg[i], 'tip', backObj.tip);
              }
            } else {
              this.upPicList(this.willUploadImg[i], i);
            }
          }
        }
      },
      upPicList: function(item, index) {
        var that = this;
        var imgBase = item.src.split(',')[1];
        var sendData = {
          [this.name]: imgBase
        };
        that.$set(this.willUploadImg[index], 'isLoading', true);
        var config = {
          url: this.action,
          type: 'post',
          token: '',
          contentType: 'form',
          params: sendData
        };
        var hasUp = this.willUploadImg[index].hasUp;
        if (!hasUp) {
          axiosRequest(config)
            .then(function(res) {
              console.log(res);
              if (res.code === '000000') {
                that.$set(that.willUploadImg[index], 'address', res.data.src);
                that.$set(that.willUploadImg[index], 'failure', false);
                that.$set(that.willUploadImg[index], 'hasUp', true);
                that.$set(that.willUploadImg[index], 'isLoading', false);
                // that.onSuccess(res, src);
                if (index === that.fileNumber - 1) {
                  that.backAllImg();
                }
              }
            })
            .catch(function() {
              that.$set(that.willUploadImg[index], 'address', '');
              that.$set(that.willUploadImg[index], 'failure', true);
              that.$set(that.willUploadImg[index], 'hasUp', false);
              that.$set(that.willUploadImg[index], 'isLoading', false);
              if (index === that.fileNumber - 1) {
                that.backAllImg();
              }
            });
        } else {
          if (index === this.fileNumber - 1) {
            that.backAllImg();
          }
        }
      },
      deleteWillUpload: function(index) {
        this.willUploadImg.splice(index, 1);
      },
      backAllImg: function() {
        var that = this;
        var allImg = [];
        this.isLoadingImg = false;
        for (var i = 0; i < that.willUploadImg.length; i++) {
          if (that.willUploadImg[i].hasUp) {
            allImg.push(that.willUploadImg[i].address);
          }
        }
        that.onAllFile(allImg);
      },
      // 确定插入图片
      confirmInit: function() {

      }
    }
  };
</script>

<style scoped>

</style>




