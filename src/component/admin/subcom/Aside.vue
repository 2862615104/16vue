<template>
    <div class="aside">

        <!-- logo -->
       

        <!-- nav: default-active属性用来设置默认打开的菜单 -->
        <el-menu default-active="2" class="aside_menu"
            background-color="#267cb7" text-color="#fff" active-text-color="#ffd04b">

            <!-- subnav: key属性需要一个唯一值用于for循环渲染时性能优化, index属性同样需要一个唯一值用于展开导航列表 -->
            <el-submenu v-for="item in menu" :key="item.title" :index="item.title">

                <!-- nav_title -->
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{ item.title }}</span>
                </template>

                <!-- nav_item -->
                <el-menu-item v-for="subItem in item.submenu" :key="subItem.text" :index="subItem.text">
                    <!-- 每个子title都是一个a链接, 可以点击, 所以使用router-link, 记得设置to属性 -->
                    <router-link :to="subItem.path">
                        <i class="el-icon-document"></i>
                        <span>{{ subItem.text }}</span>
                    </router-link>
                </el-menu-item>

            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                menu: [
                    { title: '学员问题', submenu:
                        [
                            { text: '内容管理', path: '/admin/goods/list'},
                            { text: '类别管理', path: '/admin/goods/detail' },
                            { text: '评论管理', path: '/admin/goods/comment' },
                        ]
                    },
                    { title: '前端技术', submenu:
                        [
                            { text: '内容管理', path: '/' },
                            { text: '类别管理', path: '/' },
                            { text: '评论管理', path: '/' },
                        ]
                    }, 
                    { title: '难点答疑', submenu:
                        [
                            { text: '内容管理', path: '/' },
                            { text: '类别管理', path: '/' },
                            { text: '评论管理', path: '/' },
                        ]
                    },
                    { title: '资源下载', submenu:
                        [
                            { text: '内容管理', path: '/' },
                            { text: '类别管理', path: '/' },
                            { text: '评论管理', path: '/' },
                        ]
                    },
                    { title: '商品管理', submenu:
                        [
                            { text: '内容管理', path: '/' },
                            { text: '类别管理', path: '/' },
                            { text: '评论管理', path: '/' },
                        ]
                    },
                    { title: '订单管理', submenu:
                        [
                            { text: '订单列表', path: '/' },
                        ]
                    },
                ]
            }
        }
    }
</script>

<style scoped lang="less">
    // 让导航列表撑满屏幕
    .aside {
        height: 100%;
        text-align: left;
        background-color: #267cb7;

        // logo居中显示
        &_logo {
            text-align: center;
        }

        // 去掉导航展开时右边的1像素边框
        .el-menu {
            border-right: 0;

            // 去掉导航列表的最小宽度限制
            &-item {
                min-width: 0;
            }
        }
    }


    
</style>