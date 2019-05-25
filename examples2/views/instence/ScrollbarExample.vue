<template>
  <div>

    <div class="li-scroll">
      <vui-scrollbar
        scroll="about"
        tag="ul"
        wrap-class="list">
        <slot>
          <li style="white-space: nowrap;">板凳要坐十年冷，文章不写一句空。表示做学问的人要耐下心来坐十年冷板凳，毫无怨言板凳
            要坐十年冷，文章不写一句空。表示做学问的人要耐下心来坐十年冷板凳，毫无怨言板凳要坐十年冷，文章不写一句空。表示做学问的人
            要耐下心来坐十年冷板凳，毫无怨言end</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
        </slot>
      </vui-scrollbar>
    </div>
  </div>
</template>

<script>
  import Scrollbar from '../../../packages/scrollbar/src/main';
  export default {
    name: 'ScrollbarExample',
    components: {
      [Scrollbar.name]: Scrollbar
    },
    data() {
      return {
        name: '111'
      };
    }
  };
</script>

<style scoped>

</style>
