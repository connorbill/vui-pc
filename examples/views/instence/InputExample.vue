<template>
  <div>
    <h2>Input 输入框</h2>
    <div class="title">input</div>
    <vui-input
      :ref="rule.ref.name"
      v-model="name"
      :rule="rule.rule.name"
    >
    </vui-input>
  </div>
</template>

<script>
  import Input from '../../../packages/input/src/input';
  import {checkCardID, checkLicense, isRight, deepFreeze} from '../../../src/funs/check-fun';

  export default {
    name: 'InputExample',
    components: {
      [Input.name]: Input
    },
    data() {
      return {
        name: '111',
        rule: deepFreeze({
          rule: {
            // 营业执照号/身份证号
            name: [
              {strMin: 1, strMax: 500, tip: '请输入1到500字符'}
            ]
          }
        })
      };
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
