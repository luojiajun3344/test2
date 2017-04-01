/**
 * 窗口基类
 * 自适应布局
 * 头部不可托出界面边缘，无边框
 */
Ext.define('Admin.view.MapToolWindow', {
	extend : 'Ext.window.Window',
    layout: 'border',
    border: 0,
    width: 60,
    padding: '1',
    header: false,
	draggable: false,
	closable: false,
	resizable: false,
	myMap: null,
	
	initComponent : function() {
		var me = this;
		this.dockedItems = [{
		    xtype: 'toolbar',
		    dock: 'top',
		    layout: 'vbox',
		    padding: '0',
		    items: [
		        { 
		        	xtype: 'button', 
		        	text: '放大', 
		        	iconCls : 'webmap-zoomin',
		        	handler: function(e){
		        		me.myMap.openRectZoomTool('zoomIn');
		        	}
		        },
		        { 
		        	xtype: 'button', 
		        	text: '缩小', 
		        	iconCls : 'webmap-zoomout',
		        	handler: function(e){
		        		me.myMap.openRectZoomTool('zoomOut');
		        	}
		        },
		        { 
		        	xtype: 'button', 
		        	text: '测距', 
		        	iconCls : 'webmap-distance',
		        	handler: function(){
		        		me.myMap.openPolyLineMeasureTool();
		        	}
		        },
		        { 
		        	xtype: 'button', 
		        	text: '测面', 
		        	iconCls : 'webmap-cover',
		        	handler: function(){
		        		me.myMap.openPolygonMeasureTool();
		        	}
		        },
		        { 
		        	xtype: 'button', 
		        	text: '截图', 
		        	iconCls : 'webmap-snap',
		        	handler: function(){
		        		SE_MapSnap.bind(me.myMap._map);
		        	}
		        },
		    ]
		}];

		this.callParent(arguments);
	}	
	
});