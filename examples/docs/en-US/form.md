## Form 

Form consists of `input`, `radio`, `select`, `checkbox` and so on. With form, you can collect, verify and submit data.

### Validation



:::demo Bind the rule `rule` to the component and use the directive `v-multi-ref` to bind the corresponding ref to automatically verify it. `newCheck.ref` is added by the `$check.deepFreeze` function, so don't use Manually add, keep the field name corresponding to rule in dom (for example, v-multi-ref="newCheck.ref.storeName");
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
  <span style="width: 200px;text-align: right;padding-right: 10px;">name</span>
  <vui-input
    v-model="formInfo.storeName"
    v-multi-ref="newCheck.ref.storeName"
    :rule="newCheck.rule.storeName"
  ></vui-input>
</div>
<div class="middle-left-wrap" style="margin-bottom: 20px;">
  <span style="width: 200px;text-align: right;padding-right: 10px;">Business license number or ID number</span>
  <vui-input 
    v-model="formInfo.input"
    v-multi-ref="newCheck.ref.licenseNumber" 
    placeholder="Please input"
    :rule="newCheck.rule.licenseNumber"
  ></vui-input>
</div>
<div class="middle-left-wrap" style="margin-bottom: 20px;">
  <span style="width: 200px;text-align: right;padding-right: 10px;">Is there a document?</span>
    <vui-radio-group
            v-model="formInfo.haveIdCard"
            :rule="newCheck.rule.haveIdCard"
            v-multi-ref="newCheck.ref.haveIdCard"
    >
        <vui-radio  :label="1">true</vui-radio>
        <vui-radio  :label="2" style="margin-left: 15px;" >false</vui-radio>
    </vui-radio-group>
</div>

<div class="middle-left-wrap" style="margin-bottom: 20px;">
  <span style="width: 200px;text-align: right;padding-right: 10px;">other</span>
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
  <span style="width: 200px;text-align: right;padding-right: 10px;">remarks</span>
  <vui-input
    v-model="formInfo.remarks"
    v-multi-ref="newCheck.ref.remarks"
    :rule="newCheck.rule.remarks"
    type="textarea"
  ></vui-input>
</div>
<div style="margin-top: 30px;" class="middle-left-wrap">
  <span style="width: 200px;text-align: right;padding-right: 10px;"></span>
  <vui-button @click="save">Save</vui-button>
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
            {numMax: 100, tip: 'Please enter a value no greater than 100'},
            {decimal: 0, tip: 'Please enter an integer'}
          ],
          storeName: [
            {require: true, tip: 'This item must be lost'},
            {strMax: 200, tip: 'Please enter no more than 200 words'}
          ],
          licenseNumber: [
            {require: true, tip: 'This item must be lost'},
            {define: this.checkCompanyId, tip: 'Please enter the correct business license number or ID number'}
          ],
          remarks: [
            {require: true, tip: 'This item must be lost'},
            {strMax: 200, tip: 'Please enter no more than 200 words'}
          ],
          other: [
            {require: true, tip: 'This item is required'}
          ],
          haveIdCard: [
           {require: true, tip: 'This item is required'}
          ]
        }
      })
    }
  },
  methods: {
    save: function() {
      if (!this.$check.isRight(this.newCheck.ref, this)) {
        console.log('Please check the data format');
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



### Custom validation rules


This example shows how to customize your own validation rules to finish a two-factor password verification.

:::demo  `{define: this.checkCompanyId, tip: 'Please enter the correct business license number or ID number'}` Custom verification rule
```html

<div class="middle-left-wrap" style="margin-bottom: 20px;">
  <span style="width: 200px;text-align: right;padding-right: 10px;">Business license number or ID number</span>
  <vui-input 
    v-model="formInfo.input"
    v-multi-ref="newCheck.ref.licenseNumber" 
    placeholder="Please input"
    :rule="newCheck.rule.licenseNumber"
  ></vui-input>
</div>
<div style="margin-top: 30px;" class="middle-left-wrap">
  <span style="width: 200px;text-align: right;padding-right: 10px;"></span>
  <vui-button @click="save">Save</vui-button>
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
            {require: true, tip: 'This item must be lost'},
            {define: this.checkCompanyId, tip: 'Please enter the correct business license number or ID number'}
          ],
        }
      })
    }
  },
  methods: {
    save: function() {
      if (!this.$check.isRight(this.newCheck.ref, this)) {
        console.log('Please check the data format');
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
     Attributes
     require： true, Indicates that must be entered
     tip ： Prompt statement
     decimal：0 means an integer, 2 means to keep a decimal within 2 digits, and so on.
     strMax ：Maximum character length， strMin： Minimum character length
     numMax： Maximum value， numMin： Minimum value
     define: Custom check function
     vui-pc The basic data check is included in the component. The following four methods are used.（In addition to custom verification：{define: this.checkCompanyId, tip: 'Please enter the correct business license number or ID number'} ）：
     [
       {require: true, tip: ''},
       {strMax: 5, strMin: 2, tip:'2 to 5 characters in length'},
       {numMax: 1000000000000, numMin: 0, tip: 'Please enter a value from 0 to 12 digits'},
       {decimal: 0, tip: 'Please enter an integer'}
     ],
```
