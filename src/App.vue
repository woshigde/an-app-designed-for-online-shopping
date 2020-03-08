<template>
  <div id="app">
    <!-- 让Home保持原来状态的第一步，让Home不要随意销毁掉 -->
    <keep-alive exclude="Detail">
    <router-view></router-view>
    </keep-alive>
    <MainTabBar></MainTabBar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/MainTabBar'

export default {
  name: 'App',
  components:{
    MainTabBar
  }
}
</script>

<style scoped>
  @import "assets/css/base.css";
</style>
