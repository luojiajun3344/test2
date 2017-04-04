
Ext.define('Admin.view.productManage.Shengchanrenwudan',{
	 extend: 'Ext.container.Container',
	 alias : 'widget.shengchanrenwudan',
	 
	 height:800,
	layout:'border',
     initComponent:function(){
   
    	 this.items=[{
    		xtype : 'shengchanrenwudanliebiao',
 			region : 'north',
			flex:1
		 },{
				xtype:'diaoduliebiao',
				  region : 'center',
				flex:1
			}
     ]
	Ext.Msg.alert('提示', '您有一条生产任务已经关联配比.');
	 this.callParent(arguments);
	 }
});