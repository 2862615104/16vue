<template>
  <div class="admin">

    <el-container>
      <el-header>

        <!-- 公共头部 -->
        <app-header></app-header>

      </el-header>
      <el-container class="admin_content">
        <el-aside width="200px">

          <!-- 左边 -->
          <app-aside></app-aside>
            
        </el-aside>
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "./subcom/Header.vue";
import Aside from "./subcom/Aside.vue";

export default {
  
      components: {
        appHeader: Header,
        appAside: Aside
      }
    };
</script>

<style scoped lang="less">
.admin {
  height: 100%;
  color: #333;
  .el-header {
    line-height: 60px;
  }
  .el-container {
    height: 100%;
  }
  //&在less中是对上级选择器的引用
  &_content {
    background-color: #cccc;
  }
  .el-aside {
    // background-color: #f60;
  }
}
</style>
