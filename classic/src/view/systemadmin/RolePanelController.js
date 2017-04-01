Ext.define('Admin.view.systemadmin.RolePanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.systemadminRolePanel',
    listen : {
        controller : {
           
        }
    },
   onAddButton:function(btn){
	   Ext.create({
                xtype: 'systemadminRoleWindow'
              
            })
   }
});