// reference https://github.com/noeldelgado/gemini-scrollbar/blob/master/index.js

import {addResizeListener, removeResizeListener} from '../../../src/utils/resize-event';
import scrollbarWidth from '../../../src/utils/scrollbar-width';
import {toObject} from '../../../src/utils/util';
import Bar from './bar';

/* istanbul ignore next */
export default {
  name: 'VuiScrollbar',

  components: {Bar},

  props: {
    native: Boolean,
    wrapStyle: {},
    wrapClass: {},
    viewClass: {},
    viewStyle: {},
    noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    tag: {
      type: String,
      default: 'div'
    },
    scroll: {
      type: String,
      default: '' // 上下滚动seesaw  左右滚动about
    },
    showX: {
      type: Boolean,
      default: true
    },
    showY: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      sizeWidth: '0',
      sizeHeight: '0',
      moveX: 0,
      moveY: 0,
      preMoveX: 0,
      preMoveY: 0,
      isStop: false
    };
  },

  computed: {
    wrap() {
      return this.$refs.wrap;
    },
    wrapDirection() {
      return this.scroll;
    }
  },

  render(h) {
    let gutter = scrollbarWidth();
    let style = this.wrapStyle;

    if (gutter) {
      const gutterWith = `-${gutter}px`;
      const gutterStyle = `margin-bottom: ${gutterWith}; margin-right: ${gutterWith};`;

      if (Array.isArray(this.wrapStyle)) {
        style = toObject(this.wrapStyle);
        style.marginRight = style.marginBottom = gutterWith;
      } else if (typeof this.wrapStyle === 'string') {
        style += gutterStyle;
      } else {
        style = gutterStyle;
      }
    }
    const view = h(this.tag, {
      class: ['vui-scrollbar__view', this.viewClass],
      style: this.viewStyle,
      ref: 'resize'
    }, this.$slots.default);
    const wrap = (
      <div
        ref="wrap"
        style={style}
        onTouchmove={this.handleScroll}
        onScroll={this.handleScroll}
        onWheel={this.handleWheel}
        class={[this.wrapClass, 'vui-scrollbar__wrap', gutter ? '' : 'vui-scrollbar__wrap--hidden-default']}>
        {[view]}
      </div>
    );
    let nodes;
    if (!this.native) {

      if (!this.showX && this.showY) {
        nodes = ([
          wrap,
          <Bar
            vertical
            move={this.moveY}
            size={this.sizeHeight}></Bar>
        ]);
      } else if (this.showX && !this.showY) {
        nodes = ([
          wrap,
          <Bar
            move={this.moveX}
            size={this.sizeWidth}></Bar>
        ]);
      } else if (!this.showX && !this.showY) {
        nodes = ([
          wrap
        ]);
      } else {
        nodes = ([
          wrap,
          <Bar
            move={this.moveX}
            size={this.sizeWidth}></Bar>,
          <Bar
            vertical
            move={this.moveY}
            size={this.sizeHeight}></Bar>
        ]);
      }
    } else {
      nodes = ([
        <div
          ref="wrap"
          class={[this.wrapClass, 'vui-scrollbar__wrap']}
          style={style}>
          {[view]}
        </div>
      ]);
    }
    return h('div', {class: 'vui-scrollbar'}, nodes);
  },

  methods: {
    handleScroll(event) {
      // if (event) {
      //   event.stopPropagation();
      //   event.preventDefault();
      // }
      const wrap = this.wrap;
      this.moveY = ((wrap.scrollTop * 100) / wrap.clientHeight);
      this.moveX = ((wrap.scrollLeft * 100) / wrap.clientWidth);
      this.$emit('movex', {movex: this.moveX, left: wrap.scrollLeft});
      this.$emit('movey', {movey: this.moveY, top: wrap.scrollTop});

    },
    handleWheel(event) {
      const wrap = this.wrap;
      this.preMoveX = this.moveX;
      this.preMoveY = this.moveY;
      if (this.wrapDirection) {
        if (this.wrapDirection === 'about') {
          if (event.deltaY < 0) {
            wrap.scrollLeft -= 50;
            // 向上滚动鼠标滚轮，屏幕滚动条左移
            this.moveX = ((wrap.scrollLeft * 100) / wrap.clientWidth);
          } else {
            wrap.scrollLeft += 50;
            // 向下滚动鼠标滚轮，屏幕滚动条右移
            this.moveX = ((wrap.scrollLeft * 100) / wrap.clientWidth);
          }
          if (event) {
            if (this.preMoveX !== this.moveX) {
              event.stopPropagation();
              event.preventDefault();
            }
          }
          this.$emit('movex', {movex: this.moveX, left: wrap.scrollLeft});
        } else if (this.wrapDirection === 'seesaw') {
          if (event.deltaY < 0) {
            wrap.scrollTop -= 50;
            // 向上滚动鼠标滚轮，屏幕滚动条上移
            this.moveY = ((wrap.scrollTop * 100) / wrap.clientHeight);
          } else {
            wrap.scrollTop += 50;
            // 向下滚动鼠标滚轮，屏幕滚动条下移
            this.moveY = ((wrap.scrollTop * 100) / wrap.clientHeight);
          }
          if (event) {
            if (this.preMoveY !== this.moveY) {
              event.stopPropagation();
              event.preventDefault();
            }
          }
          this.$emit('movey', {movey: this.moveY, top: wrap.scrollTop});
        }
      }
    },

    update() {
      let heightPercentage, widthPercentage;
      const wrap = this.wrap;
      if (!wrap) return;

      heightPercentage = (wrap.clientHeight * 100 / wrap.scrollHeight);
      widthPercentage = (wrap.clientWidth * 100 / wrap.scrollWidth);

      this.sizeHeight = (heightPercentage < 100) ? (heightPercentage + '%') : '';
      this.sizeWidth = (widthPercentage < 100) ? (widthPercentage + '%') : '';
    }
  },

  mounted() {
    if (this.native) return;
    this.$nextTick(this.update);
    !this.noresize && addResizeListener(this.$refs.resize, this.update);
  },

  beforeDestroy() {
    if (this.native) return;
    !this.noresize && removeResizeListener(this.$refs.resize, this.update);
  }
};
