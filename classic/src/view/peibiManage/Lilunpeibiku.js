/***********
 * 员工管理面板
 ***********/
Ext.define('Admin.view.peibiManage.Lilunpeibiku',{
	extend:'Admin.view.BasePage',
	title:'理论配比库',
	alias:'widget.lilunpeibiku',
	closeable:true,
	layout:'border',
	initComponent:function(){
		gridStore= null;//Ext.create('Ext.data.Store'),
		this.items=[
		            {
		            	xtype:'searchForm',
		            	frame:true,
		            	region:'north',
		            	store:gridStore,
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
		   	        	    	   xtype:'deptComboboxTree',
		   	        	    	   fieldLabel:'所属部门',
		   	        	    	   labelAlign:'right',
		   	        	    	   labelWidth:60,
		   	        	    	   width:270,
		   	        	    	   //forceSelection :true,
		   	        	    	   url:'rest/peibiManage/deptInfo/selectAllDept',
		   	        	    	   displayField:'deptName',
		   	        	    	   valueField:'deptId',
		   	        	    	   maxLength :20,
		   	        	    	   maxLengthText :'所属部门最多20个字符',
		   	        	    	   name:'deptId'
		   	        	       },{
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
		            },{
		            	xtype:'grid',
		     		    region : 'center',
		       			frame:true,
		       			autoScroll : true,
		       			sortableColumns :true,
		       			border:false,
		       			viewConfig:{
		       				loadMask:true
		       			},
		       			store: gridStore,
		       			columns:[
		       			         	{xtype:'rownumberer',text:'行号',width:35},
		       			         	{ text: '员工代码',  dataIndex: 'employeId',flex:1},
		       			         	{ text: '员工姓名', dataIndex: 'employeName',flex:1},
		       			         	{ text: '手机号码', dataIndex: 'mobile',flex:1},
		       			         	{ text: '部门名称', dataIndex: 'deptName',flex:1},
		       			         	{ text: '部门ID', dataIndex: 'deptId',flex:1}
		       			         ], 
		       			  dockedItems :[{
  	        		       			xtype:'toolbar',
  	        		       			frame:false,
  	        		       			border:false,
  	        		       			items:[
  	        		       			       {text:'添加',tooltip:'添加一个新员工',iconCls:'x-fa fa-plus',itemId:'add',hidden : !Admin.app.checkRight(128, 1)},
  	        		       			       {text:'修改',tooltip:'修改选中的员工信息',disabled:true,iconCls:'x-fa fa-edit',itemId:'update',hidden : !Admin.app.checkRight(128, 2)},
  	        		       			       {text:'删除',tooltip:'删除选中员工信息',disabled:true,iconCls:'x-fa fa-minus',itemId:'del',hidden : !Admin.app.checkRight(128, 3)}
		       				         ]
		       			  },{
		       			  xtype : 'pagingtoolbar',
		       			  dock : 'bottom',
		       			  store: gridStore,
		       			  displayMsg : '第{0}条到{1}条,一共{2}条',
		       			  emptyMsg : '没有记录',
		       			  displayInfo : true,
		       			  prevText : "上一页",
		       			  nextText : "下一页",
		       			  lastText : "最后页",
		       			  firstText : "第一页",
		       			  beforePageText : "当前页",
		       			  items:[ 
		       			          {
		       			        	  xtype:'tbspacer',width:20
  	        		       		}]
		       		}]
		      }],
		
		this.callParent(arguments);
		
	}
	
});