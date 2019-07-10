## Address linkage

Use for automatic filling of provinces and cities on the page



### Basic usage


:::demo 

```html
<template>
<div>
  <vui-addr 
      select-default-name="please select"
      :address-config="addressConfig"
      :province-arr="allProvince"
      :address-obj="{
          'provinceId': surveyData.table.province,
          'cityId': surveyData.table.city,
          'areaId': surveyData.table.county,
          'address': surveyData.table.address,
      }"
      v-on:province="function(event){surveyData.table.province = event.target.value}"
      v-on:city="function(event){surveyData.table.city = event.target.value}"
      v-on:area="function(event){surveyData.table.county = event.target.value}"
      v-on:address="function(event){surveyData.table.address = event.target.value}"
      v-on:addresstext="function(event){surveyData.table.addressText = event}"
  ></vui-addr>
</div>
</template>
<script>
   export default {
      data(){
        return {
        allProvince: [],
        addressConfig: {
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
          sAreaName: 'area'
        },
        
        surveyData: {
                table: {
                    province: '',
                    city: '',
                    county: '',
                    address: '',
                },
            }
        };
      },
      mounted(){
          this.getProvince();
      },
      methods: {
        getProvince: function() {
            
        }
      }
   };
 </script>

```
:::


### Attributes
| Attribute      | Description    | Type      | Accepted values       | Default   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| address-config | options | Object | — |  |
| address-config(sProvinceInterface) | Provincial interface address| string | — | /provinceCtrl/findHatProvinceAll |
| address-config.sCityInterface | City interface address| string | — | /provinceCtrl/findByCityParentCode |
| address-config.sAreaInterface | Area interface address| string | — | /provinceCtrl/findByAreaParentCode |
| address-config.sCityParam | Get the interface name of the city data| string | — | code |
| address-config.sAreaParam | Get the name of the interface of the zone data| string | — | code |
| address-config.sProvinceId | The name of the field corresponding to each option value of the province selection box| string | — | provinceid |
| address-config.sProvinceName |The name of the field displayed by each option in the province selection box| string | — | province |
| address-config.sCityId | City selection box for each field value corresponding to the value of the option| string | — | cityid |
| address-config.sCityName |City selection box displays the field name for each option| string | — | city |
| address-config.sAreaId | The field name corresponding to each option value of the area selection box| string | — | areaid |
| address-config.sAreaName |The field name displayed by each option in the area selection box| string | — | area |
| province-arr | All province arrays, require (values that must be passed in all configuration options) | Array | — | [] |
| address-obj | Provincial city address value | Object | - | |
| address-obj(provinceId) | Provincial value | string | - | -|
| address-obj(cityId) | City value | string | - | -|
| address-obj(areaId) | area value | string | - | -|
| address-obj(address) | address value| string | - | -|
| province-rule-detail | Provincial verification rules | string | - | []|
| city-rule-detail | City verification rules  | string | - | []|
| area-rule-detail | area verification rules  | string | - | []|
| address-rule-detail | address  verification rules | string | - | []|


### Events

| Event Name | Description | Parameters |
|---------|--------|---------|
| province | triggers when the provincial selected value changes | event.target.value(: string \| number)   |
| city | triggers when the City selected value changes | event.target.value(: string \| number)   |
| area | triggers when the area selected value changes | event.target.value(: string \| number)   |
| address | triggers when the address selected value changes | event.target.value(: string \| number)   |
| addresstext | Complete address  | value(: string )   |
