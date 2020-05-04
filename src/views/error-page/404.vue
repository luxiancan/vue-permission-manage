<template>
    <div class="error-page">
        <h3>404 Not Found</h3>
        <p>请检查您输入的网址是否正确</p>
        <button class="primary-btn" @click="$router.push({ name: 'home' })">返回首页</button>
    </div>
</template>

<script>
export default {
    name: '404-page'
};
</script>

<style scope lang="scss">
    .error-page {
        margin: 0 auto;
        padding-top: 50px;
        width: 300px;
        text-align: center;
        h3 {
            font-size: 22px;
        }
        p {
            font-size: 14px;
        }
    }
</style>
