<template>
    <div class="detali">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ name: 'goodsList' }">商品列表</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path: '/admin'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path: '/admin'}">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>编辑商品</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="detali_form">
            <el-form-item label="内容标题" required>
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="副标题" required>
                <el-input v-model="ruleForm.sub_title"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" required>
                <el-select v-model="ruleForm.category_id" placeholder="请选择活动区域">
                    <el-option  v-for="item in category" :key="item.category_id" :label="item.title" :value="item.category_id">
                        <!-- option里面可以加标签覆盖label文本, 但是label属性还得必须要, 不然会报错 -->
                        <span>
                            <!-- 子级分类才有这个图标 -->
                            <span class="el-icon-caret-right" v-if="item.class_layer!= 1" ></span>
                            <span>{{ item.title }}</span>
                        </span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否发布" prop="delivery">
                <el-switch v-model="ruleForm.status"></el-switch>
            </el-form-item>
            <el-form-item label="推荐类型">
                <el-switch v-model="ruleForm.is_slide" active-text="轮播图"></el-switch>
                <el-switch v-model="ruleForm.is_top" active-text="置顶"></el-switch>
                <el-switch v-model="ruleForm.is_hot" active-text="推荐"></el-switch>
            </el-form-item>
            <el-form-item label="上传封面">
                <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadimg"
                  list-type="picture" :file-list="ruleForm.imgList" :on-success="uploadImg">
                  <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>

            <el-form-item label="上传附件">
                <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadfile" list-type="picture" :file-list="ruleForm.fileList" :on-success="uploadFile">
                    <el-button size="small" type="primary">点击上传</el-button> 
                </el-upload>
            </el-form-item>

            <el-form-item label="内容摘要">
                <quillEditor v-model="ruleForm.content"></quillEditor>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" plain @click="onSubmit">保存</el-button>
                <el-button type="warning" plain @click="$router.go(-1)">返回上一页</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      ruleForm: {

      },
      category: [],
      //要从url拿到上一页的被编辑id
      id:this.$route.params.id,

      rules: {}
    };
  },
  methods: {
    getGoods() {
      //获取商城数据
      this.$http.get(this.$api.gsDetail + this.id).then(res => {
          if (res.data.status==0) {
              this.ruleForm=res.data.message;
              this.ruleForm.category_id =this.ruleForm.category_id ;
          }
        
      });
    },
    //获取商品分类数据
    getCategory() {
      this.$http.get(this.$api.ctList + "goods").then(res => {
        this.category = res.data.message;
        // console.log(res);
      });
    },
    //上传封面
    uploadImg(data) {
        console.log('上传成功');
        this.ruleForm.imgList[data]
    },
    //上传附近
    uploadFile(data){
        this.ruleForm.fileList.push(data)
    },
    //点击保存
    onSubmit() {
      this.$http.post(this.$api.gsEdit + this.id,this.ruleForm).then(res => {
        if (res.data.status == 0) {
          this.$alert("数据修改成功");
        }
      });
    }
  },
  // 组件初始化完毕后就调用接口渲染表单默认数据
  created() {
    this.getGoods();
    this.getCategory();
  },
  components: {
    quillEditor
  }
};
</script>
 
<style scoped lang="less">
.detali {
  height: 100%;
  padding: 20px;
  &_form {
    margin-top: 10px;
    width: 700px;
  }
}
</style>