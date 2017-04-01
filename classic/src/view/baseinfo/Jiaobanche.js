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
		            	       height:30,
		            	       dock: 'top',
		            	       items: [
		            	               {text:'添加',tooltip:'添加一个部门',iconCls:'button-add',itemId:'add',hidden : !Admin.app.checkRight(127, 1)},
		            	               {text:'修改',tooltip:'修改选中部门',disabled:true,iconCls:'button-update',itemId:'update',hidden : !Admin.app.checkRight(127, 2)},
		            	               {text:'删除',tooltip:'删除选中部门',disabled:true,iconCls:'button-remove',itemId:'del',hidden : !Admin.app.checkRight(127, 3)},
		            	               {
		            	                   xtype: 'tbseparator'
		            	                },
		            	               {text:'收起',tooltip:'收起全部部门',
		            	                iconCls:'button-expanded',
		            	               handler:function(btn){
		            	            	   var panel=btn.ownerCt.ownerCt;
		            	            	   panel.collapseAll();
		            	               }},
		            	               {text:'展开',tooltip:'展开全部部门',
		            	                iconCls:'button-collapsed',
		            	               handler:function(btn){
		            	            	   var panel=btn.ownerCt.ownerCt;
		            	            	   panel.expandAll();
		            	               }},{
		            	                   xtype: 'tbseparator'
		            	                },{
		            	                   xtype: 'tbspacer',
		            	                   width:8
		            	                },{
		            	                   xtype: 'textfield',
		            	                   fieldLabel:'部门名称',
		            	                   name : 'field1',
		            	                   labelWidth:60,
		            	                   labelAlign:'rigth',
		            	                   width:200,
		            	                   id:'filterByName',
		            	                   emptyText: '输入部门名称自动搜索',
		            	                   enableKeyEvents :true,
		            	                   listeners:{
		            	                	   change:function( text, e, eOpts ){
		            	                		   var value=text.getValue();
		            	                		  // console.log('value='+value);
		            	                		 //alert(value);
		            	                		   var treepanels=Ext.ComponentQuery.query('jiaobanche treepanel');
		            	                		   treepanels[0].expandAll();
		            	                		   var selected=treepanels[0].getSelectionModel().getSelection();
		            	                		   if(selected.length>0){
		            	                			   treepanels[0].getSelectionModel().deselectAll();
		            	                		   }
		            	                		  var records=[];
		            	                		  var nodes=treepanels[0].getRootNode();
		            	                		  var firstChild=nodes.firstChild;
		            	                			  firstChild.cascadeBy(function(record){
		            	                			   	if(record.data.deptName.indexOf(value)!=-1){
				            	               				records.push(record);
		            	                			     }
		            	                			});
		            	                		 treepanels[0].getSelectionModel().select(records);
		            	                		   if(value==''){
		            	                			   treepanels[0].getSelectionModel().deselectAll();
		            	                		   }
		            	                		   this.focus();
		            	                		  }//
		            	                	   }
		            	                
		            	               }
		            	               
		            	               ]
		            	     }]

		            	
		            }];
		this.callParent(arguments);
	}
});