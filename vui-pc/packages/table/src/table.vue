<template>
  <div
    :class="setClassName">
    <div
      ref="vuitable"
      class="vui-table   vui-table-common-bg vui-total-table-border vui-total-table-display vui-default-style"
      :class="{'vui-scroll-seesaw': scroll }"
      :style="{ width: (store.tableWidth + 2) + 'px' }"
    >
      <vui-scrollbar
        v-on:movex="setMoveX"
        v-on:movey="setMoveY"
        :show-y="true"
        :scroll="scrollType"
        v-if="scrollType">
        <!--overflow-x-vui-->
        <div
          >
          <div class="" ref="tableScroll" :class="[ setScrollPosition ? `is-scrolling-${setScrollPosition}` : 'is-scrolling-left' ]">
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
              :style="[{left: store.scrollLeft}]"
              class="vui-table__header-wrapper vui-table__header-wrapper-scroll"
              ref="headerWrapperScroll">
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
              :style="[bodyHeight]"
              class="vui-table__body-wrapper"
              ref="bodyWrapper">
              <table :style="{ width: store.tableWidth + 'px'}">
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
                <tr :style="{height: store.footerHeight + 'px'}"></tr>
                </tbody>
              </table>
            </div>
            <div
              v-if="setShowEmpty && !store.data && store.data.length === 0"
              class="vui-table__empty-block"
              :style="[{ width: store.tableWidth + 'px' }, {bottom: emptyBottom + 'px' }]"
              ref="emptyBlock">
                    <span class="vui-table__empty-text">
                      <slot name="empty">暂无数据</slot>
                    </span>
            </div>
            <div
              style="opacity: 0;"
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
            <div
              :style="[{left: store.scrollLeft}]"
              v-if="store.showFooter"
              class="vui-table__footer-wrapper vui-table__footer-wrapper-scroll"
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
                <table :style="{ width: store.tableWidth + 'px' }" >
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
              :style="[bodyHeight, { top: bodyTop+ 'px'}]"
              class="vui-table__fixed-body-wrapper"
              ref="leftFixedBodyWrapper">
              <table :style="[{ width: store.tableWidth + 'px' },{transform: 'translateY(' + store.scrollBodyTop + 'px)'}]" ref="leftFixedHeaderWrapperBody">
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
                <tr :style="{height: store.footerHeight + 'px'}"></tr>
                </tbody>
              </table>
            </div>
            <div
              v-if="setShowEmpty && !store.data && store.data.length === 0"
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
              v-if="rightFixedColumns > 0"
              ref="rightFixedHeaderWrapper"
              class="vui-table__fixed-header-wrapper">
              <table
                      :style="[{ width: store.tableWidth + 'px' }]"
                     >
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
              :style="[bodyHeight, { top: bodyTop+ 'px'}]"
              class="vui-table__fixed-body-wrapper"
              ref="rightFixedBodyWrapper">
              <table :style="[{ width: store.tableWidth + 'px' },{transform: 'translateY(' + store.scrollBodyTop + 'px)'}]" >
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
                <tr :style="{height: store.footerHeight + 'px'}"></tr>
                </tbody>
              </table>
            </div>
            <div
              v-if="setShowEmpty && !store.data && store.data.length === 0"
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
      </vui-scrollbar>
      <div v-else>
        <div class="overflow-x-vui" ref="tableScroll" :class=" `is-scrolling-${setScrollPosition}`">
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
            v-if="setShowEmpty && !store.data && store.data.length === 0"
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
            :style="[bodyHeight, { top: bodyTop+ 'px'}]"
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
            v-if="setShowEmpty && !store.data && store.data.length === 0"
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
            :style="[bodyHeight, { top: bodyTop+ 'px'}]"
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
            v-if="setShowEmpty && !store.data && store.data.length === 0"
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
  </div>
</template>

<script>
  let vuiTableRefArr = [];
  import {addResizeListener, removeResizeListener} from '../../../src/utils/resize-event';
  import Scrollbar from '../../scrollbar/src/main';

  export default {
    name: 'VuiTable',
    data: function() {
      let store = {
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
        area: [],
        maxHeight: null,
        height: null,
        headerHeight: null,
        footerHeight: null,
        showSeasawScroll: false,
        scrollLeft: 0,
        scrollBodyTop: 0
      };
      return {
        store,
        isAuto: false,
        overflowx: '',
        bodyTop: 0,
        leftFixedColumns: 0,
        leftFixedWidth: 0,
        leftOneFixWidth: '',
        rightOneFixWidth: '',
        rightFixedColumns: 0,
        rightFixedWidth: 0,
        tableHeight: 0,
        scrollPosition: 'left',
        isShowFix: true,
        emptyBottom: 0,
        vuiTableRef: 'vuitable'
      };
    },
    components: {
      [Scrollbar.name]: Scrollbar
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
      showFooter: {
        type: Boolean
      },
      className: {
        type: [Array, String],
        default: ''
      },
      scroll: {
        type: String,
        default: ''
      },
      height: [String, Number],
      maxHeight: [String, Number],
      showHeader: {
        type: Boolean,
        default: true
      },
      showEmpty: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      setClassName() {
        return this.className;
      },
      bodyWrapper() {
        return this.$refs.tableScroll;
      },
      vuiTableWrapper() {
        return this.$refs.vuitable;
      },
      insTableWidth() {
        return this.store.tableWidth;
      },
      insTableHeight() {
        return this.store.tableHeight;
      },
      scrollType() {
        return this.scroll;
      },
      setShowEmpty() {
        return this.showEmpty;
      },
      isSeasawScroll() {
        if (this.scrollType() === 'seesaw') {
          return true;
        }
        if (this.scrollType() === 'about') {
          return false;
        }
      },
      setScrollPosition() {
        return this.scrollPosition;
      },
      bodyHeight() {
        if (this.height) {
          return {
            height: this.store.bodyHeight ? this.store.bodyHeight + 'px' : ''
          };
        } else if (this.maxHeight) {
          return {
            'max-height': (this.showHeader
              ? this.maxHeight - this.store.headerHeight - this.store.footerHeight
              : this.maxHeight - this.store.footerHeight) + 'px'
          };
        }
        return {};
      }
    },
    watch: {
      data: {
        immediate: true,
        handler(newVal) {
          if (newVal[0] !== null && newVal[0] !== '') {
            this.store.data = [].concat(newVal);
          }
          this.$nextTick(() => {
            // body 高度设置
            this.setCol();
            this.setTableHeight();
          });
        }
      },
      property: {
        immediate: true,
        handler() {
          this.$nextTick(() => {
            // body 高度设置
            this.setCol();
            this.setTableHeight();
          });
        }
      },
      height: {
        immediate: true,
        handler(value) {
          this.setHeight(value);
        }
      },
      maxHeight: {
        immediate: true,
        handler(value) {
          this.setMaxHeight(value);
        }
      }
    },
    mounted: function() {
      this.bindEvents();
      this.windowSize();
      this.setCol();
      this.setTableHeight();
      this.$nextTick(function() {
        // 将每一个在页面中使用后的vui-table存储起来。
        vuiTableRefArr.push({ref: this.$refs.vuitable, ins: this});
      });
      this.$ready = true;
    },
    methods: {
      setCol: function() {
        let that = this;
        let tdWidthArr = [];
        let headTitleArr = [];
        this.property.forEach(function(item) {
          item.slot = item.slot.toLowerCase();
        });
        let property = this.property;
        let leftArr = [];
        let centerArr = [];
        let rightArr = [];
        let leftArrTitle = [];
        let centerArrTitle = [];
        let rightArrTitle = [];
        this.leftFixedWidth = 0;
        this.rightFixedWidth = 0;
        for (let i = 0; i < property.length; i++) {
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

        let thTitle = [].concat(leftArrTitle).concat(centerArrTitle).concat(rightArrTitle);
        let pro = [].concat(leftArr).concat(centerArr).concat(rightArr);
        this.leftFixedColumns = leftArr.length;
        this.rightFixedColumns = rightArr.length;

        pro.forEach(function(item) {
          tdWidthArr.push(item.width);
          headTitleArr.push(item.headTitle);
        });
        let tableWidth = this.sumArr(tdWidthArr);
        Object.assign(this.store, {
          tdWidthArr: [].concat(tdWidthArr),
          thTitle: [].concat(thTitle),
          tableWidth: tableWidth,
          data: [].concat(this.data),
          rule: this.rule,
          isEdit: false,
          showFooter: this.showFooter,
          property: [].concat(this.property),
          maxHeight: this.maxHeight
        });
        this.$nextTick(function() {
          // 将每一个在页面中使用后的vui-table存储起来。
          that.isShowFixJudge();
        });
      },
      setTableHeight: function() {

        this.$nextTick(function() {
          let headerHeight = 0;
          let footerHeight = 0;
          let emptyBlockHeight = 0;
          let bodyHeight = this.$refs.bodyWrapper.offsetHeight;
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
          this.store.headerHeight = headerHeight;
          this.store.footerHeight = footerHeight;
        });
      },
      isShowFixJudge: function() {
        // 由于本组件在页面上多次使用之后，只能监控到一个vui-table中的 ref为vuitable的组件，
        // 所以，循环去查找每个渲染vui-table， 去监测每个 vui-table的可视宽度，去控制左右固定列是否显示
        // 当左右固定列的宽度再加上200，还大于表格本身可视宽度时，就将固定列隐藏掉
        // 也就是说，当浏览器横向缩小到足够小时或者电脑屏幕太小时，表格显示宽度小于固定列加起来的和的宽度，就隐藏固定列，
        // 这样就可以看到完整的表格的数据，在编辑表格数据时，不至于固定列遮挡住表格内容
        this.$nextTick(() => {
          let that = this;
          if (that.vuiTableWrapper.offsetWidth >= that.store.tableWidth) {
            that.isShowFix = false;
          } else {
            vuiTableRefArr.forEach(function(item) {
              if (item.ref.offsetWidth < item.ins.leftFixedWidth + item.ins.rightFixedWidth + 200) {
                item.ins.isShowFix = false;
              } else {
                item.ins.isShowFix = true;
              }
            });
          }
        });
      },
      resizeListener() {
        if (!this.$ready) return;
        this.setCol();
        this.setTableHeight();
      },
      windowSize: function() {
        let that = this;
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
              if (item.ref.offsetWidth < item.ins.leftFixedWidth + item.ins.rightFixedWidth + 200) {
                item.ins.isShowFix = false;
              } else {
                item.ins.isShowFix = true;
              }
            });
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
        const {headerWrapper, footerWrapper} = this.$refs;
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
        addResizeListener(this.$el, this.resizeListener);
      },
      setMoveX(val) {
        // console.log(val);
        // console.log(val.left);
        if (val.left === 0) {
          this.store.scrollLeft = 0;
        } else {
          this.store.scrollLeft = -val.left + 'px';
        }
        // if (this.scrollType === 'about') {
        const {headerWrapper, footerWrapper} = this.$refs;
        const refs = this.$refs;
        let sLeft = val.left;
        let self = this;
        if (headerWrapper) headerWrapper.scrollLeft = sLeft;
        if (footerWrapper) footerWrapper.scrollLeft = sLeft;
        if (refs.leftFixedBodyWrapper) refs.leftFixedBodyWrapper.scrollTop = this.bodyWrapper.scrollTop;
        if (refs.rightFixedBodyWrapper) refs.rightFixedBodyWrapper.scrollTop = this.bodyWrapper.scrollTop;
        const maxScrollLeftPosition = this.bodyWrapper.scrollWidth - this.bodyWrapper.offsetWidth - 1;
        const scrollLeft = sLeft;
        if (scrollLeft >= maxScrollLeftPosition) {
          self.scrollPosition = 'right';
        } else if (scrollLeft === 0) {
          self.scrollPosition = 'left';
        } else {
          self.scrollPosition = 'middle';
        }
        if (this.bodyWrapper.scrollWidth === this.bodyWrapper.offsetWidth) {
          self.scrollPosition = 'none';
        }
        // }
      },
      setMoveY(val) {
        // console.log(val);
        // this.$refs.leftFixedHeaderWrapperBody.scrollTop = val.top;
        this.store.scrollBodyTop = -val.top;
        // this.bodyTop = (this.store.headerHeight - val.top);
        // console.log(this.bodyTop);
        // if (this.scrollType !== 'about') {
        //   const {headerWrapper, footerWrapper} = this.$refs;
        //   const refs = this.$refs;
        //   let sLeft = val.left;
        //   let self = this;
        //   if (headerWrapper) headerWrapper.scrollLeft = sLeft;
        //   if (footerWrapper) footerWrapper.scrollLeft = sLeft;
        //   if (refs.leftFixedBodyWrapper) refs.leftFixedBodyWrapper.scrollTop = this.bodyWrapper.scrollTop;
        //   if (refs.rightFixedBodyWrapper) refs.rightFixedBodyWrapper.scrollTop = this.bodyWrapper.scrollTop;
        //   const maxScrollLeftPosition = this.bodyWrapper.scrollWidth - this.bodyWrapper.offsetWidth - 1;
        //   const scrollLeft = sLeft;
        //   if (scrollLeft >= maxScrollLeftPosition) {
        //     self.scrollPosition = 'right';
        //   } else if (scrollLeft === 0) {
        //     self.scrollPosition = 'left';
        //   } else {
        //     self.scrollPosition = 'middle';
        //   }
        //   if (this.bodyWrapper.scrollWidth === this.bodyWrapper.offsetWidth) {
        //     self.scrollPosition = 'none';
        //   }
        // }
      },
      setScrollY(val) {
        console.log(val);
      },
      sumArr: function(arr) {
        let s = 0;
        for (let i = 0; i < arr.length; i++) {
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
      },
      setHeight(value, prop = 'height') {
        // this.store.maxHeight = value;
        const el = this.$el;
        if (typeof value === 'string' && /^\d+$/.test(value)) {
          value = Number(value);
        }
        this.store.height = value;

        if (!el && (value || value === 0)) return this.$nextTick(() => this.setHeight(value, prop));

        if (typeof value === 'number') {
          el.style[prop] = value + 'px';

          this.setTableHeight();
        } else if (typeof value === 'string') {
          el.style[prop] = value;
          this.setTableHeight();
        }
      },
      setMaxHeight(value) {
        return this.setHeight(value, 'max-height');
      }
    },
    destroyed() {
      if (this.resizeListener) removeResizeListener(this.$el, this.resizeListener);
    }
  };
</script>




