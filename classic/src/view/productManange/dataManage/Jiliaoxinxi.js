Ext.define('Admin.view.productManage.dataManage.Jiliaoxinxi', {
    extend: 'Admin.view.BasePage',
    border: false,
    alias : 'widget.jiliaoxinxi',
    height:600,
	title :'集料信息',
    requires: [
        // 'Admin.view.productManage.dataManage.RoleWindow'
       
    ],
	// controller: 'jiashiyuan',
    initComponent: function() {
    	var roleStore =null;// Ext.create('Admin.store.productManage.dataManage.Roles');
		
    	this.items = [
    	    {
    	    	xtype : 'searchForm',//通用查询表单组件
    			frame : true,
    			region : 'north',
    			defaults : {
    				fieldDefaults : {
    					labelAlign : 'right',
    					labelWidth : 60
    				}
    			},
    			items : [
				{
					xtype : 'fieldcontainer',
					layout : 'hbox',					
					items : [
					{
						xtype : 'textfield',
						fieldLabel : '角色名称',
						name : 'roleName'
					},
				{
					xtype : 'combobox',
					fieldLabel : '角色类型',
					labelWidth : 60,
					itemId : 'roleType',
					name : 'roleType',
		            queryMode: 'local',
	            	valueField: 'roleType',
	                displayField: 'roleTypeName',
					store :Ext.create('Ext.data.Store', {
					    fields:['roleType','roleTypeName'],
					    data:[	
					    	{roleType:'',roleTypeName:'所有'},
						    {roleType:'0',roleTypeName:'其他'},
						    {roleType:'1',roleTypeName:'巡检人'},
						    {roleType:'2',roleTypeName:'维护人'}
						    
						]
					}) 
				},{
						xtype:'combo',
						name : 'applyFlag',
						fieldLabel : '是否可申请',
						width: 180,
						labelWidth : 80,
						queryMode: 'local',
						valueField: 'id',
		                displayField: 'text',
						store :Ext.create('Ext.data.Store', {
						    fields:['id','text'],
						    data:[
							    {id:'',text:'所有'},							    
							    {id:'0',text:'不可以'},
							    {id:'1',text:'可以'}
							]
						}) 
					}]
				}
				]
    	    },{
    	    	xtype : 'grid',
    	    	region:'center',
    	    	autoScroll : true,
    	    	store : roleStore,
    	    	columns : [
				{
					text : '角色ID',
					dataIndex : 'roleId',
					width : 60
				},
    	    	{
    				text : '角色名称',
    				dataIndex : 'roleName',
    				width : 160
    			},
    			{
    				text : '角色类型',
    				dataIndex : 'roleType',
    				width : 80,
    				renderer: function(value){
    			        if (value == '0') {
    			            return '其他';
    			        }else if(value == '1'){
    			        	return '巡检人';
    			        }else if(value == '2'){
    			        	return '维护人';
    			        }
    			        return value;
    			    }
    			},
    			{
    				text : '是否可申请',
    				dataIndex : 'applyFlag',
    				width : 80,
    				renderer: function(value){
    			        if (value == '1') {
    			            return '可以';
    			        }else if(value == '0'){
    			        	return '不可以';
    			        }
    			        return value;
    			    }
    			},{
    				text : '权限码',
    				dataIndex : 'rightMask',
    				flex: 1
    			}],
    			dockedItems : [{
    				xtype : 'pagingtoolbar',
    				store : roleStore,
    				dock : 'bottom',
    				displayMsg : '第{0}条到{1}条,一共{2}条',
    				emptyMsg : '没有记录',
    				displayInfo : true,
    				items : [{xtype: 'tbspacer', width: 20}, 
    					{
    					xtype: 'downloadButton',//通用导表组件、需和searchForm组件配合使用
    					excelConfig: {
    						xtype: 'excelConfig',
    						title: '角色明细',
    						columnNames: [
    						    {name:'角色ID', key:'roleId', width:15, align:'left'},
    						    {name:'角色名称', key:'roleName', width:30, align:'left'},
    						    {name:'是否可申请', key:'applyFlag', width:20, align:'left', merge: true},
    						    {name:'权限掩码', key:'rightMask', width:50, align:'left'},
    						    {name:'角色类型',key:'roleType',width:20,align:'left'}
    						    
    						]
    					},
    					hidden : !Admin.app.checkRight(75, 4) 					
    				}]
    			}, {
    				xtype : 'toolbar',
    				items : [{
    					text : '添加',
    					hidden : !Admin.app.checkRight(75, 1),
    					tooltip : '添加新角色',
    					iconCls : 'x-fa fa-plus',
    					itemId : 'add',
						 listeners: {
                        click: 'onAddButton'
                    }
    				}, {						
						xtype: 'tbseparator',
						hidden : !Admin.app.checkRight(75, 1)
					},
					{
    					text : '修改',
    					hidden : !Admin.app.checkRight(75, 2),
    					tooltip : '修改角色',
    					// itemId : 'x-fa fa-pencil',
    					disabled: true,
    					iconCls : 'x-fa fa-edit'
    				}, {						
						xtype: 'tbseparator',
						hidden : !Admin.app.checkRight(75, 2)
					},
					{
    					text : '删除',
    					hidden : !Admin.app.checkRight(75, 3),
    					tooltip : '删除角色',
    					itemId : 'remove',
    					disabled: true,
    					iconCls : 'x-fa fa-minus'
    				}, {						
						xtype: 'tbseparator',
						hidden : !Admin.app.checkRight(75, 3)
					},
					{
    					text : '详情',   	
    					hidden : !Admin.app.checkRight(75, 0),
    					tooltip : '角色详情',
    					itemId : 'detail',
    					iconCls : 'x-fa fa-file-o',
    					disabled: true
    				},
					{
    					text : '取消选项',
    					tooltip : '取消选择项',
    					itemId : 'cancel',
    					iconCls: 'button-qingkong'
    				}]
    			}]
    	    }              
    	];
    	this.callParent(arguments);
    }
});