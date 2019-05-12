
本地开发调试，调用组件方式
```javascript
<template>
	<div>
		vui home,123,input
		<vui-input
			v-model="name">
		</vui-input>
	</div>
</template>

<script>
	import Input from '../../lib/input';
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
	};

</script>

<style scoped>

</style>
```
