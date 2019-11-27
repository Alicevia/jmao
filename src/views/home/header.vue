<template>
  <a-layout-header class="header">
    <div class="logout">
      <span class="iconfont">&#xe627;</span> [退出]
    </div>
    <img class="header-img" src="~@/assets/images/header-inner.png" alt="">
    <div class="opreate">
      <span class="iconfont add">&#xe602;</span>
      <span class="iconfont delete">&#xea40;</span>
    </div>
  </a-layout-header>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  computed: {},

  mounted(){},

  methods: {},

  components: {},
}

</script>
<style lang='stylus' scoped>
.header 
  position relative
  height 2.5rem
  width 16.4rem
  background-image url('~@/assets/images/header.png')
  background-size cover
  background-color #fff
  .logout 
    font-size .2rem
    color white
    float right
    margin-right -.3rem
    margin-top -.1rem
    span 
      vertical-align bottom
  .header-img
    position absolute
    width 6.22rem
    height 2.13rem
    bottom 0
    left 50%    
    transform translateX(-50%)
  .opreate
    position absolute
    right 1.4rem
    top .45rem
    display flex
    justify-content space-around
    align-items center
    width 1.6rem

    span 
      font-size .7rem
      color white
  
        
  
        

     
       
</style>