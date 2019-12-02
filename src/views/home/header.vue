<template>
  <a-layout-header class="header">
    <div class="logout">
      <span class="iconfont">&#xe627;</span>
      <span class="logout-icon">[退出]</span>
    </div>
    <img class="header-img" src="~@/assets/images/header-inner.png" alt="">
    <div class="opreate">
      <span class="add" @click="showDialog"></span>
      <span class="delete"></span>
    </div>
  </a-layout-header>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data () {
    return {

    };
  },

  computed: {},

  mounted(){},

  methods: {
    ...mapActions(['modiActivePath']),
    showDialog(){
      let {path} = this.$route
      this.modiActivePath(this.$route.path)
      console.log(this.$route.path)
    }
  },

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
    cursor pointer
    span 
      vertical-align bottom
      &.iconfont
        font-size .25rem

     
  .header-img
    position absolute
    width 6.24rem
    height 2.15rem
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
    span 
      width .89rem
      height .89rem
      background-size cover
      cursor pointer
      &.add
        background-image url('~@/assets/images/add.png')
      &.delete
        background-image url('~@/assets/images/delete.png')


        
  
        

     
       
</style>