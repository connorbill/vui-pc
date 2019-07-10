## Scrollbar 

Used to control the moving direction of the content area when the mouse wheel is moving

### Basic usage


:::demo 
```html
  <template>
    <div>
    <div class="li-scroll">
      <vui-scrollbar
        scroll="about"
        tag="ul"
        :viewStyle="{height: '100px'}"
        view-class="list">
        <slot>
          <li style="white-space: nowrap;">In general English usage, length (symbols: l, L) is one particular instance of distance: an object's length is its extent along its longest dimension. </li>
          <li style="white-space: nowrap;">In general English usage, length (symbols: l, L) is one particular instance of distance: an object's length is its extent along its longest dimension. </li>
          <li style="white-space: nowrap;">In general English usage, length (symbols: l, L) is one particular instance of distance: an object's length is its extent along its longest dimension. </li>
          <li style="white-space: nowrap;">In general English usage, length (symbols: l, L) is one particular instance of distance: an object's length is its extent along its longest dimension. </li>
          <li style="white-space: nowrap;">In general English usage, length (symbols: l, L) is one particular instance of distance: an object's length is its extent along its longest dimension. </li>
          <li style="white-space: nowrap;">In general English usage, length (symbols: l, L) is one particular instance of distance: an object's length is its extent along its longest dimension. </li>
          <li style="white-space: nowrap;">In general English usage, length (symbols: l, L) is one particular instance of distance: an object's length is its extent along its longest dimension. </li>
          <li style="white-space: nowrap;">In general English usage, length (symbols: l, L) is one particular instance of distance: an object's length is its extent along its longest dimension. </li>
          <li style="white-space: nowrap;">In general English usage, length (symbols: l, L) is one particular instance of distance: an object's length is its extent along its longest dimension. </li>
          <li style="white-space: nowrap;">In general English usage, length (symbols: l, L) is one particular instance of distance: an object's length is its extent along its longest dimension. </li>
          <li style="white-space: nowrap;">In general English usage, length (symbols: l, L) is one particular instance of distance: an object's length is its extent along its longest dimension. </li>

        </slot>
      </vui-scrollbar>
    </div>
    </div>
  </template>
<style>
 
</style>
  <script>
    export default {
      data() {
        return {
        };
      },
      mounted() {
      },
      methods: {
      }
    }
  </script>
```
:::










### Scrollbar Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| wrapStyle |  | string | — | — |
| wrapClass |  | string | — | — |
| viewClass |  | string | — | — |
| viewStyle | | string | — | — |
| tag | Tag name containing content | string | — | div |
| scroll | When the mouse wheel is moving, the content scroll direction  | string | seesaw / about  | about |
| showX | Whether to display the horizontal scroll bar | boolen | — | true |
| showY | Whether to display the vertical scroll bar | boolen | — | true |


