<template>
  <div class="home">
    <a-layout class="home-wrap">
      <Sider></Sider>
      <a-layout>
        <Header></Header>
        <a-layout-content>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </a-layout-content>
        <Footer></Footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Sider from 'home/sider'
import Footer from 'home/footer'
import Header from 'home/header'
export default {
  data() {
    return {};
  },

  computed: {},

  mounted() {
  },

  methods: {},

  components: {Sider,Footer,Header}
};
</script>
<style lang='stylus' scoped>
  .home 
    width 100%
    height 100%
    .home-wrap
      width 100%
      height 100%
</style>