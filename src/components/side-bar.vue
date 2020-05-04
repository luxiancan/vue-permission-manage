<template>
    <div>
        <el-menu
            class="menu-wrap" :router="true" :default-active="$route.name"
            background-color="#545c64" text-color="#fff" active-text-color="#ff6c6c">
            <template v-for="item in menuList">
                <el-submenu v-if="item.children && item.children.length" :index="item.name" :key="item.name">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>{{item.title}}</span>
                    </template>
                    <el-menu-item v-for="child in item.children" :index="child.name" :key="child.name">
                        {{child.title}}
                    </el-menu-item>
                </el-submenu>

                <el-menu-item v-else :index="item.name" :key="item.name">
                    <i class="el-icon-setting"></i>
                    <span slot="title">{{item.title}}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'side-bar',
    props: {
        menuList: {
            type: Array,
            default: () => []
        }
    }
};
</script>

<style scoped lang="scss">
    .menu-wrap {
        height: 100%;
    }
</style>
