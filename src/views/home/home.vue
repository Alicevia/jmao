<template>
  <a-layout class="home-wrap">
    <Sider></Sider>
    <a-layout class="home-right">
      <Header></Header>
      <a-layout-content class="content">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import Sider from "home/sider";
import Footer from "home/footer";
import Header from "home/header";
export default {
  data() {
    return {};
  },

  computed: {},

  mounted() {},

  methods: {},

  components: { Sider, Footer, Header }
};
</script>
<style lang='stylus' scoped>
.home-wrap
  &.ant-layout
    height 100%
    overflow-y hidden

    .home-right
      width 100%
      height 100%
      .content
        width 100%
        height 100%
        overflow-y hidden
</style>