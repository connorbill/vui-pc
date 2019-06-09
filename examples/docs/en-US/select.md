## Select 

When there are plenty of options, use a drop-down menu to display and select desired ones.

### Basic usage

:::demo `v-model` is the value of `option` that is currently selected.
```html
<template>
  <vui-select
    v-model="value"
    :option="options"
    select-id="value"
    select-name="label"
    select-default-name="please select"
  ></vui-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: 'Option1',
          label: 'Option1'
        }, {
          value: 'Option2',
          label: 'Option2'
        }, {
          value: 'Option3',
          label: 'Option3'
        }, {
          value: 'Option4',
          label: 'Option4'
        }, {
          value: 'Option5',
          label: 'Option5'
        }],
        value: ''
      }
    }
  }
</script>
```
:::


### Disabled 


:::demo Set the value of `disabled` in `vui-option` to `true` to disable this option.
```html
<template>
  <vui-select v-model="value3" disabled
    select-default-name="please select">
  </vui-select>
</template>
  
<script>
  export default {
    data() {
      return {
        options2: [{
          value: 'Option1',
          label: 'Option1'
        }, {
          value: 'Option2',
          label: 'Option2',
          disabled: true
        }, {
          value: 'Option3',
          label: 'Option3'
        }, {
          value: 'Option4',
          label: 'Option4'
        }, {
          value: 'Option5',
          label: 'Option5'
        }],
        value3: ''
      }
    }
  }
</script>
```
:::



### Select Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value / v-model | binding value | boolean / string / number | — | — |
| disabled | whether Select is disabled | boolean | — | false |
| select-id | option prop of value | string | — | value |
| select-name | name of show  | string | — | value |
| select-default-name | set default name of empty option  | string | — | value |
| show-default-name | whether show default empty option | string | — | value |
| option | option array | string | — | value |
| class-name |`class` of  select  | string | — | value |

### Select Events
| Event Name | Description | Parameters |
|---------|---------|---------|
| change | triggers when the selected value changes | current selected value |

