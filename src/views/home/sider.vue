<template>
 <a-layout-sider class="sider" width='2.8rem'>
   <div class="logo-wrap">
     <img class="logo" src="@/assets/images/logo.png" alt="">
   </div>
   <div class="product-number">
     <p >({{number}})</p>
     <p class="product">产品</p>
   </div>
   <Nav></Nav>
 </a-layout-sider>
</template>

<script>
import Nav from 'home/nav'
import { mapState } from 'vuex';
export default {
  data () {
    return {
      
    };
  },

  computed: {
    ...mapState(['allAttributeInfo']),
    number(){
      return this.allAttributeInfo.total||0
    }
  },

  mounted(){
   
  },

  methods: {},

  components: {Nav},
}

</script>
<style lang='stylus' scoped>
.sider 
  height 100%
  background-color #2162B9
  .logo-wrap
    height 1.40rem
    background-color #fff  
    border-radius 0 0 1.40rem 1.40rem
    display flex
    justify-content center
    align-items center
    .logo 
      width .82rem
      height .72rem
  .product-number
    font-size .24rem
    font-weight bold
    color white
    margin-top .75rem
    margin-bottom .8rem
    text-align center  
    .product
      font-weight 500
   
      
</style>