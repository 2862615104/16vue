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
                    <el-button plain size="mini" icon="el-icon-check">全选</el-button>
                    <el-button plain size="mini" icon="el-icon-close">删除</el-button>

                    <div class="list_btns_right">
                      <el-input placeholder="请输入商品名称" prefix-icon="el-icon-search" label-width="200px" size="mini">
                      </el-input>
                    </div>
              </section>
              <!-- 大表格 -->
                      <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                            <el-table-column type="selection" width="55"></el-table-column>
                            <!-- label是用来设置当前表单 -->
                            <el-table-column label="标题" width="200">
                               <template slot-scope="scope">
                                <router-link style="color: #666;" :to="{ name: 'goodsDetail' }">{{ scope.row.title }}</router-link>
                              </template>
                            </el-table-column>
                             <el-table-column prop="name" label="所属类别" width="120"></el-table-column>
                             <el-table-column prop="stock_quantity" label="库存" width="120" show-overflow-tooltip></el-table-column>
                             <el-table-column prop="market_price" label="市场价" width="120" show-overflow-tooltip></el-table-column>
                             <el-table-column prop="sell_price" label="销售价" width="120" show-overflow-tooltip></el-table-column>
                             <el-table-column label="属性" width="120" show-overflow-tooltip>
                                <!-- 注意template要加slot-scope属性 -->
                                <template slot-scope="scope">里面是三个图标</template>
                            </el-table-column>
                            <el-table-column label="操作" width="120" show-overflow-tooltip>
                                <template slot-scope="scope">
                                  <router-link style="color: #666;" :to="{ name: 'goodsDetail' }">修改</router-link>
                             </template>
                          </el-table-column>
                      </el-table>
                  `<div style="margin-top: 20px">
                        <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
                        <el-button @click="toggleSelection()">取消选择</el-button>
                  </div>`
    <!-- 分页 -->
    </div>
</template>

<script>
export default {
  data() {
    return {
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
        },
       
      ],
      multipleSelection: []
    };
  },

  methods: {
    //获取商品列表
    getGoodsData(){
      //pageIndex几页      pagesize页数
         this.$http.get(this.$api.gsList+'?pageIndex&pageSize=10').then((res)=>{
           if (res.data.status==0) {
            this.tableData3=res.data.message
           }
         })
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
    }
  },
  //渲染数据
  created () {
    this.getGoodsData()
  }
};
</script>

<style scoped lang="less">
.list {
  width: 98%;
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
}
</style> 