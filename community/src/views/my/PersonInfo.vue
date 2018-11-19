<template>
    <div class="my">
        <van-cell-group class="ul-list">
            <div class="my-portrait-box">
                <!---->
                <van-uploader :after-read="onRead" :disabled="isComposing"
                              accept="image/png, image/jpeg"></van-uploader>
                <van-cell title="头像" is-link>
                    <template>
                        <span class="my-portrait">
                            <van-loading v-if="isComposing"/>
                            <img v-if="headImgUrls" :src="headImg" alt="">
                            <img v-if="!headImgUrls" src="../../assets/images/my/default_head.png" alt="">
                            <!--<input id="file" name="file" type="file" class="add-input file" accept="image/png,image/jpeg"-->
                            <!--:disabled="isDisabled"-->
                            <!--@change="imgPreview"/>-->
                        </span>
                    </template>
                </van-cell>
            </div>
            <van-field v-model="nickname" placeholder="设置个高大上的名字吧" label="昵称"  input-align="right" @input="checkNickNum"/>
            <van-cell title="性别" is-link @click="sexShowSelect" >
                <div :class="{unSelected: sex.selected}" v-text="sex.text"></div>
            </van-cell>
            <van-cell title="星座" is-link @click="ctlShowSelect">
                <div :class="{unSelected: constellation.selected}" v-text="constellation.text"></div>
            </van-cell>
            <!--<van-cell title="地区" is-link @click="areaShowSelect">-->
            <!--<div :class="{unSelected: area.selected}" v-if="area.selected" v-text="area.text"></div>-->
            <!--<div :class="{unSelected: area.selected}" v-if="!area.selected">-->
            <!--<span v-text="area.province"></span>-->
            <!--<span v-text="area.city" style="margin-left: .1rem"></span>-->
            <!--</div>-->
            <!--</van-cell>-->

            <van-field v-model="address" placeholder="请输入个人地址" label="地区"  input-align="right" @input="checkAreaStrNum"/>
            <van-field v-model="signature" placeholder="请填写" label="个性签名" input-align="right" @input="checkSignatureNum"/>
        </van-cell-group>

        <van-popup v-model="sex.show" position="bottom" >
            <van-picker show-toolbar :columns="sex.columns" :item-height="25"  @confirm="onSexConfirm" @cancel="onSexCancel"/>
        </van-popup>
        <van-popup v-model="constellation.show" position="bottom">
            <van-picker show-toolbar :columns="constellation.columns" @confirm="onCtlConfirm" @cancel="onCtlCancel"/>
        </van-popup>
        <van-popup v-model="area.show" position="bottom">
            <van-area :area-list="area.areaList" :columns-num="2" @confirm="onAreaConfirm" @cancel="onAreaCancel"/>
        </van-popup>
        <div @click="saveInfo" class="compose-btn" :class="isComposing ? 'click-forbid' : '' ">保存</div>
    </div>
</template>

<script>
    import { Cell, CellGroup, Field, Popup, Picker, Area, Uploader, Toast, Loading } from 'vant';
    import { commonFunction } from '../../common/CommonFunction';

    export default {
        name: 'PersonInfo',
        components: {
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Field.name]: Field,
            [Popup.name]: Popup,
            [Picker.name]: Picker,
            [Area.name]: Area,
            [Uploader.name]: Uploader,
            [Toast.name]: Toast,
            [Loading.name]: Loading
        },
        data () {
            return {
                oldPersonInfo: {
                    address: '',
                    sexValue: '',
                    starValue: '',
                    nickname: '',
                    headImgUrls: '',
                    signature: ''
                },
                address: '', // 地址
                sexValue: 1, // 性别
                starValue: 1, // 星座
                nickname: '', // 昵称
                headImgUrls: '', // 头像图片名字
                headImg: '', // 头像图片完整地址
                signature: '', // 签名
                // imgDataArr: '',
                // imgStrArr: '',
                isDisabled: false,
                isComposing: false,
                isComposingNum: false,
                autograph: '',
                sex: {
                    show: false, // 控制 性别 层显示隐藏
                    selected: true, // 改变样式
                    text: '请选择', // 性别 值
                    columns: [ // 性别选择框配置
                        {
                            text: '男',
                            value: 1
                        },
                        {
                            text: '女',
                            value: 2
                        }
                    ]
                },
                constellation: {
                    show: false,
                    selected: true,
                    text: '请选择',
                    columns: [
                        {
                            text: '白羊座',
                            value: 1
                        },
                        {
                            text: '金牛座',
                            value: 2
                        },
                        {
                            text: '双子座',
                            value: 3
                        },
                        {
                            text: '巨蟹座',
                            value: 4
                        },
                        {
                            text: '狮子座',
                            value: 5
                        },
                        {
                            text: '处女座',
                            value: 6
                        },
                        {
                            text: '天秤座',
                            value: 7
                        },
                        {
                            text: '天蝎座',
                            value: 8
                        },
                        {
                            text: '射手座',
                            value: 8
                        },
                        {
                            text: '摩羯座',
                            value: 10
                        },
                        {
                            text: '水平座',
                            value: 11
                        },
                        {
                            text: '双鱼座',
                            value: 12
                        }
                    ]
                },
                area: {
                    show: false,
                    selected: true,
                    text: '请选择',
                    province: '',
                    city: '',
                    areaList: {
                        province_list: {
                            110000: '北京市',
                            120000: '天津市'
                        },
                        city_list: {
                            110100: '北京市',
                            110200: '县',
                            120100: '天津市',
                            120200: '县'
                        },
                        county_list: {
                            110101: '东城区',
                            110102: '西城区',
                            110105: '朝阳区',
                            110106: '丰台区',
                            120101: '和平区',
                            120102: '河东区',
                            120103: '河西区',
                            120104: '南开区',
                            120105: '河北区'
                        }
                    }
                }
            };
        },
        created () {
            this.getUserInfo();
            // this.sex.text = '男';
        },
        methods: {


            /**
             * 控制 性别 层显示
             * */
            sexShowSelect (index) {
                this.sex.show = true;
            },
            onSexConfirm (values, index) { // 确认性别选择
                this.sex.show = false;
                this.sex.text = values.text;
                if (this.sex.text !== '请选择') {
                    this.sex.selected = false;
                } else {
                    this.sex.selected = true;
                }
            },
            onSexCancel (values) { // 取消性别选择
                this.sex.show = false;
            },
            ctlShowSelect () {
                this.constellation.show = true;
            },
            onCtlConfirm (values, index) {
                this.constellation.show = false;
                this.constellation.text = values.text;
                if (this.constellation.text !== '请选择') {
                    this.constellation.selected = false;
                } else {
                    this.constellation.selected = true;
                }
            },
            onCtlCancel (values) {
                this.constellation.show = false;
            },
            areaShowSelect () {
                this.area.show = true;
            },
            onAreaConfirm (values) {
                this.area.show = false;
                this.area.selected = false;
                this.area.province = values[0].name;
                this.area.city = values[1].name;
            },
            onAreaCancel (values) {
                this.area.show = false;
            },
            onRead (file) {
                this.isComposing = true;
                let self = this;
                let img = new Image();
                img.src = file.content;
                if (file.content <= (20 * 1000)) {
                    self.upImgFront(file.content);
                } else {
                    img.onload = function () {
                        let src = commonFunction.compressImg(img);
                        self.upImgFront(src);
                    };
                }
            },
            changeNickname () {
                // console.log(this.nickname)
            },
            getUserInfo () {
                this.$http.MyService.getUserInfo()
                    .then(res => {
                        this.userId = res.data[0].id;
                        this.nickname = res.data[0].nickname;
                        this.headImg = res.data[0].headImg;
                        // 获取头像图片的名字,保存头像的时候, 传的字段 headImg,只传图片名字
                        let headImgArr = res.data[0].headImg.split('/');
                        // this.headImgUrls = res.data[0].headImg.lastIndexOf('qx/');
                        this.headImgUrls = headImgArr[headImgArr.length - 1];
                        this.signature = res.data[0].signature;
                        this.address = res.data[0].address;
                        // console.log(this.headImg);
                        // console.log(this.headImgUrls);
                        // this.oldPersonInfo.nickname = this.nickname;
                        if (res.data[0].sex == 1) {
                            this.sex.text = '男';
                        } else {
                            this.sex.text = '女';
                        }
                        for (let i = 0; i < 12; i++) {
                            if (res.data[0].star == i) {
                                this.constellation.text = this.constellation.columns[i - 1].text;
                            }
                        }
                    })
                    .catch(err => {
                        if (err.code === '000003') {
                            commonFunction.toLogin();
                        }
                    });
            },
            saveInfo () {
                let nicknameTrim = commonFunction.trim(this.nickname);
                let nicknameLength = commonFunction.checkLength(nicknameTrim);
                let signatureTrim = commonFunction.trim(this.signature);
                let signatureLength = commonFunction.checkLength(signatureTrim);
                let areaStrTrim = commonFunction.trim(this.address);
                let areaStrLength = commonFunction.checkLength(areaStrTrim);

                if (nicknameLength === 0) {
                    Toast({
                        message: '昵称不能为空',
                        duration: 1000,
                        forbidClick: true
                    });
                    return;
                }
                if (nicknameLength < 2) {
                    Toast({
                        message: '昵称字数为2-15个字',
                        duration: 1000,
                        forbidClick: true
                    });
                    return;
                }
                if (nicknameLength > 15) {
                    Toast({
                        message: '昵称字数为2-15个字',
                        duration: 1000,
                        forbidClick: true
                    });
                    return;
                }
                if (signatureLength > 20) {
                    Toast({
                        message: '签名最多20个字',
                        duration: 1000,
                        forbidClick: true
                    });
                    return;
                }
                if (areaStrLength > 50) {
                    Toast({
                        message: '地址最多50个字',
                        duration: 1000,
                        forbidClick: true
                    });
                    return;
                }
                let sexNum = '';
                let starNum = '';

                if (this.sex.text == '男') {
                    sexNum = 1;
                } else if (this.sex.text == '女') {
                    sexNum = 2;
                }
                for (let i = 0; i < 12; i++) {
                    if (this.constellation.text == this.constellation.columns[i].text) {
                        starNum = i + 1;
                    }
                }
                if (this.isComposing) return;
                this.isComposing = true;
                // 传的字段 headImg,只传图片名字
                let sendData = {
                    nickname: nicknameTrim,
                    star: starNum,
                    sex: sexNum,
                    headImg: this.headImgUrls,
                    signature: signatureTrim,
                    address: areaStrTrim
                };
                // console.log(sendData);
                this.$http.MyService.setUserInfo(sendData)
                    .then(res => {
                        this.isComposing = false;
                        Toast({
                            message: res.message,
                            duration: 1000,
                            forbidClick: true
                        });
                        // this.$router.go(-1);
                    })
                    .catch(err => {
                        if (err.code === '000001') {
                            this.isComposing = false;
                            Toast({
                                message: err.message,
                                duration: 1000,
                                forbidClick: true
                            });
                        } else {
                            this.isComposing = false;
                            Toast({
                                message: err.message,
                                duration: 1000,
                                forbidClick: true
                            });
                        }
                    });
            },
            upImgFront (imgdata) {
                this.$http.CommonService.upImg(imgdata)
                    .then((res) => {
                        this.isComposing = false;
                        // this.imgDataArr = imgdata;
                        // this.imgStrArr = res.data.url;
                        this.headImg = res.data.url;
                        this.headImgUrls = res.data.urls;
                        // document.getElementById('file').value = '';
                    })
                    .catch((err) => {
                        this.isComposing = false;
                        // document.getElementById('file').value = '';
                        // this.imgDataArr = '';
                        // this.imgStrArr = '';
                        // this.headImg = '';
                        Toast({
                            message: '上传失败',
                            duration: 1000,
                            forbidClick: true
                        });
                    });
            },
            imgPreview (event) {
                this.isDisabled = true;
                let self = this;
                // 创建一个reader
                let reader = new FileReader();
                // 将图片2将转成 base64 格式
                reader.readAsDataURL(event.target.files[0]);
                // 读取成功后的回调
                reader.onloadend = function () {
                    let result = this.result;
                    let img = new Image();
                    img.src = result;
                    if (this.result.length > 20000000) {
                        Toast({
                            message: '请上传不大于20M的图片',
                            duration: 1000,
                            forbidClick: true
                        });
                        return;
                    } else {
                        img.onload = function () {
                            let src = commonFunction.compressImgTwo(img);
                            self.upImgFront(src);
                        };
                    }
                }
            },
            checkNickNum () {
                let con = commonFunction.trim(this.nickname);
                let number = commonFunction.checkLength(con);
                if (number > 15) {
                    this.nickname = con.substr(0, 15);
                }
            },
            checkSignatureNum () {
                let con = commonFunction.trim(this.signature);
                let number = commonFunction.checkLength(con);
                if (number > 20) {
                    this.signature = con.substr(0, 20);
                }
            },
            checkAreaStrNum () {
                let con = commonFunction.trim(this.address);
                let number = commonFunction.checkLength(con);
                if (number > 50) {
                    this.address = con.substr(0, 50);
                }
            }
            //    nickname signature areaStr
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/style/lib/vant-cell.scss";
</style>

<style lang="scss">
    // vant 样式修改
    .my-portrait {
        position: relative;

        .van-loading {
            position: absolute;
            width: 100%;
            height: 100%;
        }
    }
</style>
<style lang="scss" scoped>

    .compose-btn {
        width: 600px;
        height: 90px;
        margin: 30px auto;
        border-radius: 45px;
        background-color: $main-blue;
        color: #fff;
        font-size: 34px;
        line-height: 90px;
        text-align: center;

        &.click-forbid {
            background-color: #999999;
        }
    }

    /deep/ .van-cell {
        position: relative;
        padding: 30px 25px;
        line-height: 0;
        font-size: 28px;

        &:first-child {
            padding: 18px 25px;
        }

        .van-cell__title {
            display: flex;
            align-items: center;
            max-width: 1.2rem;
        }

        .van-cell__right-icon {
            align-self: center;
            margin-left: 24px;
            font-size: 26px;
        }

        .van-cell__value {
            line-height: 1;
        }

        ::placeholder {
            line-height: 37px;
            color: #999;
        }

        &:not(:last-child)::after {
            position: absolute;
            top: auto;
            bottom: 0;
            left: 0;
            height: 0;
            transform: none;
            border-bottom-color: #e0e0e0;
            border-bottom-width: 1PX;
        }
    }

    .my-portrait-box {
        position: relative;
        border-bottom: 1PX solid #e5e5e5;

        .van-uploader {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 3;
        }
    }

    .my-portrait {
        display: inline-block;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            display: block;
        }
    }

    /deep/ .van-picker {
        .van-picker__toolbar {
            height: 40PX;
            line-height: 40PX;
            font-size: 20PX;
        }

        .van-picker-column {
            font-size: 16PX;
        }
        .van-picker__cancel, .van-picker__confirm{
            font-size: 32px;
        }
    }

    .unSelected {
        color: #999;
    }
</style>
