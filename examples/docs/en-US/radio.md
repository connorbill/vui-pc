## Radio

Single selection among multiple options.

### Basic usage


:::demo Creating a radio component is easy, you just need to bind a variable to Radio's `v-model`. It equals to the value of `label` of the chosen radio. The type of `label` is `String`, `Number` or `Boolean`.

```html
<template>
  <vui-radio v-model="radio" label="1">Option A</vui-radio>
  <vui-radio v-model="radio" label="2">Option B</vui-radio>
</template>

<script>
  export default {
    data () {
      return {
        radio: '1'
      };
    }
  }
</script>
```
:::

### Disabled

`disabled` attribute is used to disable the radio.

:::demo You just need to add the `disabled` attribute.
```html
<template>
  <vui-radio disabled v-model="radio1" label="disabled">Option A</vui-radio>
  <vui-radio disabled v-model="radio1" label="selected and disabled">Option B</vui-radio>
</template>

<script>
  export default {
    data () {
      return {
        radio1: 'selected and disabled'
      };
    }
  }
</script>
```
:::

### Radio button group

Suitable for choosing from some mutually exclusive options.

:::demo Combine `vui-radio-group` with `vui-radio` to display a radio group. Bind a variable with `v-model` of `vui-radio-group` element and set label value in `vui-radio`. It also provides `change` event with the current value as its parameter.

```html
<template>
  <vui-radio-group v-model="radio2">
    <vui-radio :label="3">Option A</vui-radio>
    <vui-radio :label="6">Option B</vui-radio>
    <vui-radio :label="9">Option C</vui-radio>
  </vui-radio-group>
</template>

<script>
  export default {
    data () {
      return {
        radio2: 3
      };
    }
  }
</script>
```
:::


### Radio Attributes
 Attribute      | Description          | Type      | Accepted Values       | Default
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | binding value | string / number / boolean | — | — |
| label     | the value of Radio   | string / number / boolean    |       —        |      —   |
| disabled  | whether Radio is disabled    | boolean   | — | false   |
| name | native 'name' attribute | string    |      —         |     —    |

### Radio Events
| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| change  | triggers when the bound value changes |  the label value of the chosen radio  |

### Radio-group Attributes
 Attribute      | Description          | Type      | Accepted Values       | Default
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | binding value | string / number / boolean | — | — |
| disabled  | whether the nesting radios are disabled    | boolean   | — | false   |

### Radio-group Events
| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| change  | triggers when the bound value changes |  the label value of the chosen radio |

