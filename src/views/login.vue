<template>
    <div class="login-page">
        <div class="login-box">
            <h2>登录页</h2>
            <p class="desc">用户名和密码随便输，点击登录就行</p>
            <input class="input-inner" type="text" id="user_name" placeholder="用户名" @keyup.enter="onLogin">
            <input class="input-inner" type="password" id="user_pwd" placeholder="密码" @keyup.enter="onLogin">
            <button class="primary-btn" @click="onLogin">登录</button>
        </div>
    </div>
</template>

<script>
let vm = null;
export default {
    name: 'login',
    mounted() {
        vm = this;
    },
    methods: {
        onLogin() {
            let query = {
                username: '',
                password: '',
            };
            vm.$http.login(query).then(res => {
                let data = res.data;
                if (data.code === 0) {
                    sessionStorage.token = data.data.token;

                    // 跳转到首页 home。这里会触发全局路由拦截 router.beforeEach
                    vm.$router.push({ name: 'home' });
                } else {
                    // alert message
                }
            });
        }
    }
};
</script>

<style scope lang="scss">
    .login-page {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: url("/static/images/login-bg.jpg") no-repeat center bottom;
        background-size: cover;
    }

    .login-box {
        display: flex;
        flex-direction: column;
        width: 400px;
        min-height: 400px;
        padding: 30px 32px;
        border-radius: 6px;
        background: rgba(255, 255, 255, .6);
        box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.2);

        h2 {
            margin: 20px 0 10px;
            font-size: 22px;
            font-weight: normal;
        }

        .desc {
            margin: 10px 0 30px;
        }

        .input-inner {
            margin-bottom: 22px;
            height: 42px;
            line-height: 40px;
            padding-left: 20px;
        }

        .primary-btn {
            line-height: 42px;
            font-size: 16px;
            letter-spacing: 2px;
        }
    }
</style>
