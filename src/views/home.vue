<template>
    <div class="home">
        <navBar></navBar>
        <sideBar class="side-bar" :menuList="menuList"></sideBar>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import navBar from '@/components/nav-bar.vue';
import sideBar from '@/components/side-bar.vue';
export default {
    name: 'home',
    components: {
        navBar,
        sideBar
    },
    data() {
        return {
            menuList: this.$store.state.permission.sidebarMenu
        };
    }
};
</script>

<style scope lang="scss">
    .side-bar {
        position: fixed;
        top: 60px;
        left: 0;
        width: 200px;
        height: 100%;
    }

    .main {
        padding-top: 60px;
        padding-left: 200px;
    }
</style>
