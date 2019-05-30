## Button
Commonly used button.

### Basic usage

:::demo Use `type`、`plain` to define Button's style.

```html
  <vui-button >Default</vui-button>
  <vui-button type="primary" >Primary</vui-button>
  <vui-button type="success" >success</vui-button>
  <vui-button type="warning" >warning</vui-button>
  <vui-button type="danger" >danger</vui-button>
  <vui-button type="info" >info</vui-button>
  <div style="margin-top: 10px;">
    <vui-button plain>Plain</vui-button>
    <vui-button type="primary" plain>primary</vui-button>
  <vui-button type="success" plain>success</vui-button>
  <vui-button type="warning" plain>warning</vui-button>
  <vui-button type="danger" plain>danger</vui-button>
  <vui-button type="info" plain>info</vui-button>
  </div>
  <div style="margin-top: 10px;">
    <vui-button round>Round</vui-button>
    <vui-button type="primary" round>primary</vui-button>
    <vui-button type="success" round>success</vui-button>
    <vui-button type="info" round>info</vui-button>
    <vui-button type="warning" round>warning</vui-button>
    <vui-button type="danger" round>danger</vui-button>
  </div>

```
:::

### Disabled Button

The `disabled` attribute determines if the button is disabled.

:::demo  Use `disabled` attribute to determine whether a button is disabled. It accepts a `Boolean` value.

```html
  <vui-button disabled>Default</vui-button>
  <vui-button type="primary" disabled>primary</vui-button>
  <div style="margin-top: 10px;">
    <vui-button plain disabled>Plain</vui-button>
    <vui-button type="primary" plain disabled>primary</vui-button>
  </div>
```
:::


### Text Button

Buttons without border and background.

:::demo
```html
<vui-button type="text">Text Button</vui-button>
<vui-button type="text" disabled>Text Button</vui-button>
```
:::

### Loading Button

Click the button to load data, then the button displays a loading state.

:::demo Set `loading` attribute to `true` to display loading state.

```html
  <vui-button type="primary" :loading="true">Loading</vui-button>
```
:::

### Attributes
| Attribute      | Description    | Type      | Accepted values       | Default   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | button type   | string    |   primary / success / warning / danger / info / text |     —    |
| plain     | determine whether it's a plain button   | boolean    | — | false   |
| round     |determine whether it's a round button   | boolean    | — | false   |
| circle     | determine whether it's a circle button  | boolean    | — | false   |
| loading     | determine whether it's loading    | boolean    | — | false   |
| disabled  | disable the button    | boolean   | —   | false   |
