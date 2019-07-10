<template>
  <div style="margin: 20px;">
    <vui-input v-model="input" placeholder="请输入内容"></vui-input>
    <vui-addr
      class="map-addr-box"
      select-default-name-province="省/市"
      select-default-name-city="市"
      select-default-name-area="县/区"
      :province-arr="allProvince"
      :address-obj="{'provinceId': search.provinceId,'cityId': search.cityId,'areaId': search.areaId,'addressId': search.addressId,}"
      v-on:province="function(event){search.provinceId = event.target.value}"
      v-on:city="function(event){search.cityId = event.target.value}"
      v-on:area="function(event){search.areaId = event.target.value}"
      v-on:address="function(event){search.addressId = event.target.value}"
      v-on:addresstext="function(event){search.addressText = event}"
    ></vui-addr>
  </div>
</template>

<script>
import { axiosRequest } from "../../src/funs/axios-request";
export default {
  data() {
    return {
      input: "Hello  UI!",
      allProvince: [],
      search: {
        placeholder: "请输入门店",
        searchStore: "",
        searchType: 0, // 0门店， 1 实控人
        searchUnit: "家", // 家门店
        searchItem: "",
        addr: "门店",
        number: "",
        name: "",
        province: "",
        city: "",
        area: "",
        list: "",
        areaList: "",
        cityList: "",
        addrList: "",
        mapType: 1, // 1 echarts 地图， 2 为 百度地图
        provinceId: "", // 搜索id
        cityId: "",
        areaId: "",
        addressId: ""
      }
    };
  },
  mounted() {
    this.getProvince();
  },
  methods: {
    getProvince: function() {
      var config = {
        url: "/provinceCtrl/findHatProvinceAll",
        method: "post",
        contentType: "form",
        data: {}
      };
      var that = this;
      axiosRequest(config).then(function(res) {
        that.allProvince = [].concat(res.data);
      });
    }
  }
};
</script>
