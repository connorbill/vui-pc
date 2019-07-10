## Form 表单

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据

### 表单验证



:::demo 把规则 `rule`绑定到组件上， 使用指令 `v-multi-ref`绑定对应的ref ，即可自动校验. `newCheck.ref` 是`$check.deepFreeze`函数添加的，因此不用手动添加，在dom中保持和rule对应的字段名一致即可（例如v-multi-ref="newCheck.ref.storeName"）；
```html

<div class="middle-left-wrap" style="margin-bottom: 20px;">
  <span style="width: 200px;text-align: right;padding-right: 10px;">id</span>
  <vui-input
    v-model="formInfo.storeId"
    v-multi-ref="newCheck.ref.storeId"
    :rule="newCheck.rule.storeId"
  ></vui-input>
</div>
<div class="middle-left-wrap" style="margin-bottom: 20px;">
  <span style="width: 200px;text-align: right;padding-right: 10px;">名字</span>
  <vui-input
    v-model="formInfo.storeName"
    v-multi-ref="newCheck.ref.storeName"
    :rule="newCheck.rule.storeName"
  ></vui-input>
</div>
<div class="middle-left-wrap" style="margin-bottom: 20px;">
  <span style="width: 200px;text-align: right;padding-right: 10px;">营业执照号码或身份证号</span>
  <vui-input 
    v-model="formInfo.input"
    v-multi-ref="newCheck.ref.licenseNumber" 
    placeholder="请输入内容"
    :rule="newCheck.rule.licenseNumber"
  ></vui-input>
</div>
<div class="middle-left-wrap" style="margin-bottom: 20px;">
  <span style="width: 200px;text-align: right;padding-right: 10px;">是否有证件</span>
    <vui-radio-group
            v-model="formInfo.haveIdCard"
            :rule="newCheck.rule.haveIdCard"
            v-multi-ref="newCheck.ref.haveIdCard"
    >
        <vui-radio  :label="1">有</vui-radio>
        <vui-radio  :label="2" style="margin-left: 15px;" >无</vui-radio>
    </vui-radio-group>
</div>

<div class="middle-left-wrap" style="margin-bottom: 20px;">
  <span style="width: 200px;text-align: right;padding-right: 10px;">其它</span>
  <vui-checkbox-group 
    v-model="formInfo.other"
    :rule="newCheck.rule.other"
    v-multi-ref="newCheck.ref.other"
  >
      <vui-checkbox
              v-for="(item, index) in psChangeArr"
              :label="item.value"
              :key="index"
      >
          {{item.name}}
      </vui-checkbox>
  </vui-checkbox-group>
</div>
<div class="middle-left-wrap" style="margin-bottom: 20px;">
  <span style="width: 200px;text-align: right;padding-right: 10px;">备注</span>
  <vui-input
    v-model="formInfo.remarks"
    v-multi-ref="newCheck.ref.remarks"
    :rule="newCheck.rule.remarks"
    type="textarea"
  ></vui-input>
</div>
<div style="margin-top: 30px;" class="middle-left-wrap">
  <span style="width: 200px;text-align: right;padding-right: 10px;"></span>
  <vui-button @click="save">保存</vui-button>
</div>
<script>
export default {
  data() {
    return {
      formInfo: {
        input: '',
        storeName: '',
        remarks: '',
        haveIdCard: '',
        other: []
      },
      psChangeArr: [
        {
          value: 1,
          name: 'other1'
        },
        {
          value: 2,
          name: 'other2'
        },
        {
          value: 3,
          name: 'other3'
        }
      ],
      newCheck: this.$check.deepFreeze({
        rule: {
          storeId: [
            {numMax: 100, tip: '请输入不大于100的数值'},
            {decimal: 0, tip: '请输入整数'}
          ],
          storeName: [
            {require: true, tip: '此项必输'},
            {strMax: 200, tip: '请输入不超过200字'}
          ],
          licenseNumber: [
            {require: true, tip: '此项必输'},
            {define: this.checkCompanyId, tip: '请输入正确的营业执照号或身份证号'}
          ],
          remarks: [
            {require: true, tip: '此项必输'},
            {strMax: 200, tip: '请输入不超过200字'}
          ],
          other: [
            {require: true, tip: '此项必选'}
          ],
          haveIdCard: [
           {require: true, tip: '此项必选'}
          ]
        }
      })
    }
  },
  methods: {
    save: function() {
      if (!this.$check.isRight(this.newCheck.ref, this)) {
        console.log('请检查数据格式');
        return;
      } else {
        alert("submit")
      }
    },
    checkCompanyId: function(value) {
       if (this.$check.checkCardID(value) || this.$check.checkLicense(value)) {
         return true;
       } else {
         return false;
       }
    },
      
  }
}
</script>
```
:::



### 自定义校验规则

这个例子中展示了如何使用自定义验证规则

:::demo  `{define: this.checkCompanyId, tip: '请输入正确的营业执照号或身份证号'}` 即自定义校验规则
```html

<div class="middle-left-wrap" style="margin-bottom: 20px;">
  <span style="width: 200px;text-align: right;padding-right: 10px;">营业执照号码或身份证号</span>
  <vui-input 
    v-model="formInfo.input"
    v-multi-ref="newCheck.ref.licenseNumber" 
    placeholder="请输入内容"
    :rule="newCheck.rule.licenseNumber"
  ></vui-input>
</div>
<div style="margin-top: 30px;" class="middle-left-wrap">
  <span style="width: 200px;text-align: right;padding-right: 10px;"></span>
  <vui-button @click="save">保存</vui-button>
</div>
<script>
export default {
  data() {
    return {
      formInfo: {
        input: '',
      },
      newCheck: this.$check.deepFreeze({
        rule: {
          licenseNumber: [
            {require: true, tip: '此项必输'},
            {define: this.checkCompanyId, tip: '请输入正确的营业执照号或身份证号'}
          ]
        }
      })
    }
  },
  methods: {
    save: function() {
      if (!this.$check.isRight(this.newCheck.ref, this)) {
        console.log('请检查数据格式');
        return;
      } else {
        alert("submit")
      }
    },
    checkCompanyId: function(value) {
       if (this.$check.checkCardID(value) || this.$check.checkLicense(value)) {
         return true;
       } else {
         return false;
       }
    },
      
  }
}
</script>
```
:::


```html
     参数
     require： true, 表示必输项 
     tip ： 提示语句
     decimal：0表示整数，2代表保留2位以内的小数，以此类推
     strMax ：最大字符， strMin： 最小字符长度
     numMax： 数值最大， numMin： 最小数值
     define: 自定义校验函数
     vui-pc组件中自带基础数据校验，使用如下四种写法（除了自定义校验以外：{define: this.checkCompanyId, tip: '请输入正确的营业执照号或身份证号'} ）：
     [
       {require: true, tip: '年龄不能为空'},
       {strMax: 5, strMin: 2, tip:'长度在 2 到 5 个字符'},
       {numMax: 1000000000000, numMin: 0, tip: '请输入0到12位数值'},
       {decimal: 0, tip: '请输入整数'}
     ],
```
