<template>
  <div>
    <div class="title">省市区三级联动</div>

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
  </div>
</template>

<script>
  import Addr from '../../../packages/addr/src/addr';
  export default {
    name: 'AddrExample',
    components: {
      [Addr.name]: Addr
    },
    data() {
      return {
        allProvince: []
      };
    },
    methods: {
      change: function(v) {
        console.log(v);
        // console.log(this.$refs.addr.province);
        // let id = this.$refs.addr.province;
        // var text = this.allProvince.find(item => item.provinceid === id)['province'];
        // console.log(text);
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
    }
  };
</script>

<style scoped>

</style>
