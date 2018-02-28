<template>
  <div>
      <!-- 公共头部 -->
      <app-header></app-header>
      <!-- 左边 -->
        <app-aside></app-aside>
        <router-view></router-view>
  </div>
</template>

<script>
import Header from './subcom/Header.vue';
import Aside from './subcom/Aside.vue';

export default {
  components: {
    appHeader:Header,
    appAside:Aside,
  }
}
</script>

<style>

</style>
