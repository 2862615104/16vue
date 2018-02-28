<template>
    <div>
        {{nms}}
        <router-view/>
        <el-button type="danger" round>危险按钮</el-button>
    </div>
</template>


<script>
export default {
  data() {
    return {
      nms: "你好"
    };
  },
  // 生命周期函数, vue会自动调用
  created (){
      this.$http.get(this.$api.logout).then(()=>console.log('登录'))
  }
//   created() {
//     this.$http.get(this.$api.logout).then(() => console.log("退出登陆"));
//   }
};
</script>

<style scoped>

</style>
