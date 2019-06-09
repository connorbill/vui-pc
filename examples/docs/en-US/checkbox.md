## Checkbox

A group of options for multiple choices.

### Basic usage

Checkbox can be used alone to switch between two states.

:::demo Define `v-model`(bind variable) in `vui-checkbox`. The default value is a `Boolean` for single `checkbox`, and it becomes `true` when selected. Content inside the `vui-checkbox` tag will become the description following the button of the checkbox.

```html
<template>
  <!-- `checked` should be true or false -->
  <vui-checkbox v-model="checked">Option</vui-checkbox>
</template>
<script>
  export default {
    data() {
      return {
        checked: true
      };
    }
  };
</script>
```
:::

### Disabled State

Disabled state for checkbox.

:::demo Set the `disabled` attribute.

```html
<template>
  <vui-checkbox v-model="checked1" disabled>Option</vui-checkbox>
  <vui-checkbox v-model="checked2" disabled>Option</vui-checkbox>
</template>
<script>
  export default {
    data() {
      return {
        checked1: false,
        checked2: true
      };
    }
  };
</script>
```
:::

###  Checkbox group

It is used for multiple checkboxes which are bound in one group, and indicates whether one option is selected by checking if it is checked.

:::demo `checkbox-group` element can manage multiple checkboxes in one group by using `v-model` which is bound as an `Array`. Inside the `vui-checkbox` element, `label` is the value of the checkbox. If no content is nested in that tag, `label` will be rendered as the description following the button of the checkbox. `label` also corresponds with the element values in the array. It is selected if the specified value exists in the array, and vice versa.

```html
<template>
  <vui-checkbox-group v-model="checkList">
    <vui-checkbox label="option1"></vui-checkbox>
    <vui-checkbox label="option2"></vui-checkbox>
    <vui-checkbox label="option3"></vui-checkbox>
    <vui-checkbox label="disabled" disabled></vui-checkbox>
    <vui-checkbox label="disabled option" disabled></vui-checkbox>
  </vui-checkbox-group>
</template>

<script>
  export default {
    data () {
      return {
        checkList: ['disabled option','option1']
      };
    }
  };
</script>
```
:::



### Checkbox Attributes
| Attribute      | Description         | Type    | Options                         | Default|
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | binding value | string / number / boolean | — | — |
| label     | value of the Checkbox when used inside a `checkbox-group`| string / number / boolean  | 
| disabled  | whether the Checkbox is disabled   | boolean   |  — | false   |
| name | native 'name' attribute | string    |      —         |     —    |
| checked  | if the Checkbox is checked    | boolean   |  — | false   |

### Checkbox Events
| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| change  | triggers when the binding value changes | the updated value |

### Checkbox-group Attributes
| Attribute      | Description         | Type    | Options                         | Default|
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | binding value | array | — | — |
| disabled  | whether the Checkbox is disabled     | boolean   | — | false   |

### Checkbox-group Events
| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| change  | triggers when the binding value changes | the updated value |
