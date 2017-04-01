/** 角色模型 */
Ext.define('Admin.model.systemadmin.Role', {  
    extend: 'Ext.data.Model',  
    fields: [
		{name: 'roleId', type: 'int'},
		{name: 'roleName', type: 'string'},
        {name: 'sysId', type: 'int'},
        {name: 'rightMask', type: 'string'},
        {name: 'applyFlag', type: 'string'},
        {name:'roleType',type:'string'},
        {name:'disable_Actname',type:'string'}
    ],
    idProperty: 'roleId'	//id标识项
});