/********
 * 员工修改
 *********/
Ext.define('Admin.view.systemadmin.EmpUpdateForm',{
	extend:'Admin.view.BaseWindow',
	title:'修改员工信息',
	iconCls:'x-fa fa-edit',
	width:300,
	alias:'widget.empUpdateForm',
	height:180,
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
		    	   fieldLabel:'员工代码',
		    	   labelAlign:'right',
		    	   labelWidth:60,
		    	   width:270,
		    	  // disabled:true,
		    	   value:'系统自动生成',
		    	   readOnly:true,
		    	   name:'employeId'
		       },{
		    	   xtype:'textfield',
		    	   fieldLabel:'员工姓名',
		    	   labelAlign:'right',
		    	   labelWidth:60,
		    	   allowBlank :false,
		    	   blankText :'员工姓名不能为空',
		    	   width:270,
		    	   maxLength :15,
		    	   maxLengthText :'部门名称最多50个字符',
		    	   name:'employeName'
		       },{
		    	   xtype:'textfield',
		    	   fieldLabel:'手机号码',
		    	   labelAlign:'right',
		    	   labelWidth:60,
		    	   allowBlank :false,
		    	   blankText :'手机号码不能为空',
		    	   width:270,
		    	   regex : /^[1]\d{10}$/,
		    	   regexText :'请输入正确的11位手机号码格式[1**********]',
		    	   maxLength :15,
		    	   maxLengthText :'部门名称最多50个字符',
		    	   name:'mobile'
		       },{
		    	   xtype:'deptComboboxTree',
		    	   fieldLabel:'所属部门',
		    	   labelAlign:'right',
		    	   labelWidth:60,
		    	   width:270,
		    	   allowBlank :false,
		    	   blankText :'所属部门不能为空',
		    	   forceSelection :true,
		    	   url:'rest/systemadmin/deptInfo/selectAllDept',
		    	   displayField:'deptName',
		    	   valueField:'deptId',
		    	   maxLength :20,
		    	   maxLengthText :'所属部门最多20个字符',
		    	   name:'deptId'
		    	  
		       },{
		    	   //用于在添加时及时在grid中显示,因为数据库中并没有这个字段
		    	   xtype:'hidden',
		    	   fieldLabel:'部门名称',
		    	   labelAlign:'right',
		    	   labelWidth:60,
		    	   width:270,
		    	   maxLength :50,
		    	   maxLengthText :'部门名称最多50个字符',
		    	   id:'dept',
		    	   name:'deptName'
		       }]
	}],
	buttons: [
	          { text: '保存',handler:function(btn){
	        	  var win=btn.ownerCt.ownerCt;
	        	  var form=win.down('form');
	        	  var grids = Ext.ComponentQuery.query('employeInfoManagerPanel grid');
	        	  var stores=grids[0].getStore();
	        	  if(form.isValid()==false){
	        		  Ext.Msg.alert('提示','请填写必要的数据');
	        		  return;
	        	  }else{
	        		  var model=form.getRecord();
	        		  	  model.set(form.getValues());
	        		  
	        	  }
	        	  stores.sync({
		    			 success:function(batch,options){
		    				 stores.reload();
		    				 grids[0].getView().getSelectionModel().deselectAll();
		    			 },
		    			 failure:function(batch,options){
		    				 	stores.rejectChanges();
		    			 }
		    		 });
     		  
     		  win.close();
	        	  
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