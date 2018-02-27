<template>
  <div>
      {{nms}}
      <router-view/>
       <el-button type="danger" round>危险按钮</el-button>
  </div>
</template>


<script>
export default {
 data () {
     return {
         nms:"你好",
     }
 }
}
</script>

<style scoped>

</style>
