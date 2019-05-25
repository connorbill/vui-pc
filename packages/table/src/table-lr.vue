<template>
  <div class="vui-lr-layout">
    <div class="vui-lr-layout-table vui-lr-layout-border vui-lr-layout-common-bg" :style="[{'width': tableWidth+'px'}]">
      <div class="table__body-wrapper">
        <table>
          <colgroup>
            <col v-for="(item, index) in tableColumn" :key="index" :width="item.width">
          </colgroup>
          <slot></slot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VuiTableLr',
    data: function() {
      return {
        // tableColumn: [
        //     {
        //         width: 150,
        //     }
        // ],
        tableWidth: 0
      };
    },
    props: {
      column: {
        type: Array,
        default: function() {
          return [];
        }
      }
    },
    computed: {
      tableColumn() {
        return this.column;
      }
    },
    watch: {
      column: {
        immediate: true,
        handler(newVal) {
          // this.column = [].concat(newVal)
          this.calTableColumn();
        }
      }
    },
    methods: {
      calTableColumn: function() {
        var data = this.tableColumn;
        this.tableWidth = 0;
        for (var i = 0; i < data.length; i++) {
          this.tableWidth += data[i].width;
        }
      }
    }
  };
</script>




