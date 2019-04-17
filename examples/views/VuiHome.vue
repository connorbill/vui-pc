<template>
	<div>
		vui home,123,input
		<div @click="save">保存</div>
		<vui-input
			:ref="rule.ref.name"
			v-model="name"
			:rule="rule.rule.name"
		>
		</vui-input>
		<vui-button type="primary" :loading="isLoading">新 增</vui-button>

	</div>
</template>

<script>
  import Input from '../../packages/input/src/input';
  import Select from '../../packages/select/src/select';
  import Button from '../../packages/button/src/button';
  import {checkCardID, checkLicense, isRight, deepFreeze} from '../../src/funs/check-fun';

  export default {
    name: 'VuiHome',
    data() {
      return {
        isLoading: true,
        name: '111',
        rule: deepFreeze({
          rule: {
            // 营业执照号/身份证号
            name: [
              {require: true, tip: '此为必填项'},
              {define: this.checkCompanyId, tip: '请输入正确的营业执照号或身份证号'}
            ]
          }
        })
      };
    },
    components: {
      [Input.name]: Input,
      [Select.name]: Select,
      [Button.name]: Button
    },
    created() {
      console.log(this.rule);
    },
    methods: {
      checkCompanyId() {
        console.log(checkCardID(this.name));
        console.log(checkLicense(this.name));
        console.log(checkCardID(this.name) || checkLicense(this.name));
        if (checkCardID(this.name) || checkLicense(this.name)) {
          return true;
        } else {
          return false;
        }
        // return true;
      },
      save() {
        if (!isRight(this.rule.ref, this)) {
          console.log('err');
        }
      }
    }
  };

</script>

<style scoped>

</style>
