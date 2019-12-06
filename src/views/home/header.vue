<template>
  <a-layout-header class="header">
    <div class="logout" @click="logout">
      <span class="iconfont">&#xe627;</span>
      <span class="logout-icon" >[退出]</span>
    </div>
    <img class="header-img" src="~@/assets/images/header-inner.png" alt />
    <div class="opreate">
      <span class="add" @click="showDialog"></span>
      <span :class="deleteClass" @click="batchDeleteAttribute"></span>
    </div>
  </a-layout-header>
</template>

<script>
import { mapActions, mapState } from "vuex";
import bus from '@/utils/bus'
export default {
  data() {
    return {
      ary:[]
    };
  },

  computed: {
    ...mapState(['currentAttributeInfoPage']),
    deleteClass() {
      return {
        delete: true,
        visiable: this.$route.path === "/home/productinfo"
      };
    }
  },

  mounted() {
      bus.$on('transportDeleteAry',ary=>{
        this.ary = ary
      })
  },

  methods: {
    ...mapActions(["modiActivePath",'changeLogout',
    'deleteProductAttributeInfo','getProductAttributeInfo']),
    showDialog() {
      let { path } = this.$route;
      this.modiActivePath(this.$route.path);
    },
    // 批量删除属性
    batchDeleteAttribute(){
      this.deleteProductAttributeInfo(this.ary).then(() => {
        this.getProductAttributeInfo({
          page: this.currentAttributeInfoPage,
          size: 10
        });
      });
    
    },
    // 退出
    logout(){
      this.changeLogout()
      localStorage.removeItem('login')
      this.$router.replace({path:'/login'})

    }
    
  },

  components: {}
};
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
    font-size 0.2rem
    color white
    float right
    margin-right -0.3rem
    margin-top -0.1rem
    cursor pointer
    span
      vertical-align bottom
      &.iconfont
        font-size 0.25rem
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
    top 0.45rem
    display flex
    justify-content space-around
    align-items center
    span
      width 0.89rem
      height 0.89rem
      background-size cover
      cursor pointer
      &.add
        background-image url('~@/assets/images/add.png')
      &.delete
        visibility hidden
        background-image url('~@/assets/images/delete.png')
      &.visiable
        visibility visible
</style>