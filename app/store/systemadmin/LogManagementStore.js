/*****日志管理  mc  20140422****/
Ext.define('Admin.store.systemadmin.LogManagementStore',{
	extend:'Ext.data.Store',
	model:'Admin.model.systemadmin.LogManagementModel',
	proxy: {
        type: 'rest',
		url:'rest/systemadmin/logManagement',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total',
            idProperty: 'id',
            successProperty: 'success'
        }
    },
	romoteFilter:true, //远程过滤
	remoteGroup:true,	//远程分组
	remoteSort: true,  //远程排序
	pageSize: 25		//当配置为1时，后台默认为不分页查询
});