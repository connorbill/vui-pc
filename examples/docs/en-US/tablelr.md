

## Table-lr 

Used to display left and right display content layout tables

### Basic table


:::demo 
```html
  <template>
    <vui-table-lr
      :column="layoutTable"
    >
      <template>
          <tbody>
          <tr>
              <td>Picture type：</td>
              <td>
                  
              </td>
          </tr>
          <tr>
              <td>image：</td>
              <td>
                  
              </td>
          </tr>
          </tbody>
      </template>
    </vui-table-lr>
  </template>

  <script>
    export default {
      data() {
        return {
          layoutTable: [
              {width: 150},
              {width: 800},
          ],
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










### Table-lr Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| column | Set the width of each column, the width field in the array represents the width | array | — | — |



