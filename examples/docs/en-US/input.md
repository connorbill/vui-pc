## Input

Input data using mouse or keyboard.


### Basic usage

:::demo
```html
<vui-input v-model="input" placeholder="Please input"></vui-input>

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


### Disabled

:::demo Disable the Input with the `disabled` attribute.
```html
<vui-input
  placeholder="Please input"
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


### Password box

:::demo Make a toggleable password Input with the `show-password` attribute.

```html
<vui-input placeholder="Please input password" v-model="input11" show-password></vui-input>

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

### Textarea

Resizable for entering multiple lines of text information. Add attribute `type="textarea"` to change `input` into native `textarea`.

:::demo Control the height by setting the `rows` prop.
```html
<vui-input
  type="textarea"
  :rows="2"
  placeholder="Please input"
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



### Autocomplete

You can get some recommended tips based on the current input.

:::demo Autocomplete component provides input suggestions.The `fetch-suggestions` attribute is a method that returns suggested input. In this example, `querySearch(queryString, cb)` returns suggestions to Autocomplete via `cb(data)` when suggestions are ready.
```html

<div class="sub-title">list suggestions when activated</div>
<vui-autocomplete
  class="inline-input"
  v-model="state1"
  :fetch-suggestions="querySearch"
  placeholder="Please Input"
  @select="handleSelect"
></vui-autocomplete>


<div class="sub-title">list suggestions on input</div>
<vui-autocomplete
  class="inline-input"
  v-model="state2"
  :fetch-suggestions="querySearch"
  placeholder="Please Input"
  :trigger-on-focus="false"
  @select="handleSelect"
></vui-autocomplete>

<script>
  export default {
    data() {
      return {
        links: [],
        state1: '',
        state2: ''
      };
    },
    methods: {
      querySearch(queryString, cb) {
        var links = this.links;
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        // call callback function to return suggestions
        cb(results);
      },
      createFilter(queryString) {
        return (link) => {
          return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "vue", "link": "https://github.com/vuejs/vue" },
          { "value": "element", "link": "https://github.com/ElemeFE/element" },
          { "value": "cooking", "link": "https://github.com/ElemeFE/cooking" },
          { "value": "mint-ui", "link": "https://github.com/ElemeFE/mint-ui" },
          { "value": "vuex", "link": "https://github.com/vuejs/vuex" },
          { "value": "vue-router", "link": "https://github.com/vuejs/vue-router" },
          { "value": "babel", "link": "https://github.com/babel/babel" }
         ];
      },
      handleSelect(item) {
        console.log(item);
      }
    },
    mounted() {
      this.links = this.loadAll();
    }
  }
</script>
```
:::


### Custom template

Customize how suggestions are displayed.

:::demo Use `scoped slot` to customize suggestion items. In the scope, you can access the suggestion object via the `item` key.
```html
<vui-autocomplete
  popper-class="my-autocomplete"
  v-model="state3"
  :fetch-suggestions="querySearch"
  placeholder="please input"
  @select="handleSelect">
  <i
    class="vui-icon-edit vui-input__icon"
    slot="suffix"
    @click="handleIconClick">
  </i>
  <template slot-scope="{ item }">
    <div class="name">{{ item.value }}</div>
    <span class="addr">{{ item.address }}</span>
  </template>
</vui-autocomplete>

<style>
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>

<script>
  export default {
    data() {
      return {
        links: [],
        state3: ''
      };
    },
    methods: {
      querySearch(queryString, cb) {
        var links = this.links;
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        // call callback function to return suggestion objects
        cb(results);
      },
      createFilter(queryString) {
        return (link) => {
          return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "vue", "link": "https://github.com/vuejs/vue" },
          { "value": "element", "link": "https://github.com/ElemeFE/element" },
          { "value": "cooking", "link": "https://github.com/ElemeFE/cooking" },
          { "value": "mint-ui", "link": "https://github.com/ElemeFE/mint-ui" },
          { "value": "vuex", "link": "https://github.com/vuejs/vuex" },
          { "value": "vue-router", "link": "https://github.com/vuejs/vue-router" },
          { "value": "babel", "link": "https://github.com/babel/babel" }
         ];
      },
      handleSelect(item) {
        console.log(item);
      },
      handleIconClick(ev) {
        console.log(ev);
      }
    },
    mounted() {
      this.links = this.loadAll();
    }
  }
</script>
```
:::

### Remote search

Search data from server-side.

:::demo
```html
<vui-autocomplete
  v-model="state4"
  :fetch-suggestions="querySearchAsync"
  placeholder="please input"
  @select="handleSelect"
></vui-autocomplete>
<script>
  export default {
    data() {
      return {
        links: [],
        state4: '',
        timeout:  null
      };
    },
    methods: {
      loadAll() {
        return [
          { "value": "vue", "link": "https://github.com/vuejs/vue" },
          { "value": "element", "link": "https://github.com/ElemeFE/element" },
          { "value": "cooking", "link": "https://github.com/ElemeFE/cooking" },
          { "value": "mint-ui", "link": "https://github.com/ElemeFE/mint-ui" },
          { "value": "vuex", "link": "https://github.com/vuejs/vuex" },
          { "value": "vue-router", "link": "https://github.com/vuejs/vue-router" },
          { "value": "babel", "link": "https://github.com/babel/babel" }
         ];
      },
      querySearchAsync(queryString, cb) {
        var links = this.links;
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createFilter(queryString) {
        return (link) => {
          return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      }
    },
    mounted() {
      this.links = this.loadAll();
    }
  };
</script>
```
:::



### Input Attributes

| Attribute      | Description         | Type    | Options                         | Default|
|-------------  |---------------- |---------------- |---------------------- |-------- |
| type         | type of input   | string  | text，textarea | text |
| value / v-model | binding value           | string / number  | — | — |
| maxlength     | same as `maxlength` in native input      | number          |  —  | — |
| minlength     | same as `minlength` in native input     | number          | — | — |
| placeholder   | placeholder of Input    | string          | — | — |
| show-password | whether to show toggleable password input| boolean         | — | false |
| disabled      | whether Input is disabled            | boolean         | — | false   |
| autocomplete | same as `autocomplete` in native input | string | on, off | off |
| name | same as `name` in native input | string | — | — |
| readonly | same as `readonly` in native input | boolean | — | false |
| resize | control the resizability | string | none, both, horizontal, vertical | — |

### Input Events

| Event Name | Description | Parameters |
|---------|--------|---------|
| blur | triggers when Input blurs | (event: Event) |
| focus | triggers when Input focuses | (event: Event) |
| change | triggers when the icon inside Input value change | (value: string \| number) |

### Input Methods

| Method | Description | Parameters |
| ---- | ---- | ---- |
| focus | focus the input element| — |
| blur | blur the input element | — |
| select | select the text in input element | — |


### Autocomplete Attributes

Attribute | Description | Type | Options | Default
|-------------  |---------------- |---------------- |---------------------- |-------- |
| placeholder   | the placeholder of Autocomplete   | string          | — | — |
| disabled      |whether Autocomplete is disabled            | boolean         | — | false   |
| value-key | key name of the input suggestion object for display | string | — | value |
| value         | binding value   | string  | — | — |
| debounce      |debounce delay when typing, in milliseconds | number         | — | 300 |
| placement     | placement of the popup menu | string         | top / top-start / top-end / bottom / bottom-start / bottom-end | bottom-start |
| fetch-suggestions | a method to fetch input suggestions. When suggestions are ready, invoke `callback(data:[])` to return them to Autocomplete | Function(queryString, callback)   | Function(queryString, callback)  | — | — |
| popper-class | custom class name for autocomplete's dropdown | string | — | — |
| trigger-on-focus | whether show suggestions when input focus | boolean | — | true |
| name | same as `name` in native input  | string | — | — |
| select-when-unmatched | 在whether to emit a `select` event on enter when there is no autocomplete match | boolean | — | false |
| hide-loading | whether to hide the loading icon in remote search | boolean | — | false |
| popper-append-to-body | whether to append the dropdown to body. If the positioning of the dropdown is wrong, you can try to set this prop to false | boolean | - | true |
| highlight-first-item |  whether to highlight first item in remote search suggestions by default | boolean | — | false |

### Autocomplete Scoped Slot
| Name | Description |
|------|--------|
| — |Custom content for input suggestions. The scope parameter is { item } |

### Autocomplete Events

| Event Name | Description | Parameters |
|---------|--------|---------|
| select | triggers when a suggestion is clicked | suggestion being clicked |

### Autocomplete Methods

| Method | Description | Parameters |
| ---- | ---- | ---- |
| focus | focus the input element | - |
