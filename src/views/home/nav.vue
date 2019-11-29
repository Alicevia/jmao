<template>
  <div class="nav">
    <ul class="nav-wrap">
      <router-link tag="li" to="/home/productinfo" class="nav-item home">
        <span class="iconfont">&#xe601;</span>
        <span>产品信息</span>
      </router-link>
      <router-link tag="li" to="/home/productadd" class="nav-item add-product">
        <span class="iconfont">&#xe60d;</span>
        <span>产品添加</span>
      </router-link>
      <router-link tag="li" to="/home/caradd" class="nav-item add-car">
        <span class="iconfont">&#xe600;</span>
        <span>车系添加</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  computed: {},

  mounted() {},

  methods: {},

  components: {}
};
</script>
<style lang='stylus' scoped>
.nav
  width 100%
  .nav-wrap
    width 100%
    .nav-item
      display flex
      width 100%
      height .6rem
      flex-flow row no-wrap
      justify-content center
      align-items center
      color white
      margin-bottom .1rem
      &.active
        background-color #fff
        span
          color #2162B9
      span 
        width 1rem;
        line-height .2rem
        letter-spacing .02rem;
        font-size .17rem
        &:first-child
          text-align right
          margin-left -.4rem
          padding-right .2rem

</style>