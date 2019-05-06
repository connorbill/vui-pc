<template>
  <div>
    <div>Table example</div>
    <vui-table
      :data="list"
      :property="property"
      class-name="vui-risk-table"
    >
      <template v-slot:operator="slotProps">
        <div v-for="(item, index) in domArr" :key="index">
          <div v-for="(dom, indexDom) in domArr[index].a" :key="indexDom">
            {{dom}}
          </div>
        </div>
        <div @click="addDom(slotProps.row.index)">增加</div>
        <div @click="delDom(slotProps.row.index)">减少</div>
      </template>
    </vui-table>
  </div>
</template>

<script>
  import Table from '../../../packages/table/src/table';

  export default {
    name: 'Table',
    components: {
      [Table.name]: Table
    },
    data() {
      return {
        property: [],
        list: [],
        domArr: [
          {
            a: [1, 2]
          },
          {
            a: [1, 2]
          }
        ],
        propertyArr: [
          {
            headTitle: '序号', // 表头名称
            width: 60, // 这一列宽度
            prop: '',
            slot: 'indexSlot',
            fixed: 'left', // 固定在左侧
            className: '',
            position: '',
            type: 'index' // 字段类型 index 为序号，
          },
          {
            headTitle: '借款主体',
            width: 150,
            prop: 'storeName',
            slot: 'storeName',
            className: '',
            fixed: 'left',
            type: ''
          },
          {
            headTitle: '借款金额（元）',
            width: 150,
            prop: 'appropriationAmount',
            slot: 'appropriationAmount',
            className: '',
            fixed: '',
            type: ''
          },
          {
            // 单位 ： period_unit 0 月， 1 日
            headTitle: '借款期限',
            width: 100,
            prop: 'appropriationDate',
            slot: 'appropriationDate',
            className: '',
            fixed: '',
            type: ''
          },
          {
            headTitle: '还款方式',
            width: 150,
            prop: 'repaymentType',
            slot: 'repaymentType',
            className: '',
            fixed: '',
            type: ''
          },
          {
            headTitle: '借款利率（%）',
            width: 110,
            prop: 'lendingRate',
            slot: 'lendingRate',
            className: '',
            fixed: '',
            type: ''
          },
          {
            headTitle: '居间服务费率（%）',
            width: 130,
            prop: 'serviceTariffing',
            slot: 'serviceTariffing',
            className: '',
            fixed: '',
            type: ''
          },
          {
            headTitle: '居间服务费率（%）',
            width: 130,
            prop: 'serviceTariffing',
            slot: 'serviceTariffing',
            className: '',
            fixed: '',
            type: ''
          },
          {
            headTitle: '居间服务费率（%）',
            width: 130,
            prop: 'serviceTariffing',
            slot: 'serviceTariffing',
            className: '',
            fixed: 'right',
            type: ''
          }
        ]
      };
    },
    mounted() {
      var that = this;
      setTimeout(function() {
        that.property = [].concat(that.propertyArr);
        // that.list = [].concat([1, 2, 3, 4, 5, 6]);
      }, 3000);
    },
    methods: {
      addDom(index) {
        this.domArr.push({a: [1, 2, 3]});
      },
      delDom() {
        this.domArr.splice(0, 1);
      }
    }
  };
</script>

<style scoped>

</style>
