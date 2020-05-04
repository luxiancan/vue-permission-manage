/* handle-module.js */
const handleModule = {
    /**
     * 根据后台返回的权限，以及配置好的所有路由，过滤出真实路由
     * @param  {Array} permissionList 后台返回的用户权限列表
     * @param  {Array} allRouter  前端配置好的所有动态路由的集合
     * @return {Array} 过滤后的路由
     */
    getRouter(permissionList = [], allRouter = []) {
    // permissions 的格式为 ["deploy-manage", "system-log"]
        let permissions = permissionList.reduce((acc, cur) => {
            if (cur.moduleList && cur.moduleList.length > 0) cur = cur.moduleList;
            return acc.concat(cur);
        }, []).map(v => v.requestMapping);

        return allRouter.filter(item => permissions.includes(item.meta.permitName));
    },

    /**
     * 根据后台返回的权限，生成侧边栏
     * @param  {Array} permissionList  后台返回的用户权限列表
     * @return {Array} sidebarMenu  生成的侧边栏数组
     */
    getSidebarMenu(permissionList = []) {
        let sidebarMenu = [];
        permissionList.forEach(item => {
            let menuItem = {
                name: item.requestMapping,
                title: item.moduleGroupName
            };
            menuItem.children = (item.moduleList || []).map(child => ({
                name: child.requestMapping,
                title: child.moduleName
            }));
            sidebarMenu.push(menuItem);
        });

        return sidebarMenu;
    }
};
export default handleModule;
