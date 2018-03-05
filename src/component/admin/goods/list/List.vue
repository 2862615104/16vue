<template>
  <div class="list">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 按钮组, 带搜索框 -->
    <section class="list_btns">
      <el-button plain size="mini" icon="el-icon-plus">新增</el-button>
      <el-button plain size="mini" icon="el-icon-check" @click="dee">全选</el-button>
      <el-button plain size="mini" icon="el-icon-close" @click="del">删除</el-button>

      <div class="list_btns_right">
        <el-input placeholder="请输入商品名称" prefix-icon="el-icon-search" label-width="200px" size="mini" v-model="apiQuery.searchvalue" @blur="search">
        </el-input>
      </div>
    </section>
    <!-- 大表格 -->
    <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="change">
      <el-table-column type="selection" width="55"></el-table-column>
      <!-- label是用来设置当前表单 -->
      <el-table-column label="标题">
        <template slot-scope="scope">
          <!-- 在a标签上嵌套tooltip标签, 就可以添加提示信息 -->
          <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
            <router-link style="color: #666;" :to="{ path: `/admin/goods/detail/${scope.row.id}` }">{{ scope.row.title }}</router-link>

            <!-- 通过带有slot的标签, 来自定义提示框里的子元素 -->
            <div slot="content">
              <img style="width: 200px;" :src="scope.row.imgurl" alt="商品图片">
            </div>

          </el-tooltip>

        </template>
      </el-table-column>
      <el-table-column label="类别" prop="categoryname" width="120"></el-table-column>
      <el-table-column prop="stock_quantity" label="库存" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="market_price" label="市场价" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="sell_price" label="销售价" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column label="属性" width="120" show-overflow-tooltip>
        <!-- 注意template要加slot-scope属性 -->
        <template slot-scope="scope">
          <!-- 轮播图 -->
          <span :class="['el-icon-message', scope.row.is_slide == 1? 'active': '']"></span>
          <!-- 指向 -->
          <span :class="['el-icon-upload', scope.row.is_top == 1? 'active': '']"></span>
          <!-- 推荐 -->
          <span :class="['el-icon-star-on', scope.row.is_hot == 1? 'active': '']"></span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" show-overflow-tooltip>
        <template slot-scope="scope">
          <router-link style="color: #666;" :to="{ path: `/admin/goods/detail/${scope.row.id}` }">修改</router-link>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="list_total">
      <el-pagination :total="apiQuery.total" :current-page="apiQuery.pageIndex" :page-size="apiQuery.pageSize" :page-sizes="[1, 2, 3 ]" @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      apiQuery: {
        pageIndex: 1,
        pageSize: 100,
        searchvalue: "",
        total: 0
      },
      selectedGoodsList: [],

      //商品数据接口

      tableData3: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: []
    };
  },

  methods: {
    search() {
      this.getGoodsData();
    },
    //获取商品列表
    getGoodsData() {
      //pageIndex几页      pagesize页数
      //  this.$http.get(this.$api.gsList+'?pageIndex&pageSize=10').then((res)=>{
      let api = `${this.$api.gsList}?pageIndex=${
        this.apiQuery.pageIndex
      }&pageSize=${this.apiQuery.pageSize}&searchvalue=${
        this.apiQuery.searchvalue
      }`;
      this.$http.get(api).then(res => {
        if (res.data.status == 0) {
          this.tableData3 = res.data.message;
          //把后端数据变成
          this.apiQuery.total = res.data.totalcount;
        }
      });
    },
    // 监听多选框状态的变化, 参数可以拿到被选的商品数据
    change(selection) {
      this.selectedGoodsList = selection;
    },

    // 删除按钮
    del() {
      let delIDS = this.selectedGoodsList.map(v => v.id); // 提取所有被选商品的id
      this.$http.get(this.$api.gsDel + delIDS).then(res => {
        // 删除成功后重新获取数据进行渲染
        if (res.data.status == 0) {
          this.getGoodsData();
        }
      });
    },
    //全选
    dee() {
      document.querySelector(".el-checkbox__inner").click();
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(page) {
      this.apiQuery.pageIndex = page; // 接收到新的页面, 赋值给data里的数量, 分页组件就会刷新视
      this.getGoodsData();
    },
    handleCurrentChange(size) {
      this.apiQuery.pageSize = size;
      this.getGoodsData();
    }
  },
  //渲染数据
  created() {
    this.getGoodsData();
  }
};
</script>

<style scoped lang="less">
.list {
  padding: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  // 按钮组
  &_btns {
    line-height: 40px;
    &_right {
      float: right;
      width: 200px;
    }
  }
  .list_total {
    padding: 10px;
  }
  // 添加icon点亮的样式
  [class^="el-icon"].active {
    color: #000;
    font-weight: bold;
  }
}
</style> 