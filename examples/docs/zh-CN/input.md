## Input 输入框

通过鼠标或键盘输入字符

:::warning
Input 为受控组件，它**总会显示 Vue 绑定值**。

通常情况下，应当处理 `input` 事件，并更新组件的绑定值（或使用`v-model`）。否则，输入框内显示的值将不会改变。

不支持 `v-model` 修饰符。
:::

### 基础用法

:::demo
```html
<vui-input v-model="input" placeholder="请输入内容"></vui-input>

<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
</script>
```
:::


### 禁用状态

:::demo 通过 `disabled` 属性指定是否禁用 input 组件
```html
<vui-input
  placeholder="请输入内容"
  v-model="input1"
  :disabled="true">
</vui-input>

<script>
export default {
  data() {
    return {
      input1: ''
    }
  }
}
</script>
```
:::


### 密码框

:::demo 使用`show-password`属性即可得到一个可切换显示隐藏的密码框

```html
<vui-input placeholder="请输入密码" v-model="input11" show-password></vui-input>

<script>
  export default {
    data() {
      return {
        input11: ''
      }
    }
  }
</script>
```
:::

### 文本域

用于输入多行文本信息，通过将 `type` 属性的值指定为 textarea。

:::demo 文本域高度可通过 `rows` 属性控制
```html
<vui-input
  type="textarea"
  :rows="2"
  placeholder="请输入内容"
  v-model="textarea">
</vui-input>

<script>
export default {
  data() {
    return {
      textarea: ''
    }
  }
}
</script>
```
:::



### Input Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| type         | 类型   | string  | text，textarea 和其他 [原生 input 的 type 值](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types) | text |
| value / v-model | 绑定值           | string / number  | — | — |
| maxlength     | 原生属性，最大输入长度      | number          |  —  | — |
| minlength     | 原生属性，最小输入长度      | number          | — | — |
| placeholder   | 输入框占位文本    | string          | — | — |
| show-password | 是否显示切换密码图标| boolean         | — | false |
| disabled      | 禁用            | boolean         | — | false   |
| autocomplete | 原生属性，自动补全 | string | on, off | off |
| name | 原生属性 | string | — | — |
| readonly | 原生属性，是否只读 | boolean | — | false |
| resize | 控制是否能被用户缩放 | string | none, both, horizontal, vertical | — |

### Input Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| blur | 在 Input 失去焦点时触发 | (event: Event) |
| focus | 在 Input 获得焦点时触发 | (event: Event) |
| change | 在 Input 值改变时触发 | (value: string \| number) |

### Input Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 input 获取焦点 | — |
| blur | 使 input 失去焦点 | — |
| select | 选中 input 中的文字 | — |

