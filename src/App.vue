<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  computed:{
    ...mapState(['login']),

  }
}
</script>
<style lang="stylus">
@import '~@/assets/css/reset.styl'
@import '~@/assets/iconfont/iconfont.css'
  html
    width 100%
    height 100%
    
  body  
    width 100%
    height 100%
    background-image url('~@/assets/images/bg3.jpg')
    background-size cover
  #app 
    width 100%
    height 100%
      
</style>
