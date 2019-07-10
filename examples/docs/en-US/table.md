## Table 


### Basic table


:::demo 
```html
  <template>
    <vui-table
      :data="list"
      :property="property"
      class-name="vui-example-table"
      scroll="about"
    >
      <template v-slot:operator="slotProps">
        <div class="middle-center">
          <vui-button  @click="addDom(slotProps.row.index)">Add</vui-button>
          <vui-button @click="delDom(slotProps.row.index)">delete</vui-button>
        </div>
      </template>
    </vui-table>
  </template>
  <script>
    export default {
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
          dataArr: [
            {
              storeName: 'storeName',
              appropriationAmount: 'Amount',
              appropriationDate: 'Date',
              repaymentType: 'Type1',
              lendingRate: 'Rate',
              serviceTariffing: '1Tariffing',
              serviceTariffing2: '1Tariffing2',
              serviceTariffing3: '1Tariffing3'
            },
            {
              storeName: 'storeName',
              appropriationAmount: 'Amount',
              appropriationDate: 'Date',
              repaymentType: 'Type2',
              lendingRate: 'Rate',
              serviceTariffing: '2Tariffing',
              serviceTariffing2: '2Tariffing2',
              serviceTariffing3: '2Tariffing3'
            },
            {
              storeName: 'storeName',
              appropriationAmount: 'Amount',
              appropriationDate: 'Date',
              repaymentType: 'Type3',
              lendingRate: 'Rate',
              serviceTariffing: '3Tariffing',
              serviceTariffing2: '3Tariffing2',
              serviceTariffing3: '3Tariffing3'
            },
            {
              storeName: 'storeName',
              appropriationAmount: 'Amount',
              appropriationDate: 'Date',
              repaymentType: 'Type4',
              lendingRate: 'Rate',
              serviceTariffing: '4Tariffing',
              serviceTariffing2: '4Tariffing2',
              serviceTariffing3: '4Tariffing3'
            },
            {
              storeName: 'storeName',
              appropriationAmount: 'Amount',
              appropriationDate: 'Date',
              repaymentType: 'Type5',
              lendingRate: 'Rate',
              serviceTariffing: '5Tariffing',
              serviceTariffing2: '5Tariffing2',
              serviceTariffing3: '5Tariffing3'
            },
            {
              storeName: 'storeName',
              appropriationAmount: 'Amount',
              appropriationDate: 'Date',
              repaymentType: 'Type6',
              lendingRate: 'Rate',
              serviceTariffing: '6Tariffing',
              serviceTariffing2: '6Tariffing2',
              serviceTariffing3: '6Tariffing3'
            },
            {
              storeName: 'storeName',
              appropriationAmount: 'Amount',
              appropriationDate: 'Date',
              repaymentType: 'Type7',
              lendingRate: 'Rate',
              serviceTariffing: '7Tariffing',
              serviceTariffing2: '7Tariffing2',
              serviceTariffing3: '7Tariffing3'
            },
            {
              storeName: 'storeName',
              appropriationAmount: 'Amount',
              appropriationDate: 'Date',
              repaymentType: 'Type8',
              lendingRate: 'Rate',
              serviceTariffing: '8Tariffing',
              serviceTariffing2: '8Tariffing2',
              serviceTariffing3: '8Tariffing3'
            }
          ],
          propertyArr: [
            {
              headTitle: 'Serial number',
              width: 60, 
              prop: '',
              slot: 'indexSlot',
              fixed: '',
              className: '',
              position: '',
              type: 'index'
            },
            {
              headTitle: 'Borrower',
              width: 150,
              prop: 'storeName',
              slot: 'storeName',
              className: '',
              fixed: '',
              type: ''
            },
            {
              headTitle: 'Borrowing amount (yuan)',
              width: 150,
              prop: 'appropriationAmount',
              slot: 'appropriationAmount',
              className: '',
              fixed: '',
              type: ''
            },
            {
              headTitle: 'Borrowing period',
              width: 100,
              prop: 'appropriationDate',
              slot: 'appropriationDate',
              className: '',
              fixed: '',
              type: ''
            },
            {
              headTitle: 'Repayment',
              width: 150,
              prop: 'repaymentType',
              slot: 'repaymentType',
              className: '',
              fixed: '',
              type: ''
            },
            {
              headTitle: 'Borrowing interest rate (%)',
              width: 110,
              prop: 'lendingRate',
              slot: 'lendingRate',
              className: '',
              fixed: '',
              type: ''
            },
            {
              headTitle: 'row',
              width: 130,
              prop: 'serviceTariffing',
              slot: 'serviceTariffing',
              className: '',
              fixed: '',
              type: ''
            },
            {
              headTitle: 'row 2',
              width: 130,
              prop: 'serviceTariffing2',
              slot: 'serviceTariffing3',
              className: '',
              fixed: '',
              type: ''
            },
            {
              headTitle: 'operator',
              width: 160,
              prop: 'operator',
              slot: 'operator',
              className: '',
              fixed: '',
              type: ''
            }
          ]
        };
      },
      mounted() {
        var that = this;
        that.property = [].concat(that.propertyArr);
        that.list = [].concat(this.dataArr);
      },
      methods: {
        addDom(index) {
          this.domArr.push({a: [1, 2, 3]});
        },
        delDom() {
          this.domArr.splice(0, 1);
        },
        changeCol: function(a) {
          if (a === 1) {
            this.property.splice(2, 1);
            this.list.splice(1, 1);
          } else {
            this.property.push(
              {
                headTitle: 'status',
                width: 100,
                prop: 'statusName',
                slot: 'statusName',
                className: '',
                fixed: '',
                type: ''
              });
            this.list.push(5);
          }
        }
      }
    }
  </script>
```
:::

### Table



:::demo 
```html
  <template>
          <vui-table
            :data="list"
            :property="property"
            class-name="vui-risk-table"
            scroll="about"
            :show-footer="true"
            max-height="200"
          >
            <template v-slot:operator="slotProps">
              <div class="middle-center">
                <vui-button  @click="addDom(slotProps.row.index)">Add</vui-button>
                <vui-button @click="delDom(slotProps.row.index)">delete</vui-button>
              </div>
            </template>
            <template v-slot:footer="slotProps">
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
                <td>9</td>
              </tr>
            </template>
          </vui-table>
  </template>

  <script>
    export default {
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
          dataArr: [
            {
              storeName: 'storeName',
              appropriationAmount: 'Amount',
              appropriationDate: 'Date',
              repaymentType: 'Type1',
              lendingRate: 'Rate',
              serviceTariffing: '1Tariffing',
              serviceTariffing2: '1Tariffing2',
              serviceTariffing3: '1Tariffing3'
            },
            {
              storeName: 'storeName',
              appropriationAmount: 'Amount',
              appropriationDate: 'Date',
              repaymentType: 'Type2',
              lendingRate: 'Rate',
              serviceTariffing: '2Tariffing',
              serviceTariffing2: '2Tariffing2',
              serviceTariffing3: '2Tariffing3'
            },
            {
              storeName: 'storeName',
              appropriationAmount: 'Amount',
              appropriationDate: 'Date',
              repaymentType: 'Type3',
              lendingRate: 'Rate',
              serviceTariffing: '3Tariffing',
              serviceTariffing2: '3Tariffing2',
              serviceTariffing3: '3Tariffing3'
            },
            {
              storeName: 'storeName',
              appropriationAmount: 'Amount',
              appropriationDate: 'Date',
              repaymentType: 'Type4',
              lendingRate: 'Rate',
              serviceTariffing: '4Tariffing',
              serviceTariffing2: '4Tariffing2',
              serviceTariffing3: '4Tariffing3'
            },
            {
              storeName: 'storeName',
              appropriationAmount: 'Amount',
              appropriationDate: 'Date',
              repaymentType: 'Type5',
              lendingRate: 'Rate',
              serviceTariffing: '5Tariffing',
              serviceTariffing2: '5Tariffing2',
              serviceTariffing3: '5Tariffing3'
            },
            {
              storeName: 'storeName',
              appropriationAmount: 'Amount',
              appropriationDate: 'Date',
              repaymentType: 'Type6',
              lendingRate: 'Rate',
              serviceTariffing: '6Tariffing',
              serviceTariffing2: '6Tariffing2',
              serviceTariffing3: '6Tariffing3'
            },
            {
              storeName: 'storeName',
              appropriationAmount: 'Amount',
              appropriationDate: 'Date',
              repaymentType: 'Type7',
              lendingRate: 'Rate',
              serviceTariffing: '7Tariffing',
              serviceTariffing2: '7Tariffing2',
              serviceTariffing3: '7Tariffing3'
            },
            {
              storeName: 'storeName',
              appropriationAmount: 'Amount',
              appropriationDate: 'Date',
              repaymentType: 'Type8',
              lendingRate: 'Rate',
              serviceTariffing: '8Tariffing',
              serviceTariffing2: '8Tariffing2',
              serviceTariffing3: '8Tariffing3'
            }
          ],
          propertyArr: [
            {
              headTitle: 'Serial number',
              width: 60, 
              prop: '',
              slot: 'indexSlot',
              fixed: 'left',
              className: '',
              position: '',
              type: 'index'
            },
            {
              headTitle: 'Borrower',
              width: 150,
              prop: 'storeName',
              slot: 'storeName',
              className: '',
              fixed: 'left',
              type: ''
            },
            {
              headTitle: 'Borrowing amount (yuan)',
              width: 150,
              prop: 'appropriationAmount',
              slot: 'appropriationAmount',
              className: '',
              fixed: '',
              type: ''
            },
            {
              headTitle: 'Borrowing period',
              width: 100,
              prop: 'appropriationDate',
              slot: 'appropriationDate',
              className: '',
              fixed: '',
              type: ''
            },
            {
              headTitle: 'Repayment',
              width: 150,
              prop: 'repaymentType',
              slot: 'repaymentType',
              className: '',
              fixed: '',
              type: ''
            },
            {
              headTitle: 'Borrowing interest rate (%)',
              width: 110,
              prop: 'lendingRate',
              slot: 'lendingRate',
              className: '',
              fixed: '',
              type: ''
            },
            {
              headTitle: 'row',
              width: 130,
              prop: 'serviceTariffing',
              slot: 'serviceTariffing',
              className: '',
              fixed: '',
              type: ''
            },
            {
              headTitle: 'row 2',
              width: 130,
              prop: 'serviceTariffing2',
              slot: 'serviceTariffing3',
              className: '',
              fixed: '',
              type: ''
            },
            {
              headTitle: 'operator',
              width: 160,
              prop: 'operator',
              slot: 'operator',
              className: '',
              fixed: 'right',
              type: ''
            }
          ]
        };
      },
      mounted() {
        var that = this;
        // setTimeout(function() {
        //   that.property = [].concat(that.propertyArr);
        //   // that.list = [].concat([1, 2, 3, 4, 5, 6]);
        // }, 3000);
        that.property = [].concat(that.propertyArr);
        that.list = [].concat(this.dataArr);
      },
      methods: {
        addDom(index) {
          this.domArr.push({a: [1, 2, 3]});
        },
        delDom() {
          this.domArr.splice(0, 1);
        },
        changeCol: function(a) {
          if (a === 1) {
            this.property.splice(2, 1);
            this.list.splice(1, 1);
          } else {
            this.property.push(
              {
                headTitle: 'status',
                width: 100,
                prop: 'statusName',
                slot: 'statusName',
                className: '',
                fixed: '',
                type: ''
              });
            this.list.push(5);
          }
        }
      }
    }
  </script>
```
:::

### Table

:::demo 
```html
  <template>
          <vui-table
            :data="list"
            :property="property"
            class-name="vui-risk-table"
            scroll="seesaw"
            :show-footer="true"
            max-height="200"
          >
            <template v-slot:operator="slotProps">
              <div class="middle-center">
                <vui-button  @click="addDom(slotProps.row.index)">Add</vui-button>
                <vui-button @click="delDom(slotProps.row.index)">delete</vui-button>
              </div>
            </template>
            <template v-slot:footer="slotProps">
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
                <td>9</td>
              </tr>
            </template>
          </vui-table>
  </template>

  <script>
    export default {
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
          dataArr: [
            {
              storeName: 'storeName',
              appropriationAmount: 'Amount',
              appropriationDate: 'Date',
              repaymentType: 'Type1',
              lendingRate: 'Rate',
              serviceTariffing: '1Tariffing',
              serviceTariffing2: '1Tariffing2',
              serviceTariffing3: '1Tariffing3'
            },
            {
              storeName: 'storeName',
              appropriationAmount: 'Amount',
              appropriationDate: 'Date',
              repaymentType: 'Type2',
              lendingRate: 'Rate',
              serviceTariffing: '2Tariffing',
              serviceTariffing2: '2Tariffing2',
              serviceTariffing3: '2Tariffing3'
            },
            {
              storeName: 'storeName',
              appropriationAmount: 'Amount',
              appropriationDate: 'Date',
              repaymentType: 'Type3',
              lendingRate: 'Rate',
              serviceTariffing: '3Tariffing',
              serviceTariffing2: '3Tariffing2',
              serviceTariffing3: '3Tariffing3'
            },
            {
              storeName: 'storeName',
              appropriationAmount: 'Amount',
              appropriationDate: 'Date',
              repaymentType: 'Type4',
              lendingRate: 'Rate',
              serviceTariffing: '4Tariffing',
              serviceTariffing2: '4Tariffing2',
              serviceTariffing3: '4Tariffing3'
            },
            {
              storeName: 'storeName',
              appropriationAmount: 'Amount',
              appropriationDate: 'Date',
              repaymentType: 'Type5',
              lendingRate: 'Rate',
              serviceTariffing: '5Tariffing',
              serviceTariffing2: '5Tariffing2',
              serviceTariffing3: '5Tariffing3'
            },
            {
              storeName: 'storeName',
              appropriationAmount: 'Amount',
              appropriationDate: 'Date',
              repaymentType: 'Type6',
              lendingRate: 'Rate',
              serviceTariffing: '6Tariffing',
              serviceTariffing2: '6Tariffing2',
              serviceTariffing3: '6Tariffing3'
            },
            {
              storeName: 'storeName',
              appropriationAmount: 'Amount',
              appropriationDate: 'Date',
              repaymentType: 'Type7',
              lendingRate: 'Rate',
              serviceTariffing: '7Tariffing',
              serviceTariffing2: '7Tariffing2',
              serviceTariffing3: '7Tariffing3'
            },
            {
              storeName: 'storeName',
              appropriationAmount: 'Amount',
              appropriationDate: 'Date',
              repaymentType: 'Type8',
              lendingRate: 'Rate',
              serviceTariffing: '8Tariffing',
              serviceTariffing2: '8Tariffing2',
              serviceTariffing3: '8Tariffing3'
            }
          ],
          propertyArr: [
            {
              headTitle: 'Serial number',
              width: 60, 
              prop: '',
              slot: 'indexSlot',
              fixed: 'left',
              className: '',
              position: '',
              type: 'index'
            },
            {
              headTitle: 'Borrower',
              width: 150,
              prop: 'storeName',
              slot: 'storeName',
              className: '',
              fixed: 'left',
              type: ''
            },
            {
              headTitle: 'Borrowing amount (yuan)',
              width: 150,
              prop: 'appropriationAmount',
              slot: 'appropriationAmount',
              className: '',
              fixed: '',
              type: ''
            },
            {
              headTitle: 'Borrowing period',
              width: 100,
              prop: 'appropriationDate',
              slot: 'appropriationDate',
              className: '',
              fixed: '',
              type: ''
            },
            {
              headTitle: 'Repayment',
              width: 150,
              prop: 'repaymentType',
              slot: 'repaymentType',
              className: '',
              fixed: '',
              type: ''
            },
            {
              headTitle: 'Borrowing interest rate (%)',
              width: 110,
              prop: 'lendingRate',
              slot: 'lendingRate',
              className: '',
              fixed: '',
              type: ''
            },
            {
              headTitle: 'row',
              width: 130,
              prop: 'serviceTariffing',
              slot: 'serviceTariffing',
              className: '',
              fixed: '',
              type: ''
            },
            {
              headTitle: 'row 2',
              width: 130,
              prop: 'serviceTariffing2',
              slot: 'serviceTariffing3',
              className: '',
              fixed: '',
              type: ''
            },
            {
              headTitle: 'operator',
              width: 160,
              prop: 'operator',
              slot: 'operator',
              className: '',
              fixed: 'right',
              type: ''
            }
          ]
        };
      },
      mounted() {
        var that = this;
        // setTimeout(function() {
        //   that.property = [].concat(that.propertyArr);
        //   // that.list = [].concat([1, 2, 3, 4, 5, 6]);
        // }, 3000);
        that.property = [].concat(that.propertyArr);
        that.list = [].concat(this.dataArr);
      },
      methods: {
        addDom(index) {
          this.domArr.push({a: [1, 2, 3]});
        },
        delDom() {
          this.domArr.splice(0, 1);
        },
        changeCol: function(a) {
          if (a === 1) {
            this.property.splice(2, 1);
            this.list.splice(1, 1);
          } else {
            this.property.push(
              {
                headTitle: '状态',
                width: 100,
                prop: 'statusName',
                slot: 'statusName',
                className: '',
                fixed: '',
                type: ''
              });
            this.list.push(5);
          }
        }
      }
    }
  </script>
```
:::


### Table Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| data | Displayed data | array | — | — |
| property | Configuration item for each column | array | — | — |
| height | The height of the Table, the default is the automatic height. If height is a number type, the unit is px; if height is a string type, the height is set to the value of the table's style.height , and the height of the Table is controlled by the outer style.  | string/number | — | — |
| max-height | Maximum height of the Table | string/number | — | — |
| show-header | Whether to display the header | boolean | — | true |
| empty-text | The text content displayed when empty data can also be set by `slot="empty"` | String | — | 暂无数据 |
| show-footer | Whether to display the total line at the end of the table | Boolean | — | false |

### property Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | Corresponding column type. If `index` is set, the index of the line is displayed (calculated from 1); | string | - | — |
| prop | The name of the field corresponding to the column content, you can also use the property property | string | — | — |
| width | Corresponding column width | string | — | — |
| fixed | Whether the column is fixed to the left or right | string | left, right | — |
| headTitle | Column header name | string | — | — |
| slot | Corresponding slot of the column | string | — | — |
| class-name | className of  row  | string | — | — |


