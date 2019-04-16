<template>
  <div>
    <div
      :style="[{maxWidth: store.tableWidth + 2 + 'px' }]"
      ref="vuitable"
      class="vui-table   vui-table-common-bg vui-total-table-border vui-total-table-display vui-default-style"
    >
      <div class="overflow-x-vui" ref="tableScroll" :class=" 'is-scrolling-' + scrollPosition">
        <div class="hidden-columns" ref="hiddenColumns">
          <slot></slot>
        </div>
        <div
          class="vui-table__header-wrapper"
          ref="headerWrapper">
          <div class="table__header-wrapper">
            <table :style="{ width: store.tableWidth + 'px' }">
              <colgroup>
                <col v-for="(item, index) in store.tdWidthArr" :key="index" :style="{ width: item + 'px' }"/>
              </colgroup>
              <thead>
              <slot name="header">
                <tr>
                  <th v-for="(item, index) in store.thTitle" :key="index">{{item}}</th>
                </tr>
              </slot>
              </thead>
            </table>
          </div>
        </div>
        <div
          class="vui-table__body-wrapper"
          ref="bodyWrapper">
          <table :style="{ width: store.tableWidth + 'px' }">
            <colgroup>
              <col v-for="(item, index) in store.tdWidthArr" :key="index" :style="{ width: item + 'px' }"/>
            </colgroup>
            <tbody>
            <slot name="body">
              <tr v-for="(item, index) in store.data" :key="index" v-if="!store.isEdit">
                <td v-for="(edit, editIndex) in store.property" :key="editIndex">
                  <slot :name=" edit['slot'] " :index="index" :row="item">
                    <div v-if="edit.type == 'index' " class="cell">{{index+1}}</div>
                    <div v-else class="cell">{{ item[ edit['prop'] ] }}</div>
                  </slot>
                </td>
              </tr>
            </slot>
            </tbody>
          </table>
        </div>
        <div
          v-if="!store.data || store.data.length === 0"
          class="vui-table__empty-block"
          :style="[{ width: store.tableWidth + 'px' }, {bottom: emptyBottom + 'px' }]"
          ref="emptyBlock">
                        <span class="vui-table__empty-text">
                          <slot name="empty">暂无数据</slot>
                        </span>
        </div>
        <div
          v-if="store.showFooter"
          class="vui-table__footer-wrapper"
          ref="footerWrapper">
          <table :style="{ width: store.tableWidth + 'px' }">
            <colgroup>
              <col v-for="(item, index) in store.tdWidthArr" :key="index" :style="{ width: item + 'px' }"/>
            </colgroup>
            <tbody>
            <slot name="footer"></slot>
            </tbody>
          </table>
        </div>
      </div>
      <div v-show="isShowFix" class="vui-table__fixed"
           :style="[{width: leftFixedWidth + 'px' }, {height: tableHeight + 'px' }]">
        <div
          v-if="leftFixedColumns > 0"
          class="vui-table__header-wrapper "
          ref="leftFixedHeaderWrapper">
          <div class="table__header-wrapper vui-table__fixed-header-wrapper">
            <table :style="{ width: store.tableWidth + 'px' }">
              <colgroup>
                <col v-for="(item, index) in store.tdWidthArr" :key="index" :style="{ width: item + 'px' }"/>
              </colgroup>
              <thead>
              <slot name="header">
                <tr>
                  <th v-for="(item, index) in store.thTitle" :key="index">{{item}}</th>
                </tr>
              </slot>
              </thead>
            </table>
          </div>

        </div>
        <div
          :style="[{ top: bodyTop+ 'px'}]"
          class="vui-table__fixed-body-wrapper"
          ref="leftFixedBodyWrapper">
          <table :style="{ width: store.tableWidth + 'px' }">
            <colgroup>
              <col v-for="(item, index) in store.tdWidthArr" :key="index" :style="{ width: item + 'px' }"/>
            </colgroup>
            <tbody>
            <slot name="body">
              <tr v-for="(item, index) in store.data" :key="index" v-if="!store.isEdit">
                <td v-for="(edit, editIndex) in store.property" :key="editIndex">
                  <slot :name=" edit['slot'] " :index="index" :row="item">
                    <div v-if="edit.type == 'index' " class="cell">{{index+1}}</div>
                    <div v-else class="cell">{{ item[ edit['prop'] ] }}</div>
                  </slot>
                </td>
              </tr>
            </slot>
            </tbody>
          </table>
        </div>
        <div
          v-if="!store.data || store.data.length === 0"
          class="vui-table__empty-block"
          :style="[{ width: store.tableWidth + 'px' }, {bottom: emptyBottom + 'px' }]"
          ref="emptyBlock">
                        <span class="vui-table__empty-text">
                          <slot name="empty">暂无数据</slot>
                        </span>
        </div>
        <div
          v-if="store.showFooter"
          class="vui-table__fixed-footer-wrapper"
          ref="leftFixedFooterWrapper">
          <table :style="{ width: store.tableWidth + 'px' }">
            <colgroup>
              <col v-for="(item, index) in store.tdWidthArr" :key="index" :style="{ width: item + 'px' }"/>
            </colgroup>
            <tbody>
            <slot name="footer"></slot>
            </tbody>
          </table>
        </div>

      </div>
      <div v-show="isShowFix" class="vui-table__fixed-right "
           :style="[{width: rightFixedWidth + 'px'},{height: tableHeight + 'px' }]">
        <div
          v-if="leftFixedColumns > 0"
          ref="rightFixedHeaderWrapper"
          class="vui-table__fixed-header-wrapper">
          <table :style="{ width: store.tableWidth + 'px' }">
            <colgroup>
              <col v-for="(item, index) in store.tdWidthArr" :key="index" :style="{ width: item + 'px' }"/>
            </colgroup>
            <thead>
            <slot name="header">
              <tr>
                <th v-for="(item, index) in store.thTitle" :key="index">{{item}}</th>
              </tr>
            </slot>
            </thead>
          </table>
        </div>
        <div
          :style="[{ top: bodyTop+ 'px'}]"
          class="vui-table__fixed-body-wrapper"
          ref="rightFixedBodyWrapper">
          <table :style="{ width: store.tableWidth + 'px' }">
            <colgroup>
              <col v-for="(item, index) in store.tdWidthArr" :key="index" :style="{ width: item + 'px' }"/>
            </colgroup>
            <tbody>
            <slot name="body">
              <tr v-for="(item, index) in store.data" :key="index" v-if="!store.isEdit">
                <td v-for="(edit, editIndex) in store.property" :key="editIndex">
                  <slot :name=" edit['slot'] " :index="index" :row="item">
                    <div v-if="edit.type == 'index' " class="cell">{{index+1}}</div>
                    <div v-else class="cell">{{ item[ edit['prop'] ] }}</div>
                  </slot>
                </td>
              </tr>
            </slot>
            </tbody>
          </table>
        </div>
        <div
          v-if="!store.data || store.data.length === 0"
          :style="[{ width: store.tableWidth + 'px' }, {bottom: emptyBottom + 'px' }]"
          class="vui-table__empty-block"
          ref="emptyBlock">
                        <span class="vui-table__empty-text">
                          <slot name="empty">暂无数据</slot>
                        </span>
        </div>
        <div
          v-if="store.showFooter"
          class="vui-table__fixed-footer-wrapper"
          ref="rightFixedFooterWrapper">
          <table :style="{ width: store.tableWidth + 'px' }">
            <colgroup>
              <col v-for="(item, index) in store.tdWidthArr" :key="index" :style="{ width: item + 'px' }"/>
            </colgroup>
            <tbody>
            <slot name="footer"></slot>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  let vuiTableRefArr = [];
  export default {
    name: 'VuiTable',
    data: function() {
      var store = {
        tdWidthArr: [],
        thTitle: [],
        tableWidth: 0,
        data: [],
        rule: {},
        isEdit: false,
        showFooter: false,
        property: [],
        province: [],
        citys: [],
        area: []
      };
      return {
        store,
        isAuto: false,
        overflowx: '',
        bodyTop: 0,
        bodyHeight: 0,
        leftFixedColumns: 0,
        leftFixedWidth: 0,
        leftOneFixWidth: '',
        RightOneFixWidth: '',
        rightFixedColumns: 0,
        rightFixedWidth: 0,
        tableHeight: 0,
        scrollPosition: 'left',
        isShowFix: true,
        emptyBottom: 0,
        vuiTableRef: 'vuitable'
      };
    },
    props: {
      property: {
        type: Array,
        default: function() {
          return [];
        }
      },
      data: {
        type: Array,
        default: function() {
          return [];
        }
      },
      rule: {
        type: Object,
        default: function() {
          return {};
        }
      },
      isEdit: {
        type: Boolean,
        default: false
      },
      showFooter: {
        type: Boolean
      },
      province: {
        type: Array,
        default: function() {
          return [];
        }
      },
      citys: {
        type: Array,
        default: function() {
          return [];
        }
      },
      area: {
        type: Array,
        default: function() {
          return [];
        }
      }
    },
    computed: {
      bodyWrapper() {
        return this.$refs.tableScroll;
      },
      vuiTableWrapper() {
        return this.$refs.vuitable;
      }
    },
    watch: {
      data: {
        immediate: true,
        handler(newVal) {
          if (newVal[0] !== null && newVal[0] !== '') {
            this.store.data = [].concat(newVal);
          }
          // this.$nextTick(() => {
          //     this.dataList = [].concat(value);
          // });
          // body 高度设置
          this.setTableHeight();
        }
      },
      isEdit: {
        immediate: true,
        handler(newVal) {
          // console.log(newVal)
          // this.store.isEdit = newVal;
          // this.$nextTick(() => {
          //     this.dataList = [].concat(value);
          // });
        }
      }
    },
    created: function() {
      var tdWidthArr = [];
      var headTitleArr = [];
      this.property.forEach(function(item) {
        tdWidthArr.push(item.width);
        headTitleArr.push(item.headTitle);
      });
      var tableWidth = this.sumArr(tdWidthArr);
      this.property.forEach(function(item) {
        item.slot = item.slot.toLowerCase();
      });
      Object.assign(this.store, {
        tdWidthArr: [].concat(tdWidthArr),
        thTitle: [].concat(headTitleArr),
        tableWidth: tableWidth,
        data: [].concat(this.data),
        rule: this.rule,
        isEdit: false,
        showFooter: this.showFooter,
        property: [].concat(this.property),
        province: [].concat(this.province),
        citys: [].concat(this.citys),
        area: [].concat(this.area)
      });
      var property = this.store.property;
      var leftArr = [];
      var centerArr = [];
      var rightArr = [];
      var leftArrTitle = [];
      var centerArrTitle = [];
      var rightArrTitle = [];
      for (var i = 0; i < property.length; i++) {
        if (property[i].fixed && property[i].fixed === 'left') {
          leftArr.push(property[i]);
          leftArrTitle.push(property[i].headTitle);
          this.leftFixedWidth += property[i].width;
          if (i === 0) {
            this.leftOneFixWidth = property[i].width;
          }
        } else if (property[i].fixed && property[i].fixed === 'right') {
          rightArr.push(property[i]);
          rightArrTitle.push(property[i].headTitle);
          this.rightFixedWidth += property[i].width;
          if (i === 0) {
            this.rightOneFixWidth = property[i].width;
          }
        } else {
          centerArrTitle.push(property[i].headTitle);
          centerArr.push(property[i]);
        }
      }
      this.store.thTitle = [].concat(leftArrTitle).concat(centerArrTitle).concat(rightArrTitle);
      this.store.property = [].concat(leftArr).concat(centerArr).concat(rightArr);
      this.leftFixedColumns = leftArr.length;
      this.rightFixedColumns = rightArr.length;
      // console.log(this.isEdit)
      // console.log(leftArr)
      var that = this;
      this.$nextTick(function() {
        // 将每一个在页面中使用后的vui-table存储起来。
        vuiTableRefArr.push({ ref: this.$refs.vuitable, ins: this });
        that.isShowFixJudge();
      });
    },
    mounted: function() {
      this.windowSize();
      this.bindEvents();
    },
    methods: {
      setTableHeight: function() {

        this.$nextTick(function() {
          var headerHeight = 0;
          var footerHeight = 0;
          var emptyBlockHeight = 0;
          var bodyHeight = this.$refs.bodyWrapper.offsetHeight;
          if (this.$refs.headerWrapper) {
            headerHeight = this.$refs.headerWrapper.offsetHeight;
          }
          if (this.$refs.footerWrapper) {
            footerHeight = this.$refs.footerWrapper.offsetHeight;
          }
          if (this.$refs.emptyBlock) {
            emptyBlockHeight = this.$refs.emptyBlock.offsetHeight;
          }
          this.bodyTop = headerHeight;
          this.tableHeight = headerHeight + bodyHeight + footerHeight + emptyBlockHeight;
          if (footerHeight > 0) {
            this.emptyBottom = footerHeight;
          }
        });
      },
      isShowFixJudge: function() {
        // 由于本组件在页面上多次使用之后，只能监控到一个vui-table中的 ref为vuitable的组件，
        // 所以，循环去查找每个渲染vui-table， 去监测每个 vui-table的可视宽度，去控制左右固定列是否显示
        // 当左右固定列的宽度再加上200，还大于表格本身可视宽度时，就将固定列隐藏掉
        // 也就是说，当浏览器横向缩小到足够小时或者电脑屏幕太小时，表格显示宽度小于固定列加起来的和的宽度，就隐藏固定列，
        // 这样就可以看到完整的表格的数据，在编辑表格数据时，不至于固定列遮挡住表格内容
        vuiTableRefArr.forEach(function(item) {
          if (item.ref.offsetWidth < item.ins.leftFixedWidth + item.ins.rightFixedWidth + 200) {
            item.ins.isShowFix = false;
          }
        });
      },
      windowSize: function() {
        var that = this;
        if (that.vuiTableWrapper.offsetWidth >= that.store.tableWidth) {
          that.isShowFix = false;
        } else {
          that.isShowFix = true;
        }
        window.onresize = function() {
          if (that.vuiTableWrapper.offsetWidth >= that.store.tableWidth) {
            that.isShowFix = false;
          } else {
            vuiTableRefArr.forEach(function(item) {
              // if (item.ins == that){
              //
              //     console.log(item.ref)
              //     if (item.ref.offsetWidth < that.leftFixedWidth + that.rightFixedWidth + 200){
              //         that.isShowFix = false;
              //     }else {
              //         that.isShowFix = true;
              //     }
              // }
              if (item.ref.offsetWidth < item.ins.leftFixedWidth + item.ins.rightFixedWidth + 200) {
                item.ins.isShowFix = false;
              } else {
                item.ins.isShowFix = true;
              }
            });

            // console.log(that.vuiTableWrapper)
            // console.log(that.leftFixedWidth + that.rightFixedWidth + 200)
            // if (that.vuiTableWrapper.offsetWidth < that.leftFixedWidth + that.rightFixedWidth + 200){
            //     that.isShowFix = false;
            // }else {
            //     that.isShowFix = true;
            // }
          }

          if (that.$refs.headerWrapper) {
            const headerWrapper = that.$refs.headerWrapper;
            let self = that;
            const maxScrollLeftPosition = headerWrapper.scrollWidth - headerWrapper.offsetWidth - 1;

            const scrollLeft = headerWrapper.scrollLeft;
            if (scrollLeft >= maxScrollLeftPosition) {
              self.scrollPosition = 'right';
            } else if (scrollLeft === 0) {
              self.scrollPosition = 'left';
            } else {
              self.scrollPosition = 'middle';
            }
            if (headerWrapper.scrollWidth === headerWrapper.offsetWidth) {
              self.scrollPosition = 'none';
            }
          }
        };
      },
      bindEvents() {
        const { headerWrapper, footerWrapper } = this.$refs;
        const refs = this.$refs;
        let self = this;
        this.bodyWrapper.addEventListener('scroll', function() {

          if (headerWrapper) headerWrapper.scrollLeft = this.scrollLeft;
          if (footerWrapper) footerWrapper.scrollLeft = this.scrollLeft;
          if (refs.leftFixedBodyWrapper) refs.leftFixedBodyWrapper.scrollTop = this.scrollTop;
          if (refs.rightFixedBodyWrapper) refs.rightFixedBodyWrapper.scrollTop = this.scrollTop;
          const maxScrollLeftPosition = this.scrollWidth - this.offsetWidth - 1;
          const scrollLeft = this.scrollLeft;
          if (scrollLeft >= maxScrollLeftPosition) {
            self.scrollPosition = 'right';
          } else if (scrollLeft === 0) {
            self.scrollPosition = 'left';
          } else {
            self.scrollPosition = 'middle';
          }
          if (this.scrollWidth === this.offsetWidth) {
            self.scrollPosition = 'none';
          }
        });
      },
      checkForm: function() {
        if (!this.$isRight(this.rule.ref)) {
          return { data: this.data, isRight: false };
        } else {
          return { data: this.data, isRight: true };
        }
      },
      sumArr: function(arr) {
        var s = 0;
        for (var i = 0; i < arr.length; i++) {
          s += arr[i];
        }
        return s;
      },
      objectAssign: function(target) {
        for (let i = 1, j = arguments.length; i < j; i++) {
          let source = arguments[i] || {};
          for (let prop in source) {
            if (source.hasOwnProperty(prop)) {
              let value = source[prop];
              if (value !== undefined) {
                target[prop] = value;
              }
            }
          }
        }

        return target;
      }
    }
  };
</script>

<style scoped>

</style>




