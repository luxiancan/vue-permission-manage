import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/store.js';

/* 初始路由 */
let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/login.vue')
        }
    ]
});

/* 全局路由拦截 */
router.beforeEach((to, from, next) => {
    // 根据有没有token判断是否登录
    if (!sessionStorage.token) {
    // 1、当用户打开localhost，to.matched === []，匹配的是空路由，此时需要重定向到login
    // 2、重定向到login之后，to.matched === [name: "login", path: "/login"...] 就是上一步的login页面
    // to.matched.some(item => item.meta.requiresAuth) 这句的意思是 进入的路由页需要登录认证，取反就是不用登录，直接通过
        if (to.matched.length > 0 && !to.matched.some(item => item.meta.requiresAuth)) {
            next(); // 跳过，进入下一个导航钩子。比如：在 /login 路由页刷新页面会走到此逻辑
        } else {
            next({ path: '/login' });
        }
    } else {
    // 现在有token了
        if (!store.state.permission.permissionList) {
            // 如果没有 permissionList，发请求获取用户权限列表
            store.dispatch('permission/FETCH_PERMISSION').then(() => {
                next({ path: to.path, query: to.query });
            });
        } else {
            // 现在有 permissionList 了
            if (to.path !== '/login') {
                if (to.matched.length === 0) {
                    // 如果匹配到的路由形如 https://172.24.1.117/?id=xxx&name=xxx，表明是关联跳转时没有权限，跳转到403
                    next({ path: '/403' });
                } else {
                    next();
                }
            } else {
                // 1.如果用户手动在地址栏输入 /login，重定向到之前的路由页
                // next(from.fullPath);

                // 2.如果用户手动在地址栏输入 /login，清除token并刷新页面，就会去到登录页
                store.commit('goToLogin');
            }
        }
    }
});

Vue.use(Router);

export default router;

/* 准备动态添加的路由 */
export const dynamicRoutes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home.vue'),
        meta: {
            requiresAuth: true
        },
        children: [

        ]
    },
    {
        path: '/403',
        component: () => import('@/views/error-page/403.vue')
    },
    {
        path: '*',
        component: () => import('@/views/error-page/404.vue')
    }
];
