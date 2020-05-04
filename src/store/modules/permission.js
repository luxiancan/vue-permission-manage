/* permission.js */
/* 由于权限这块逻辑很多，所以在vuex添加了一个permission模块来处理权限相关的逻辑和变量 */
import httpRequest from '@/assets/js/service/http.js'; // http请求
import handleModule from '@/assets/js/common/handle-module.js'; // 处理路由、侧边栏的公共函数
import router, { dynamicRoutes } from '@/router/index.js'; // 默认路由配置，动态路由配置
import permissionRouter from '@/router/router.js'; // 需要权限的路由配置

const getUserByToken = function() {
    return new Promise((resolve, reject) => {
        httpRequest.getUserByToken().then(res => {
            if (res.data.code === 0) {
                resolve(res.data.data);
            } else {
                reject(res.data.message);
            }
        }).catch(err => { /* ignore */ });
    });
};

export default {
    namespaced: true, // 此模块拥有比较高的封装度和复用性，所以弄一个单独的命名空间
    state: {
        permissionList: null,
        userPopedoms: [],
        sidebarMenu: []
    },
    mutations: {
        // commit('permission/setPermission')
        setPermission(state, value) {
            state.permissionList = value;
        },
        setUserPopedoms(state, value) {
            state.userPopedoms = value;
        },
        setMenu(state, value) {
            state.sidebarMenu = value;
        }
    },
    actions: {
        // dispatch('permission/FETCH_PERMISSION')
        async FETCH_PERMISSION({ commit, state }) {
            // 初始化路由表，注意这里必须写，router.beforeEach 路由拦截时，多次执行 FETCH_PERMISSION
            commit('setPermission', []);

            // 发请求获取后端返回的用户权限
            let data = await getUserByToken();
            let userPopedoms = data.userPopedoms || [];

            // 保存用户的权限模块（去除掉后端返回的登录，不用显示在侧边栏），用户管理模块可以使用，权限列表
            let userPopeList = userPopedoms.filter(v => v.requestMapping !== 'login');
            commit('setUserPopedoms', userPopeList);

            // 根据权限筛选出我们设置好的路由并加入到 path='/' 的children，就是home路由的children下
            let routes = handleModule.getRouter(userPopedoms, permissionRouter);
            let homeContainer = dynamicRoutes.find(v => v.path === '/');

            // 使用concat的目的是让 分配给用户的权限处于 children 的第0项
            homeContainer.children = routes.concat(homeContainer.children);
            // 设置首页重定向，重定向到用户权限的第0项
            homeContainer.redirect = homeContainer.children[0].name;

            // 根据权限生成左侧导航菜单
            let sidebarMenu = handleModule.getSidebarMenu(userPopeList);

            commit('setMenu', sidebarMenu);

            // 初始路由
            let initialRoutes = router.options.routes;
            // 动态添加路由。只有刷新页面才会清空动态添加的路由信息
            router.addRoutes(dynamicRoutes);
            // 完整的路由表
            commit('setPermission', [...initialRoutes, ...dynamicRoutes]);
        }
    }
};
