<template>
  <ul class="vui-pager middle-center" v-if="pageCount > 0">
    <li @click="onPagerClick($event, 1)" :class="{'disabled': currentPage === 1}">
      首页
    </li>
    <li @click="onPagerClick($event, prePage)"
        :class="{'disabled': currentPage === 1}">
      上一页
    </li>
    <!--<li-->
    <!--:class="[{ active: currentPage === 1 }]"-->
    <!--@click="onPagerClick($event, 1)"-->
    <!--v-if="pageCount > 0"-->
    <!--class="number">1-->
    <!--</li>-->
    <li
      v-for="pager in pagers"
      :key="pager"
      :class="[{ active: currentPage === pager }]"
      @click="onPagerClick($event, pager)"
      class="number">{{ pager }}
    </li>
    <!--<li-->
    <!--:class="[{ active: currentPage === pageCount }]"-->
    <!--@click="onPagerClick($event, pageCount)"-->
    <!--class="number"-->
    <!--v-if="pageCount > 1">{{ pageCount }}-->
    <!--</li>-->
    <li @click="onPagerClick($event, nextPage)"
        :class="{'disabled': currentPage === pageCount}">
      下一页
    </li>
    <li @click="onPagerClick($event, pageCount)"
        :class="{'disabled': currentPage === pageCount}">
      尾页
    </li>
    <span>跳</span>
    <input
      class="input-width"
      @keyup="handleKeyup"
    >
    <span>页</span>
  </ul>
</template>

<script type="text/babel">
  import Input from '../../input/src/input';
  import {checkInt} from '../../../src/funs/check-fun';

  export default {
    name: 'VuiPager',

    components: {
      [Input.name]: Input
    },
    props: {
      // 每页显示条数
      pageSize: {
        type: Number,
        default: 10
      },
      // 总条数
      total: Number,
      // 当前显示到第几页
      currentPage: {
        type: Number,
        default: 1
      },
      // 总页数
      // pageCount: Number,
      // 页码按钮的数量
      // pagerCount: Number,

      disabled: Boolean
    },

    data() {
      return {
        current: null,
        showPrevMore: false,
        showNextMore: false,
        pageCount: 0,
        pagerCount: 5
      };
    },
    watch: {
      total(val) {
        // console.log(val);
        this.initPage(val);
      },
      currentPage(val) {
        // console.log(val);
        // this.initPage(val);
      },
      pageSize(val) {
        // console.log(val);
        // this.initPage(val);
      }
    },
    mounted() {
      this.initPage();
    },
    methods: {

      handleKeyup(event) {
        if (event.keyCode === 13) {
          if (checkInt(event.target.value)) {
            if (event.target.value > this.pageCount) {
              this.handleChange(this.pageCount);
            } else if (event.target.value <= 0) {
              this.handleChange(1);
            } else {
              this.handleChange(Number(event.target.value));
            }
          } else {
            return;
          }
        }
      },
      handleChange(value) {
        this.current = value;
        this.emitChange();
      },
      initPage() {
        // console.log(val);
        this.pageCount = Math.ceil(this.total / this.pageSize);
        console.log(this.pageCount);
      },
      onPagerClick(event, num) {
        // const target = event.target;
        // console.log(event);
        // console.log(num);
        const currentPage = this.currentPage;
        if (num === currentPage) {
          return;
        } else {
          this.current = num;
          this.emitChange();
        }
        // if (target.tagName === 'UL' || this.disabled) {
        //   return;
        // }

        // let newPage = Number(event.target.textContent);
        // const pageCount = this.pageCount;
        // const currentPage = this.currentPage;
        // const pagerCountOffset = this.pagerCount - 2;
      },

      emitChange() {
        this.$nextTick(() => {
          this.$emit('update:currentPage', this.current);
          this.$emit('current-change', this.current);
        });
      }
    },

    computed: {
      pagers() {
        const pagerCount = this.pagerCount;
        const halfPagerCount = (pagerCount - 1) / 2;

        const currentPage = Number(this.currentPage);
        const pageCount = Number(this.pageCount);

        let showPrevMore = false;
        let showNextMore = false;

        if (pageCount > pagerCount) {
          if (currentPage > pagerCount - halfPagerCount) {
            showPrevMore = true;
          }

          if (currentPage < pageCount - halfPagerCount) {
            showNextMore = true;
          }
        }

        console.log(showPrevMore);
        console.log(showNextMore);

        const array = [];

        if (showPrevMore && !showNextMore) {
          const startPage = pageCount - pagerCount;
          for (let i = startPage; i < pageCount; i++) {
            array.push(i);
          }
        } else if (!showPrevMore && showNextMore) {
          for (let i = 1; i <= pagerCount; i++) {
            array.push(i);
          }
        } else if (showPrevMore && showNextMore) {
          const offset = Math.floor(pagerCount / 2);
          for (let i = currentPage - offset; i <= currentPage + offset; i++) {
            array.push(i);
          }
        } else {
          for (let i = 1; i <= pageCount; i++) {
            array.push(i);
          }
        }

        this.showPrevMore = showPrevMore;
        this.showNextMore = showNextMore;

        console.log(array);
        return array;
      },

      prePage() {
        let pre = 1;
        if (this.currentPage > 1) {
          pre = this.currentPage - 1;
        } else {
          pre = this.currentPage;
        }

        return pre;
      },
      nextPage() {
        let next = 1;
        if (this.currentPage < this.pageCount) {
          next = this.currentPage + 1;
        } else {
          next = this.currentPage;
        }

        return next;
      }
    }

  };
</script>

<style >


</style>
