

## Pagination

When there is too much data, use page breakup to decompose the data.

### Basic usage

:::demo 
```html
<div class="block">
  <vui-pager
      :current-page.sync="page"
      :total="1000"
      @current-change="handleCurrentChange">
    </vui-pager>
</div>
<script>
  export default {
    data() {
      return {
        page: 1,
      };
    },
    methods: {
      handleCurrentChange(val) {
        console.log(val)
      }
    }
  }
</script>

```
:::



### Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
| page-size | item count of each page, supports the .sync modifier | number | — | 10 |
| total | total item count | number | — | — |
| current-page | current page number, supports the .sync modifier | number | — | 1 |

### Events
| Event Name | Description | Parameters |
|---------|--------|---------|
| current-change | triggers when `current-page` changes | the new current page |

