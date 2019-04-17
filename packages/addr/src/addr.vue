<template>
  <div class="vui-addr">
    <div class="vui-form-item " :class="{'is-error': errorProvince}">
      <div class="vui-form-item__content">
        <div>
          <select
            v-model="province"
            class="vui-select__inner"
            v-bind="$attrs"
            autocomplete="off"
            @change="handleChangeProvince"
          >
            <option value="">请选择</option>
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
        <div>
          <select
            v-model="city"
            class="vui-select__inner"
            v-bind="$attrs"
            autocomplete="off"
            @change="handleChangeCity"
          >
            <option value="">请选择</option>
            <option v-for="(item, index) in allCity" :key="index" :value="item[sCityId]">{{item[sCityName]}}</option>
          </select>
        </div>
        <div class="vui-form-item__error">{{errorTipCity}}</div>
      </div>
    </div>


    <div class="vui-form-item " :class="{'is-error': errorArea}">
      <div class="vui-form-item__content">
        <div>
          <select
            v-model="area"
            class="vui-select__inner"
            v-bind="$attrs"
            autocomplete="off"
            @change="handleChangeArea"
          >
            <option value="">请选择</option>
            <option v-for="(item, index) in allArea" :key="index" :value="item[sAreaId]">{{item[sAreaName]}}</option>
          </select>
        </div>
        <div class="vui-form-item__error">{{errorTipArea}}</div>
      </div>
    </div>

    <div class="vui-form-item " :class="{'is-error': errorAddress}">
      <div class="vui-form-item__content">
        <div>
          <input
            type="text"
            placeholder="请输入详细地址"
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
  import { judgeValue } from '../../../src/funs/validate';
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
        addressRule: ''
      };
    },
    componentName: 'VuiLinkage',
    mixins: [Emitter],
    props: {
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
      }
    },

    watch: {
      addressObj: {
        deep: true,
        immediate: true,
        handler(newVal) {
          let obj = {
            provinceId: newVal.provinceId,
            cityId: newVal.cityId
          };
          this.setAddress(obj);
          this.province = newVal.provinceId;
          this.city = newVal.cityId;
          this.area = newVal.areaId;
          this.address = newVal.address;
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
    mounted() {
      this.setAddress();
      // this.setAllSelect();

    },
    methods: {
      checkHaveProvince: function() {
        if (this.allProvince.length === 0) {
          this.setAddress();
        }
      },
      getProvince: function() {
        return axios({
          method: 'post',
          url: '/provinceCtrl/findHatProvinceAll'
        });
      },
      getCitys: function(provinceId) {
        return axios({
          method: 'post',
          url: '/provinceCtrl/findByCityParentCode',
          params: {
            code: provinceId
          }
        });
      },
      getArea: function(cityId) {
        return axios({
          method: 'post',
          url: '/provinceCtrl/findByAreaParentCode',
          params: {
            code: cityId
          }
        });
      },
      handleChangeProvince: function(event) {
        let provinceId = event.target.value;
        this.$emit('province', event);
        let that = this;
        this.errorProvince = false;
        this.checkValue('province');
        axios({
          method: 'post',
          url: '/provinceCtrl/findByCityParentCode',
          params: {
            code: provinceId
          }
        }).then(function(res) {
          if (res.data.code === '000000') {
            that.allCity = [].concat(res.data.data);
            that.city = '';
            that.area = '';
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
        axios({
          method: 'post',
          url: '/provinceCtrl/findByAreaParentCode',
          params: {
            code: cityId
          }
        })
          .then(res => {
            if (res.data.code === '000000') {
              that.allArea = [].concat(res.data.data);
              that.area = '';
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

      setAddress: function(adr) {
        let that = this;
        let reqArr = [];
        if (adr) {
          if (this.province === adr.provinceId && this.city === adr.cityId) return;
          if (adr.provinceId && !adr.cityId) {
            reqArr = [that.getProvince(), that.getCitys(adr.provinceId)];
          } else if (adr.provinceId && adr.cityId) {
            reqArr = [that.getProvince(), that.getCitys(adr.provinceId), that.getArea(adr.cityId)];
          } else {
            reqArr = [that.getProvince()];
          }
        } else {
          reqArr = [that.getProvince()];
        }
        axios.all(reqArr)
          .then(axios.spread(function(pro, city, area) {
            let prodata = pro ? pro.data : '';
            let citydata = city ? city.data : '';
            let areadata = area ? area.data : '';

            if (prodata.code === '000000') {
              that.allProvince = [].concat(prodata.data);
            }
            if (citydata.code === '000000') {
              that.allCity = [].concat(citydata.data);
            }
            if (areadata.code === '000000') {
              that.allArea = [].concat(areadata.data);
            }
          }));
      },
      setAddressText: function() {
        let pro = '';
        let cit = '';
        let are = '';
        if (this.province && this.city && this.address) {
          for (let p = 0; p < this.allProvince.length; p++) {
            if (this.allProvince[p].provinceid === this.province) {
              pro = this.allProvince[p].province;
            }
          }

          for (let c = 0; c < this.allCity[c].length; c++) {
            if (this.allCity[c].cityid === this.city) {
              cit = this.allCity[c].city;
              if (cit === '县级' || cit === '市辖区' || cit === '县') {
                cit = '';
              }
            }
          }
          for (let a = 0; a < this.allArea[a].length; a++) {
            if (this.allArea[a].areaid === this.area) {
              are = this.allArea[a].area;
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
            }

            return res;
          }
        }

      }
    }
  };
</script>

<style scoped>

</style>




