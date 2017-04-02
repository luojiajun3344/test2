/***********
 * 部门管理面板
 ***********/
Ext.define('Admin.view.baseinfo.Jiaobanche',{
	extend:'Admin.view.BasePage',
	title:'搅拌车管理',
	alias:'widget.jiaobanche',
	border:false,
	closeable:true,
	// requires:['Admin.store.baseinfo.DeptInfoStore'],
	initComponent:function(){
		var theStore= null;//Ext.create('Ext.data.Store');
		this.items=[{
		            	xtype:'searchForm',
		            	frame:true,
		            	region:'north',
		            	store:theStore,
		            	defaults : {
		    				fieldDefaults : {
		    					labelAlign : 'right',
		    					labelWidth : 60
		    				}
		    			},
		    	        items:[{
		    	               	xtype : 'fieldcontainer',
		    	               	layout: {
				    	            type: 'table',
				    	            columns: 5
				    	        },		
		    	               	items : [
		    	               	{
		 	        	    	   xtype:'textfield',
		   	        	    	   fieldLabel:'员工代码',
		   	        	    	   labelWidth:60,
		   	        	    	   fieldAlign:'rigth',
		   	        	    	   width:160,
		   	        	    	   name:'employeId'
		   	        	       },{
		   	        	    	   xtype:'textfield',
		   	        	    	   fieldLabel:'员工姓名',
		   	        	    	   labelWidth:60,
		   	        	    	   fieldAlign:'rigth',
		   	        	    	    width:160,
		   	        	    	   name:'employeName'
		   	        	       },{
		   	        	    	   xtype:'textfield',
		   	        	    	   fieldLabel:'手机号码',
		   	        	    	   labelAlign:'right',
		   	        	    	    width:160,
		   	        	    	   labelWidth:60,
		   	        	    	   maxLength :15,
		   	        	    	   regex : /^[1]\d{10}$/,
		   	        	    	   regexText :'请输入正确的11位手机号码格式[1**********]',
		   	        	    	   maxLengthText :'手机号码最多15个字符',
		   	        	    	   name:'mobile'
		   	        	       }]
		    	        }]
		            },
		            {
		            	xtype:'grid',
		            	layout:'fit',
		            	store:theStore,
		            	rootVisible: false,
		            	layout: 'fit',
		            	useArrows : true,
		     			region:'center',
		     			viewConfig:{
		            		loadMask:true
		            	},
		     			multiSelect : true,
		     			//selModel:'SIMPLE',
		     			//selType :'treemodel',
		            	columns:[
		            	         {
		            	        	 xtype:'treecolumn',
		            	        	// width:300,
		            	        	// iconCls :'button-phoneGo',
		            	        	// iconCls:'button-collapsed',
		            	        	 flex:1,
		            	        	 text:'字段',
		            	        	 dataIndex:'deptName'
		            	         },{
		            	        	 text:'字段',
		            	        	 //width:300,
		            	        	 flex:1,
		            	        	 dataIndex:'deptId'
		            	         },{
		            	        	 text:'字段',
		            	        	// width:300,
		            	        	 flex:1,
		            	        	 dataIndex:'remark'
		            	         }],
		               dockedItems: [{
		            	       xtype: 'toolbar',
		            	       dock: 'top',
		            	       items: [
		            	               {text:'添加',tooltip:'添加一个部门',iconCls:'x-fa fa-plus',itemId:'add',hidden : !Admin.app.checkRight(127, 1)},
		            	               {text:'修改',tooltip:'修改选中部门',disabled:true,iconCls:'x-fa fa-edit',itemId:'update',hidden : !Admin.app.checkRight(127, 2)},
		            	               {text:'删除',tooltip:'删除选中部门',disabled:true,iconCls:'x-fa fa-minus',itemId:'del',hidden : !Admin.app.checkRight(127, 3)}
		            	              ]
		            	     },{
    	            	xtype : 'pagingtoolbar',
    	            	store : theStore,
    					dock : 'bottom',
    					displayMsg : '第{0}条到{1}条,一共{2}条',
    					emptyMsg : '没有记录',
    					displayInfo : true,
    					prevText : "上一页",
    					nextText : "下一页",
    					lastText : "最后页",
    					firstText : "第一页",
    					beforePageText : "当前页",
    	        		items:[{
   					    	   xtype:'tbspacer',
   					    	   width:20
   					       },{
   					    	   xtype:'downloadButton',
   					    	   tooltip:'导出日志管理报表到Excel表中',
   					    	   excelConfig:{
       	    						xtype:'excelConfig',
       	    						title:'日志管理',
       	    						columnNames:[
       	    						             {name:'所属业户',key:'groupId',width:35,align:'left'},
       	    						             {name:'用户ID', key:'operid', width:20, align:'left'},
       	    						             {name:'操作时间', key:'opertime', width:20, align:'left'},
       	    						             {name:'终端SIM卡号', key:'mobile', width:15, align:'left'},
       	    						             {name:'车牌号', key:'certid', width:15, align:'left'},
       	    						             {name:'登录IP地址', key:'operip', width:15, align:'left'},
       	    						             {name:'操作事件', key:'operevent', width:15, align:'left'},
       	    						             {name:'操作说明', key:'opercont', width:50, align:'left'}
       	    						            ]  
   					    	   				  }
   					    	   		
   					       }]
    	        	}]

		            	
		            }];
		this.callParent(arguments);
	}
});