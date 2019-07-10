
## DatePicker

Use Date Picker for date input. This component dependencies [My97DatePicker](http://www.my97.net/),In order to maintain consistency with the back-end system

###  Select

:::demo 
```html
<template>
  <div class="block">
    <span class="demonstration">default</span>
    <!--<vui-date-picker
      v-model="value1"
      date-format="yyyy-MM-dd"
      placeholder="Select date">
    </vui-date-picker>-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value1: '',
      };
    }
  };
</script>
```
:::



### Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value / v-model | binding value |  string / number | — | — |
| disabled | whether DatePicker is disabled | boolean | — | false |
| rule | Verification rule |  | Array | - |
| date-format | Date format | string | — | yyyy-MM-dd |
| idName | input id | string | — | value |
| option | For other date configuration items, please refer to[My97DatePicker](http://www.my97.net/)，Configuration items are identical | Object | — | value |
| class-name | 输入框样式 | string | — | value |

### Events
| Event Name | Description | Parameters |
|---------|--------|---------|
| change | triggers when user confirms the value |  |
| blur | triggers when Input blurs  |  |
| focus | triggers when Input focuses |  |

