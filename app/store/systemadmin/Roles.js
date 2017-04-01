
/** 角色Store */
Ext.define('Admin.store.systemadmin.Roles', {  
    extend: 'Ext.data.Store', 
    model: 'Admin.model.systemadmin.Role', 
    proxy: {
        type: 'rest',
        url : 'rest/systemadmin/role',
        //format: 'rest',//请求加上rest后缀（不需要）
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total',//rest风格必须有此项固定值配置
            //idProperty: 'roleId',	//要跟model中配置一致
            successProperty: 'success'
        }
    },
    pageSize: 20,		//当配置为1时，后台默认为不分页查询
    remoteFilter: true,	//远程过滤
    remoteSort: true,	//远程排序
    sorters: [
              {property : 'roleId',direction: 'ASC'},
              {property : 'roleName',direction: 'DESC'}
          ]/*,		//排序规则
    remoteGroup: true,
    groupers: [
               {property : 'roleId',direction: 'ASC'}
               {property : 'roleName',direction: 'DESC'}
           ]*/	//远程分组会自动启用远程排序，并将分组参数装配给排序参数
}); 