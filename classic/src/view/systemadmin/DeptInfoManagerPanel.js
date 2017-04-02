/***********
 * 部门管理面板
 ***********/
Ext.define('Admin.view.systemadmin.DeptInfoManagerPanel',{
	extend:'Admin.view.BasePage',
	title:'部门管理',
	alias:'widget.deptInfoManagerPanel',
	border:false,
	closeable:true,
	// requires:['Admin.store.systemadmin.DeptInfoStore'],
	initComponent:function(){
		var theStore= null;//Ext.create('Ext.data.Store');
		this.items=[
		            {
		            	xtype:'treepanel',
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
		            	        	 text:'部门名称',
		            	        	 dataIndex:'deptName'
		            	         },{
		            	        	 text:'部门ID',
		            	        	 //width:300,
		            	        	 flex:1,
		            	        	 dataIndex:'deptId'
		            	         },{
		            	        	 text:'部门描述',
		            	        	// width:300,
		            	        	 flex:1,
		            	        	 dataIndex:'remark'
		            	         }],
		               dockedItems: [{
		            	       xtype: 'toolbar',
		            	       height:30,
		            	       dock: 'top',
		            	       items: [
		            	               {text:'添加',tooltip:'添加一个部门',iconCls:'x-fa fa-plus',itemId:'add',hidden : !Admin.app.checkRight(127, 1)},
		            	               {text:'修改',tooltip:'修改选中部门',disabled:true,iconCls:'x-fa fa-edit',itemId:'update',hidden : !Admin.app.checkRight(127, 2)},
		            	               {text:'删除',tooltip:'删除选中部门',disabled:true,iconCls:'x-fa fa-minus',itemId:'del',hidden : !Admin.app.checkRight(127, 3)},
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
		            	                		   var treepanels=Ext.ComponentQuery.query('deptInfoManagerPanel treepanel');
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