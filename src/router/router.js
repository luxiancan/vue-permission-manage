/* router/router.js */
export default [
    // 仪表盘
    {
        path: '/dash-board',
        name: 'dash-board',
        component: () => import('@/views/dash-board.vue'),
        meta: {
            permitName: 'dash-board'
        }
    },
    // 工作台-待办事项
    {
        path: '/todo-list',
        name: 'todo-list',
        component: () => import('@/views/work-bench/todo-list.vue'),
        meta: {
            permitName: 'todo-list'
        }
    },
    // 工作台-我的足迹
    {
        path: '/my-footprint',
        name: 'my-footprint',
        component: () => import('@/views/work-bench/my-footprint.vue'),
        meta: {
            permitName: 'my-footprint'
        }
    },
    // 系统管理-系统日志
    {
        path: '/sys-log',
        name: 'sys-log',
        component: () => import('@/views/sys-manage/sys-log.vue'),
        meta: {
            permitName: 'sys-log'
        }
    },
    // 系统管理-系统安全
    {
        path: '/sys-security',
        name: 'sys-security',
        component: () => import('@/views/sys-manage/sys-security.vue'),
        meta: {
            permitName: 'sys-security'
        }
    },
    // 系统管理-系统维护
    {
        path: '/sys-maintain',
        name: 'sys-maintain',
        component: () => import('@/views/sys-manage/sys-maintain.vue'),
        meta: {
            permitName: 'sys-maintain'
        }
    },
    // 用户管理
    {
        path: '/user-manage',
        name: 'user-manage',
        component: () => import('@/views/user-manage.vue'),
        meta: {
            permitName: 'user-manage'
        }
    }
];
