
Ext.define('Admin.view.MapToolMenu', {
	extend : 'Ext.menu.Menu',
    shwdow: 'frame',
    plain: true,
    draggable: true,
    
    width: 100,
	
	initComponent: function() {
		this.items = [
		    new Ext.menu.Item({
		    	text: '放大',
		    	width: 100,
		    	handler: this.onMenuItem
		    }),
		    new Ext.menu.Item({
		    	text: '缩小',
		    	width: 100,
		    	handler: this.onMenuItem
		    }),
		    new Ext.menu.Item({
		    	text: '测距',
		    	width: 100,
		    	handler: this.onMenuItem
		    }),
		    new Ext.menu.Item({
		    	text: '测面',
		    	width: 100,
		    	handler: this.onMenuItem
		    }),
		    new Ext.menu.Item({
		    	text: '截图',
		    	width: 100,
		    	handler: this.onMenuItem
		    })
		];
        this.callParent(arguments);
	},
	
	onMenuItem: function(item){
		Ext.Msg.alert('提示',item.text);
		//Ext.example.msg('msg', item.text);
	}
});