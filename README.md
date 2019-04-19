## 目录

### 源代码地址
- [github源代码地址](https://github.com/connorbill/vui-pc)

### 开发组件发布到npm 

- 名字:vui-pc
- 地址：https://www.npmjs.com/package/vui-pc
- 访问文件CDN：https://unpkg.com/vui-pc
- 例如：地址+版本号+dist, 即可看到所有文件https://unpkg.com/vui-pc@0.7.0/dist/

### 本地运行使用组件

- 0 开发环境搭建。使用 yarn 进行依赖版本的锁定，所以请不要使用 npm install 安装依赖。
- 1 开发环境搭建

```shell
npm run dev
```

- 2 本地启动测试目录examples，
- 3 open http://localhost:8085

### 开发组件

- 0 组件开发源代码目录packages
- 1 打包代码

```shell
npm run dist
```

- 2 打包后目录 lib ,
- 所有组件打包成一个js，浏览器使用js /lib/index.js，这是兼容到ie11的js
- 打包的commonjs2 文件 /lib/vui-pc.common.js
- 其他为打包的单个commonjs2 组件


### 使用

#### 完整引入

在 main.js 中写入以下内容：

```html
import Vue from 'vue';
import VuiPc from 'vui-pc';
import App from './App.vue';

Vue.use(VuiPc);

new Vue({
  el: '#app',
  render: h => h(App)
});
```



#### 按需引入

借助 [babel-plugin-component](https://github.com/QingWei-Li/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

```bash
npm install babel-plugin-component -D
```

然后，将 .babelrc 修改为：

```json
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "vui-pc",
      }
    ]
  ]
}
```

接下来，如果你只希望引入部分组件，比如 Input，那么需要在 main.js 中写入以下内容：

```html
import Vue from 'vue';
import { Input } from 'vui-pc';
import App from './App.vue';

Vue.component(Input.name, Input);
/* 或写为
 * Vue.use(Input)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```


或者在某个组件中使用
```html
<template>
	<div>
		<vui-input
			v-model="name">
		</vui-input>
	</div>
</template>
<script>
	import { Input } from 'vui-pc';
	export default {
	  name: 'VuiHome',
	  data() {
	    return {
	      name: '111'
	    };
	  },
	  components: {
	    [Input.name]: Input
	  }
	}
</script>
<style scoped>

</style>
```

或者 引用CDN在线版本，在html中直接引入已打包好的文件，例如：
```html
<link rel="stylesheet" href="//unpkg.com/vui-pc@0.8.5/packages/theme-chalk/lib/index.css">
<script src="//unpkg.com/vue/dist/vue.js"></script>
<script src="//unpkg.com/vui-pc@0.8.5/lib/index.js"></script>
<script src="//unpkg.com/vui-pc@0.8.5/other/validate-fun.js"></script>



```


# 组件文档

## input 输入框

使用案例

- [在线运行](https://codepen.io/connorbill/pen/eoyjxG)


Input Attributes


| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| type         | 类型   | string  | text，textarea  | text |
| value / v-model | 绑定值           | string / number  | — | — |
| placeholder   | 输入框占位文本    | string          | — | — |
| show-password | 加上这个则是密码输入框| boolean         | — | false |
| disabled      | 禁用            | boolean         | — | false   |
| autocomplete | 原生属性，自动补全 | string | on, off | off |
| name | 原生属性 | string | — | — |
| rule | 校验规则 | Array | — | - |
| class-name | 给input元素添加样式,绑定到input上 | String | — | - |

Input Events

| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| blur | 在 Input 失去焦点时触发 | (event: Event) |
| focus | 在 Input 获得焦点时触发 | (event: Event) |
| change | 在 Input 值改变时触发 | (value: string \| number) |



## select 选择框

select Attributes

使用案例

- [在线运行](https://codepen.io/connorbill/pen/ROxJgZ)

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| type         | 类型   | string  | text，textarea  | text |
| value / v-model | 绑定值           | string / number  | — | — |
| placeholder   | 输入框占位文本    | string          | — | — |
| disabled      | 禁用            | boolean         | — | false   |
| autocomplete | 原生属性，自动补全 | string | on, off | off |
| name | 原生属性 | string | — | — |
| rule | 校验规则 | Array | — | - |
| class-name | 给input元素添加样式,绑定到input上 | String | — | - |
| option | 选项数组| Array         | — | [] |
|select-id| option:value参数| string         | — | - |
|select-name| value对应的显示参数| string         | — | - |
|select-default-name| 替换默认文字| string         | — | '请选择' |


select Events

| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| change | 在 Select 值改变时触发 | (value: string \| number) |



## table 表格

table Attributes

使用案例

- [在线运行](https://codepen.io/connorbill/pen/KYZxVq)

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| data | 显示的数据 | array | — | — |
| show-footer | 是否显示表尾 | boolean | — | true |
|property| 设置排序，字段值和与之对应的slot | array | — | - |



## addr 省市区三级联动




| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| address-config | 可以不传，有默认值， | Object | — |  |
| address-config(sProvinceInterface) | 省接口地址| string | — | /provinceCtrl/findHatProvinceAll |
| address-config.sCityInterface | 市接口地址| string | — | /provinceCtrl/findByCityParentCode |
| address-config.sAreaInterface | 区接口地址| string | — | /provinceCtrl/findByAreaParentCode |
| address-config.sCityParam | 获取市数据的接口传参名字| string | — | code |
| address-config.sAreaParam | 获取区数据的接口传参名字| string | — | code |
| address-config.sProvinceId | 省选择框每一个选项value值对应的的字段名| string | — | provinceid |
| address-config.sProvinceName |省选择框每一个选项显示的字段名| string | — | province |
| address-config.sCityId | 市选择框每一个选项value值对应的的字段名| string | — | cityid |
| address-config.sCityName |市选择框每一个选项显示的字段名| string | — | city |
| address-config.sAreaId | 区选择框每一个选项value值对应的的字段名| string | — | areaid |
| address-config.sAreaName |区选择框每一个选项显示的字段名| string | — | area |
| province-arr | 所有省数组，require(所有配置选项中必须传的值) | Array | — | [] |
| address-obj | 省市区address的值 | Object | - | |
| address-obj(provinceId) | 省的值 | string | - | 空|
| address-obj(cityId) | 市的值 | string | - | 空|
| address-obj(areaId) | 区的值 | string | - | 空|
| address-obj(address) | address的值 | string | - | 空|
| province-rule-detail | 省的校验规则 | string | - | []|
| city-rule-detail | 市的校验规则 | string | - | []|
| area-rule-detail | 区的校验规则 | string | - | []|
| address-rule-detail | address的校验规则 | string | - | []|



addr Events 查看以下例子

| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| province | 在 省 Select 值改变时触发 | 返回一个特殊变量 $event, 其值是event.target.value(: string \| number)   |
| city | 在 市 Select 值改变时触发 | 返回一个特殊变量 $event, 其值是event.target.value(: string \| number)   |
| area | 在 区 Select 值改变时触发 | 返回一个特殊变量 $event, 其值是event.target.value(: string \| number)   |
| address | 在 address  值改变时触发 | 返回一个特殊变量 $event, 其值是event.target.value(: string \| number)   |
| addresstext | 在 addresstext 省市区address的字符串拼接 | 返回具体值，value(: string \| number)   |

```html

<vui-addr 
    v-bind:address-config="addressConfig"
        :province-arr="allProvince"
        :address-obj="{
            'provinceId': surveyData.table.province,
            'cityId': surveyData.table.city,
            'areaId': surveyData.table.county,
            'address': surveyData.table.address,
        }"
        :province-rule-detail="surveyData.rule.rule.province"
        :city-rule-detail="surveyData.rule.rule.city"
        :area-rule-detail="surveyData.rule.rule.county"
        :address-rule-detail="surveyData.rule.rule.address"
        v-on:province="function(event){surveyData.table.province = event.target.value}"
        v-on:city="function(event){surveyData.table.city = event.target.value}"
        v-on:area="function(event){surveyData.table.county = event.target.value}"
        v-on:address="function(event){surveyData.table.address = event.target.value}"
        v-on:addresstext="function(event){surveyData.table.addressText = event}"
    ></vui-addr>

<!--js 中以对象表示-->
<script >
    var vm = new Vue({
      data: {
        allProvince: [],
        addressConfig : {
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
        }
      },
      mounted(){
          this.getProvince();
      },
      methods: {
        getProvince: function() {
            var that = this;
            var config = {
                url: '/provinceCtrl/findHatProvinceAll',
                type: 'post',
                token: '',
                contentType: 'form',
                params: {}
            };
            axiosRequest(config)
                .then(function(res) {
                    that.allProvince = [].concat(res.data);
                });
        }
      }
    });
</script>
```

## button 按钮
## checkbox  多选框
## radio  单选框
## date-picker  日期选择框
## dialog  弹框
## table-lr  左右布局表格
## upload  图片上传


上传界面结果页面

正在上传中
![avatar](/examples/assets/images/upload/upload2.png)

已上传
![avatar](/examples/assets/images/upload/upload1.png)

## pagination 分页

Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| page-size | 每页显示条目个数 | Number | — | 10 |
| total | 总条目数 | Number | — | - |
| current-page | 当前页数，支持 .sync 修饰符 | Number | — | 1 |


Events

| 事件名称          | 说明            | 回调参数            |
|-------------  |---------------- |---------------- |
| current-change | currentPage 改变时会触发 | 当前页currentPage |



### 版本更新

### [0.9.5](#--if)

- vui-upload 增加上传图片个数限制， 是否自动上传，提示文件大小限制，

### [0.9.4](#--if)

- vui-upload 修复, vui-addr 增加 disabled 禁用参数

### [0.9.3](#--if)

- vui-upload 修复问题

### [0.9.2](#--if)

- vui-table-lr 样式修改

### [0.9.1](#--if)

- vui-pagination 新增分页组件

### [0.9.0](#--if)

- vui-table-lr 组件更改名字

### [0.8.6](#--if)

- vui-upload 组件更新样式，提供所有上传完成后返回所有图片地址的数组：on-all-file

### [0.8.5](#--if)

- 根目录增加other目录，存放es5的 filter, v-multi-ref指令，数值格式化函数，以便用于es5语法的js中，在页面中直接引入。
-  vui-button组件： 更换loading 样式

### [0.8.3](#--if)

- 解决校验函数导出，导入后找不到的问题


