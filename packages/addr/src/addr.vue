<template>
  <div class="vui-addr">
    <div class="vui-form-item " :class="{'is-error': errorProvince}">
      <div class="vui-form-item__content"
      >
        <div :class="[
                {
                  'is-disabled': inputDisabled,
                }
                ]">
          <select
            v-model="province"
            class="vui-select__inner"
            v-bind="$attrs"
            autocomplete="off"
            @change="handleChangeProvince"
          >
            <option value="">{{selectDefaultName}}</option>
            <option v-for="(item, index) in allProvince" :key="index" :value="item[sProvinceId]">
              {{item[sProvinceName]}}
            </option>
          </select>
        </div>
        <div class="vui-form-item__error">{{errorTipProvince}}</div>
      </div>
    </div>


    <div class="vui-form-item " :class="{'is-error': errorCity}">
      <div class="vui-form-item__content">
        <div
          :class="[
                {
                  'is-disabled': inputDisabled,
                }
                ]"
        >
          <select
            v-model="city"
            class="vui-select__inner"
            v-bind="$attrs"
            autocomplete="off"
            @change="handleChangeCity"
          >
            <option value="">{{selectDefaultName}}</option>
            <option v-for="(item, index) in allCity" :key="index" :value="item[sCityId]">{{item[sCityName]}}</option>
          </select>
        </div>
        <div class="vui-form-item__error">{{errorTipCity}}</div>
      </div>
    </div>


    <div class="vui-form-item " :class="{'is-error': errorArea}">
      <div class="vui-form-item__content">
        <div
          :class="[
                {
                  'is-disabled': inputDisabled,
                }
                ]"
        >
          <select
            v-model="area"
            class="vui-select__inner"
            v-bind="$attrs"
            autocomplete="off"
            @change="handleChangeArea"
          >
            <option value="">{{selectDefaultName}}</option>
            <option v-for="(item, index) in allArea" :key="index" :value="item[sAreaId]">{{item[sAreaName]}}</option>
          </select>
        </div>
        <div class="vui-form-item__error">{{errorTipArea}}</div>
      </div>
    </div>

    <div class="vui-form-item " :class="{'is-error': errorAddress}">
      <div class="vui-form-item__content">
        <div
          :class="[
                {
                  'is-disabled': inputDisabled,
                }
                ]"
        >
          <input
            type="text"
            :placeholder="detailAddr"
            class="vui-input__inner"
            v-bind="$attrs"
            style="width: 250px"
            autocomplete="off"
            @input="handleInput"
            v-model="address"
          >
        </div>
        <div class="vui-form-item__error">{{errorTipAddress}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {judgeValue} from '../../../src/funs/validate';
  import Emitter from '../../../src/mixins/emitter';
  import axios from 'axios';

  export default {
    name: 'VuiAddr',
    data: function() {
      return {
        province: '',
        city: '',
        area: '',
        address: '',

        provinceName: '',
        cityName: '',
        areaName: '',
        addressName: '',

        allProvince: [],
        allCity: [],
        allArea: [],

        sProvinceInterface: '/provinceCtrl/findHatProvinceAll',
        sCityInterface: '/provinceCtrl/findByCityParentCode',
        sAreaInterface: '/provinceCtrl/findByAreaParentCode',
        sCityParam: 'code',
        sAreaParam: 'code',

        sProvinceId: 'provinceid',
        sProvinceName: 'province',

        sCityId: 'cityid',
        sCityName: 'city',

        sAreaId: 'areaid',
        sAreaName: 'area',

        errorProvince: false,
        errorCity: false,
        errorArea: false,
        errorAddress: false,

        errorTipProvince: '',
        errorTipCity: '',
        errorTipArea: '',
        errorTipAddress: '',

        provinceRule: '',
        cityRule: '',
        areaRule: '',
        addressRule: '',
        setAddressP: '',
        setAddressC: '',
        hasSet: false
      };
    },
    componentName: 'VuiLinkage',
    mixins: [Emitter],
    props: {
      provinceArr: {
        type: Array,
        default: []
      },
      addressConfig: {
        type: Object
      },
      addressObj: {
        type: Object,
        default: function() {
          return {
            province: '',
            city: '',
            area: '',
            address: ''
          };
        }
      },
      provinceRuleDetail: {
        type: [Array, String],
        default: ''
      },
      cityRuleDetail: {
        type: [Array, String],
        default: ''
      },
      areaRuleDetail: {
        type: [Array, String],
        default: ''
      },
      addressRuleDetail: {
        type: [Array, String],
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      selectDefaultName: {
        type: String,
        default: '请选择'
      },
      detailAddr: {
        type: String,
        default: ''
      }
    },
    computed: {
      inputDisabled() {
        return this.disabled;
      }
    },

    watch: {
      addressConfig: {
        immediate: true,
        handler(newVal) {
          if (newVal) {
            this.sProvinceInterface = newVal.sProvinceInterface;
            this.sCityInterface = newVal.sCityInterface;
            this.sAreaInterface = newVal.sAreaInterface;

            this.sCityParam = newVal.sCityParam;
            this.sAreaParam = newVal.sAreaParam;

            this.sProvinceId = newVal.sProvinceId;
            this.sProvinceName = newVal.sProvinceName;

            this.sCityId = newVal.sCityId;
            this.sCityName = newVal.sCityName;

            this.sAreaId = newVal.sAreaId;
            this.sAreaName = newVal.sAreaName;
          }
        }
      },
      provinceArr: {
        immediate: true,
        handler(newVal) {
          if (newVal.length > 0) {
            this.allProvince = [].concat(newVal);
            this.setAddress();
          }
        }
      },
      addressObj: {
        deep: true,
        immediate: true,
        handler(newVal) {
          this.setAddressP = newVal.provinceId;
          this.setAddressC = newVal.cityId;
          if (this.allProvince.length !== 0) {
            this.setAddress();
          }
          this.address = newVal.address;
          if (newVal.provinceId !== '' && newVal.provinceId !== undefined) {
            this.province = newVal.provinceId;
          }
          if (newVal.cityId !== '' && newVal.cityId !== undefined) {
            this.city = newVal.cityId;
          }
          if (newVal.areaId !== '' && newVal.areaId !== undefined) {
            this.area = newVal.areaId;
          }
        }
      },
      provinceRuleDetail: {
        immediate: true,
        handler(newVal) {
          this.provinceRule = newVal;
        }
      },
      cityRuleDetail: {
        immediate: true,
        handler(newVal) {
          this.cityRule = newVal;
        }
      },
      areaRuleDetail: {
        immediate: true,
        handler(newVal) {
          this.areaRule = newVal;
        }
      },
      addressRuleDetail: {
        immediate: true,
        handler(newVal) {
          this.addressRule = newVal;
        }
      }
    },
    methods: {
      getProvince: function() {
        return axios({
          method: 'post',
          url: this.sProvinceInterface
        });
      },
      getCitys: function(provinceId) {
        return axios({
          method: 'post',
          url: this.sCityInterface,
          params: {
            [this.sCityParam]: provinceId
          }
        });
      },
      getArea: function(cityId) {
        return axios({
          method: 'post',
          url: this.sAreaInterface,
          params: {
            [this.sAreaParam]: cityId
          }
        });
      },
      handleChangeProvince: function(event) {
        let provinceId = event.target.value;
        this.$emit('province', event);
        let that = this;
        this.errorProvince = false;
        this.checkValue('province');
        that.city = '';
        that.area = '';
        if (provinceId === '') return;
        axios({
          method: 'post',
          url: this.sCityInterface,
          params: {
            [this.sCityParam]: provinceId
          }
        }).then(function(res) {
          if (res.data.code === '000000') {
            that.allCity = [].concat(res.data.data);
          }
        });

        this.setAddressText();
      },
      handleChangeCity: function(event) {
        let cityId = event.target.value;
        this.$emit('city', event);
        this.errorCity = false;
        this.checkValue('city');
        let that = this;
        that.area = '';
        if (cityId === '') return;
        axios({
          method: 'post',
          url: this.sAreaInterface,
          params: {
            [this.sAreaParam]: cityId
          }
        })
          .then(res => {
            if (res.data.code === '000000') {
              that.allArea = [].concat(res.data.data);
            }
          });

        this.setAddressText();
      },
      handleChangeArea: function(event) {
        this.errorArea = false;
        this.$emit('area', event);
        this.checkValue('area');
        this.setAddressText();
      },

      handleInput(event) {
        this.$emit('address', event);
        this.checkValue('address');
        this.setAddressText();
      },

      setAddress: function() {
        let that = this;
        let reqArr = [];
        let adr = {
          provinceId: this.setAddressP,
          cityId: this.setAddressC
        };
        if (this.allProvince.length === 0) return;
        if (this.setAddressP === '' || this.setAddressP === null || this.setAddressP === undefined) return;
        if (this.hasSet) return;
        this.hasSet = true;
        if (adr) {
          // if (this.province === adr.provinceId && this.city === adr.cityId) return;
          if (adr.provinceId && !adr.cityId) {
            reqArr = [that.getCitys(adr.provinceId)];
          } else if (adr.provinceId && adr.cityId) {
            reqArr = [that.getCitys(adr.provinceId), that.getArea(adr.cityId)];
          }
        }
        if (reqArr.length === 0) return;
        axios.all(reqArr)
          .then(axios.spread(function(city, area) {
            // let prodata = pro ? pro.data : '';
            let citydata = city ? city.data : '';
            let areadata = area ? area.data : '';

            // if (prodata.code === '000000') {
            //   that.allProvince = [].concat(prodata.data);
            // }
            if (citydata.code === '000000') {
              that.allCity = [].concat(citydata.data);
            }
            if (areadata.code === '000000') {
              that.allArea = [].concat(areadata.data);
            }
            that.setAddressText();
          }));
      },
      setAddressText: function() {
        let pro = '';
        let cit = '';
        let are = '';
        if (this.province && this.city && this.address) {
          for (let p = 0; p < this.allProvince.length; p++) {
            if (Number(this.allProvince[p][this.sProvinceId]) === Number(this.province)) {
              pro = this.allProvince[p][this.sProvinceName];
            }
          }

          for (let c = 0; c < this.allCity.length; c++) {
            if (Number(this.allCity[c][this.sCityId]) === Number(this.city)) {
              cit = this.allCity[c][this.sCityName];
              if (cit === '县级' || cit === '市辖区' || cit === '县') {
                cit = '';
              }
            }
          }
          for (let a = 0; a < this.allArea.length; a++) {
            if (Number(this.allArea[a][this.sAreaId]) === Number(this.area)) {
              are = this.allArea[a][this.sAreaName];
              if (are === '县级' || are === '市辖区' || are === '县') {
                are = '';
              }
            }
          }
          let adrText = pro + cit + are + this.address;
          this.$emit('addresstext', adrText);
        }
      },

      checkValue: function(type) {
        let res = {
          isRight: true
        };
        let obj = {
          value: '',
          rule: ''
        };
        if (type === 'province') {
          obj.value = this.province;
          obj.rule = this.provinceRule;

          if (!obj.rule) return res;
          let tip = judgeValue(obj);
          if (tip) {
            this.errorTipProvince = tip;
            this.errorProvince = true;
            res.isRight = false;
          } else {
            this.errorProvince = false;
            res.isRight = true;
          }
          return res;
        } else if (type === 'city') {
          obj.value = this.city;
          obj.rule = this.cityRule;

          if (!obj.rule) return res;
          let tip = judgeValue(obj);
          if (tip) {
            this.errorTipCity = tip;
            this.errorCity = true;
            res.isRight = false;
          } else {
            this.errorCity = false;
            this.errorTipCity = '';
            res.isRight = true;
          }
          return res;
        } else if (type === 'area') {
          obj.value = this.area;
          obj.rule = this.areaRule;

          if (!obj.rule) return res;
          let tip = judgeValue(obj);
          if (tip) {
            this.errorTipArea = tip;
            this.errorArea = true;
            res.isRight = false;
          } else {
            this.errorArea = false;
            this.errorTipArea = '';
            res.isRight = true;
          }
          return res;
        } else if (type === 'address') {
          obj.value = this.address;
          obj.rule = this.addressRule;

          if (!obj.rule) return res;
          let tip = judgeValue(obj);
          if (tip) {
            this.errorTipAddress = tip;
            this.errorAddress = true;
            res.isRight = false;
          } else {
            this.errorAddress = false;
            this.errorTipAddress = '';
            res.isRight = true;
          }
          return res;
        } else {
          if (!this.province) {
            return res;
          }
          if (this.province) {
            if (!this.city) {
              this.errorTipCity = '该项必选';
              this.errorCity = true;
              res.isRight = false;
            }
            if (!this.area) {
              this.errorTipArea = '该项必选';
              this.errorArea = true;
              res.isRight = false;
            }
            obj.value = this.address;
            obj.rule = this.addressRule;
            if (!obj.rule) return res;
            let tip = judgeValue(obj);
            if (tip) {
              this.errorTipAddress = tip;
              this.errorAddress = true;
              res.isRight = false;
            } else {
              this.errorAddress = false;
              this.errorTipAddress = '';
            }
            return res;
          }
        }

      }
    }
  };
</script>




