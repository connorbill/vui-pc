#### 完整引入

在 main.js 中写入以下内容：

```javascript
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

```javascript
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
```javascript
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
