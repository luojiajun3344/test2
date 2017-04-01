/**
 * 部门修改界面
 */

Ext.define('Admin.view.systemadmin.DeptUpdateForm',{
	extend:'Admin.view.BaseWindow',
	title:'部门修改',
	iconCls:'button-update',
	width:300,
	alias:'widget.deptUpdateForm',
	height:190,
	modal :true,
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
		    	   fieldLabel:'部门ID',
		    	   labelAlign:'right',
		    	   labelWidth:60,
		    	   width:270,
		    	   readOnly:true,
		    	   name:'deptId'
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
	        	  var treepanels = Ext.ComponentQuery.query('deptInfoManagerPanel treepanel');
	        	  var store=treepanels[0].getStore();
	        	  if(form.isValid()==false){
	        		  Ext.Msg.alert('提示','请填写必要的数据');
	        		  return;
	        	  }else{
	        		  Ext.Ajax.request({
	        			    url: 'rest/systemadmin/deptInfo/'+form.getValues().deptId,
	        			    method:'PUT',
	        			    params:Ext.encode(form.getValues()),
	        			    headers : {  
	      	                  'Content-Type': 'application/json;charset=utf-8'  
	        			    },
	        			    success:function(response) {
	        			    	var rtvObj = Ext.decode(response.responseText,true);
	        			        if(rtvObj.success == true){
	        			        	var values=form.getValues();
	        			        	var record=treepanels[0].getStore().getNodeById(values.deptId);
	        			        		record.set('deptName',values.deptName);
	        			        		record.set('remark',values.remark);
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