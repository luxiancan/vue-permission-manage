<template>
    <div class="nav-bar">
        <span class="logo">logo.png</span>
        <span class="product-name">product_name</span>
        <button class="logout-btn" @click="onLogout">退出</button>
    </div>
</template>

<script>
export default {
    name: 'nav-bar',
    methods: {
        onLogout() {
            this.$store.commit('goToLogin');
        }
    }
};
</script>

<style scoped lang="scss">
    .nav-bar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 60px;
        background-color: #545c64;
        color: #fff;
        .logo {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 200px;
            height: 100%;
        }
        .product-name {
            padding-left: 8px;
        }
        .logout-btn {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            padding: 5px 10px;
            cursor: pointer;
        }
    }
</style>
