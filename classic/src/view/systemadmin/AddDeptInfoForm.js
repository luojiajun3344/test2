/********
 * 部门添加
 *********/
Ext.define('Admin.view.systemadmin.AddDeptInfoForm',{
	extend:'Admin.view.BaseWindow',
	title:'添加新部门',
	iconCls:'button-add',
	alias:'widget.addDeptInfoForm',
	width:300,
	modal :true,
	height:210,
	items:[{
		xtype:'form',
		bodyPadding:5,
		layout:{
			type:'table',
			columns:1
		},
		items:[
		       {
		    	   xtype:'textfield',
		    	   fieldLabel:'部门id',
		    	   labelAlign:'right',
		    	   labelWidth:60,
		    	   width:270,
		    	   disabled:true,
		    	   value:'系统自动生成',
		    	   readOnly:true
		    	   //name:'deptId'
		       },{
		    	   xtype:'textfield',
		    	   fieldLabel:'部门名称',
		    	   labelAlign:'right',
		    	   labelWidth:60,
		    	   allowBlank :false,
		    	   blankText :'部门名称不能为空',
		    	   width:270,
		    	   maxLength :50,
		    	   maxLengthText :'部门名称最多50个字符',
		    	   name:'deptName'
		       },/*{
		    	   xtype:'deptComboboxTree',
		    	   fieldLabel:'上级部门',
		    	   labelAlign:'right',
		    	   labelWidth:60,
		    	  // store:new Admin.store.systemadmin.DeptInfoStore(),
		    	   url: 'rest/systemadmin/deptInfo/selectAllDept',
		    	   width:270,
		    	   maxLength :50,
		    	   displayField : 'text',
		    	   valueField :'deptId',
		    	   maxLengthText :'部门名称最多50个字符',
		    	   id:'parentName',
		    	   name:'parentName'
		    	  
		       },*/{
		    	   xtype:'deptComboboxTree',
		    	   fieldLabel:'上级部门',
		    	   labelAlign:'right',
		    	   labelWidth:60,
		    	  // store:new Admin.store.systemadmin.DeptInfoStore(),
		    	   url: 'rest/systemadmin/deptInfo/selectAllDept',
		    	   width:270,
		    	   maxLength :50,
		    	   forceSelection :true,
		    	   allowBlank :false,
		    	   blankText :'部门名称不能为空',
		    	   displayField : 'deptName',
		    	   valueField :'deptId',
		    	   maxLengthText :'部门名称最多50个字符',
		    	   id:'parent',
		    	   name:'parentId'
		       },{
		    	   xtype:'textarea',
		    	   fieldLabel:'部门描述',
		    	   labelAlign:'right',
		    	   labelWidth:60,
		    	   rows:2,
		    	   allowBlank :false,
		    	   blankText :'部门描述不能为空',
		    	   width:270,
		    	   maxLength :100,
		    	   maxLengthText :'部门描述最多100个字符',
		    	   name:'remark'
		       }]
	}],
	buttons: [
	          { text: '保存',handler:function(btn){
	        	  var win=btn.ownerCt.ownerCt;
	        	  var form=win.down('form');
	        	  var values=form.getValues();
	        	  var record=Ext.create('Admin.model.systemadmin.DeptInfoModel');
	        	  record.set(values);
	        	  var treePanels = Ext.ComponentQuery.query('deptInfoManagerPanel treepanel');
	        	  //var node=treePanels[0].getView().getSelectionModel().getSelection()[0];
	        	  //alert(values.parentId);
	        	  var node=treePanels[0].getStore().getNodeById(values.parentId);
	        	  if(form.isValid()==false){
	        		  Ext.Msg.alert('提示','请填写必要的数据');
	        		  return;
	        	  }else{
	        		  Ext.Ajax.request({
	        			    url: 'rest/systemadmin/deptInfo/',
	        			    method:'POST',
	        			    params:Ext.encode(form.getValues()),
	        			    headers : {  
	      	                  'Content-Type': 'application/json;charset=utf-8'  
	        			    },
	        			    success:function(response) {
	        			    	var rtvObj = Ext.decode(response.responseText,true);
	        			        if(rtvObj.success == true){
	        			        	record.set('deptId',rtvObj.data.deptId);
	        			        	record.set('leaf',true);
	        			        	record.set('iconCls','button-subDept');
	        			        	node.appendChild(record);
	        			        	if(node.isLeaf()){
	        			        		node.set('leaf',false);
	        			        		node.set('iconCls','button-expenseReport');
	        			        		node.expand();
	        			        	}
	        			        	record.commit();
	        			        	win.close();
	        			        	
	        			        }
	        			    },
	        			    failure: function(response) {
	        			    	var rtvObj = Ext.decode(response.responseText,true);
	        			    	Ext.Msg.alert('提示', rtvObj.message);
	        			    }
	        			});
	        	  }
	        	  
	        	 
	        	  
	          }},
	          { text: '取消',handler:function(btn){
	        	var win=btn.ownerCt.ownerCt;
	        	win.close();
	          }}
	          
	        ],
	initComponent:function(){
		this.callParent(arguments);
	}
	
});